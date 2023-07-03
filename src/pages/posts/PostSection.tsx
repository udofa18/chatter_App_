import { onAuthStateChanged } from "firebase/auth";
import  { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../../firebase/auth";
import "../../components/Tags";
import "./PostDetail"
import { addDoc, collection, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/auth";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

// import { AiFillLinkedin } from 'react-icons/ai';
// import remarkGfm from "remark-gfm";
// import ReactMarkdown from "react-markdown";





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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
// const handleAddBookmark = async   => {

//   try {
//     await addDoc(collection(db, "bookmarks"), {
//       ...form,
//       timestamp: serverTimestamp(),
//       author: authUser.displayName,
//       userId: authUser.uid,
//     });
//     toast.success("Added to Draft");
    
//   } catch (err) {
//     console.log(err);
//   }
// }


  return (

    <>
     <div className="  mob_width p_right relative" key={id}>
    <NavLink to={`/posts/${id}`} className="  mob_width p_5 hvr-float m-2">
    {/* <img src={imgUrl} width={100} height={20}/> */}

    <div style={{height:"500px"}} className="card w-80   bg-sky-900 shadow-xl" key={id}>
      {/* <div style={{width:"100%",height:"150px"}} className="relative overflow-hidden "> */}
  <figure  style={{width:"100%",height:"150px"}} className=" w-100 relative overflow-hidden"><img src={imgUrl} 
 
   alt="Shoes" />
   </figure>
   {/* </div> */}
  <div className="card-body bg-gradient ">
  <div className="badge badge-ghost">Author: {author}</div>
    <h2 className="card-title text-white">
    {postTitle}
     
    </h2>
    <p className="mt-1 text-xs leading-5 text-cyan-400">
          Posted on {timestamp.toDate().toDateString()}
        </p>
    <p className="text-gray-300">{excerpt(postDescription, 120)}</p>
    <div className="flex gap-4 ">
      <span className="text-white">
      <i className="fas fa-comment text-white "/> {comments?.length} 
      </span>
      <span className="text-white">
      <i className="fas fa-thumbs-up text-white"/> {likes?.length} 
      </span>
       </div>
       
    <div className="card-actions justify-end">
    {authUser && authUser.uid === userId && (
          <span style={{ }} className="relative  float-right gap-2 flex mob_width rounded-full justify-center">
            <span  onClick={() => handleDelete(id)}  className="cursor-pointer text-red-500"><i className="fas fa-trash-can   text-red-500 	p-2 text-sm "
             />Delete
             </span>
             <span className="">
            <Link to={`/editpost/${id}`} className="text-cyan-400">
              <i className="fas fa-pen  	p-2 text-sm "  /> 
              Edit
            </Link>
            </span>
       </span>
        )}
    </div>
    
    
  </div>
</div>

    {/* <div className="block gap-2 text-wrap w-full text-left " key={id}>
    <p className="text-sm leading-6 text-neutral-200"> Author: {author} </p>
<div className="flex">
      <div className="overflow-hidden  m-auto ">
        
      <img className="h-24 w-40  flex-none m-auto bg-gray-50 mr-4" src={imgUrl} alt={postTitle} />
      </div>
      <div className="min-w-0 flex-auto w-40 mob_width text_left">
        <p className="text-1xl font-bold leading-6 text-black">{postTitle}</p>
        <p className="mt-2 truncate text-x leading-5 mb-3 text-gray-100">{excerpt(postDescription, 120)}</p>
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            // style={{ height: '500px' }} 
            children={excerpt(content, 200)as string} 
            className=" break-words mob_dis text-accent"

        
                
            />
             <p className="mt-1 text-xs leading-5 text-cyan-400">
          Posted on {timestamp.toDate().toDateString()}
        </p>
        <span className="flex py-4 gap-2 text-red-400 center">
        <div><i className="fas fa-comment "/> {comments?.length}  </div>
        <div><i className="fas fa-thumbs-up"/> {likes?.length}  </div>
       
      
       
    
        </span>
       
      </div>
      </div>
     

       
     

    </div> */}
    </NavLink>
   
    
      </div>
      
      </>
   
   
  );
};

export default PostSection;