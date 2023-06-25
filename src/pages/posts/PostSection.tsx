import { onAuthStateChanged } from "firebase/auth";
import  { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../../firebase/auth";
import "../../components/Tags";
import "./PostDetail"
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/auth";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";





const excerpt = (str: string | undefined, count: number) => {
  if (str && str.length > count) {
    str = str.substring(0, count) + " ... ";
  }
  return str;
};


const PostSection = ({
  id,
  postTitle,
  postDescription,
  imgUrl,
  userId,
  author,
  content,
  timestamp,
 
}) => {
  // const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };

  }, []);


  useEffect(() => {
    id && getBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  

  const getBlogDetail = async ()=>{
  
  const docRef = doc(db, "blogs", id);
  const blogDetail = await getDoc(docRef);
 

  setComments(blogDetail.data().comments ? blogDetail.data().comments : [])
  setLikes(blogDetail.data().likes ? blogDetail.data().likes : [])

  console.log(comments.length)
}

const handleDelete = async (id: string) => {
  if (window.confirm("Are you sure wanted to delete that Post ?")) {
    try {
      setLoading(true);
      await deleteDoc(doc(db, "blogs", id));
      toast.success("Blog deleted successfully");
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
};
  

  return (
    <><div className="flex gap-x-2 w-full mob_block" key={id}>


      <img className="h-32 w-40 img_size flex-none  bg-gray-50" src={imgUrl} alt={postTitle} />
      <div className="min-w-0 flex-auto w-40 mob_width">
        <p className="text-1xl font-bold leading-6 text-gray-900">{postTitle}</p>
        <p className="mt-2 truncate text-x leading-5 mb-3 text-gray-500">{excerpt(postDescription, 120)}</p>
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            // style={{ height: '500px' }} 
            children={excerpt(content, 200)as string} 
            className=" break-words"

        
                
            />
        <span className="flex py-4 gap-2 text-red-400">
        <div><i className="fas fa-comment "/> {comments?.length} Comment(s) </div>
        <div><i className="fas fa-thumbs-up"/> {likes?.length} Like(s) </div>
        </span>
      </div>
      <div className="hidden sm:flex sm:flex-col sm:items-end">
        
        <p className="text-s leading-6 text-red-400"> Author: {author} <img src=""/></p>

        <p className="mt-1 text-xs leading-5 text-gray-500">
          Posted on {timestamp.toDate().toDateString()}
        </p>

        <NavLink to={`/posts/${id}`}>
          <button className="btn bg-black mt-10 hvr-bob">Read</button>
        </NavLink>
      </div>

    </div>
    <div>
        {authUser && authUser.uid === userId && (
          <div style={{ float: "right" }}>
            <i className="fas fa-trash-can border pointer rounded-2 text-red-500 ml-4 mb-2	p-2 text-xl"
              onClick={() => handleDelete(id)} />
            <Link to={`/editpost/${id}`}>
              <i className="fas fa-pen border rounded-2 text-slate-600 ml-4 p-2 text-xl" />
            </Link>
          </div>
        )}
      </div>
      
      </>
   
   
  );
};

export default PostSection;