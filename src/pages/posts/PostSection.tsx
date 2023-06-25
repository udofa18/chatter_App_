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

    <>
     <div className=" w-full pr-32  mob_width p_right" key={id}>
    <NavLink to={`/posts/${id}`} className="w-full mr-32  mob_width">
    <div className="block gap-2 text-wrap w-full text-left " key={id}>
    <p className="text-sm leading-6 text-red-400"> Author: {author} <img src=""/></p>
<div className="flex">
      <div className="overflow-hidden img_con m-auto ">
        
      <img className="h-32 w-40 img_size flex-none m-auto bg-gray-50 mr-4" src={imgUrl} alt={postTitle} />
      </div>
      <div className="min-w-0 flex-auto w-40 mob_width text_left">
        <p className="text-1xl font-bold leading-6 text-gray-100">{postTitle}</p>
        <p className="mt-2 truncate text-x leading-5 mb-3 text-gray-300">{excerpt(postDescription, 120)}</p>
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            // style={{ height: '500px' }} 
            children={excerpt(content, 200)as string} 
            className=" break-words mob_dis"

        
                
            />
             <p className="mt-1 text-xs leading-5 text-cyan-400">
          Posted on {timestamp.toDate().toDateString()}
        </p>
        <span className="flex py-4 gap-2 text-red-400 center">
        <div><i className="fas fa-comment "/> {comments?.length}  </div>
        <div><i className="fas fa-thumbs-up"/> {likes?.length}  </div>
       
      
        {authUser && authUser.uid === userId && (
          <span style={{ }} className="relative ml-10 ">
            <i className="fas fa-trash-can  pointer  text-red-500 	p-2 text-sm "
              onClick={() => handleDelete(id)} />Delete
            <Link to={`/editpost/${id}`}>
              <i className="fas fa-pen  ml-4 text-cyan-400 text-sm"  /><span className="text-cyan-400"> Edit</span>
            </Link>
       </span>
        )}
         
    
        </span>
       
      </div>
      </div>
     

       
     

    </div>
    </NavLink>
    
      </div>
      
      </>
   
   
  );
};

export default PostSection;