import { onAuthStateChanged } from "firebase/auth";
import  { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../../firebase/auth";
import "../../components/Tags";
import "./PostDetail"
import { deleteDoc, deleteField, doc, getDoc, getDocs, increment, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
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
 const [isBookmarked, setIsBookmarked] = useState(false);
 const [viewCount, setViewCount] = useState(0);
const [bookmarkCount, setBookmarkCount] = useState(0);



 



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

  useEffect(() => {
    // Retrieve the view count from Firestore
    const fetchViewCount = async () => {
      try {
        const docRef = doc(db, 'views', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setViewCount(docSnap.data().count);
        }
      } catch (error) {
        console.log('Error fetching view count');
      }
    };
    
    fetchViewCount();
  }, [id]);


  const handleIncrementViewCount = async () => {
    const docRef = doc(db, 'views', id);
  
    try {
      const docSnapshot = await getDoc(docRef);
      
      if (docSnapshot.exists()) {
        // Document exists, increment view count
        await updateDoc(docRef, {
          count: increment(1)
        });
        setViewCount(viewCount + 1);
      } else {
        // Document does not exist, set view count to 1
        await setDoc(docRef, {
          count: 1
        });
        setViewCount(1);
      }
      
    } catch (error) {
      // Handle any errors that occur during fetching or updating
      console.error('Error incrementing view count:', error);
    }
  };
  
  useEffect(() => {
    // Retrieve the view count from Firestore
    const fetchBookmarkCount = async () => {
      try {
        const docRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBookmarkCount(docSnap.data().count);
         
        }
        console.log(docSnap.data().count)
      } catch (error) {
        console.log('Error fetching view count');
      }
    };
    
    fetchBookmarkCount ();
  }, [id]);
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      try {
        const bookmarkDocRef = doc(db, "bookmarks", authUser.uid);
        const bookmarkDocSnapshot = await getDoc(bookmarkDocRef);
        const bookmarks = bookmarkDocSnapshot.data();
        // eslint-disable-next-line no-prototype-builtins
        setIsBookmarked(bookmarks && bookmarks.hasOwnProperty(id));

      } catch (error) {
        console.error("Error checking bookmark status: ");
      }
    };
  
    if (authUser) {
      checkBookmarkStatus();
    }
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  if (loading) {
    return <Spinner />;
  }

  
  
  const buttonStyle = {
    color: isBookmarked ? "gold" : "white",
    backgroundColor: isBookmarked ? "black" : "grey",
    opacity: isBookmarked ? "100%" : "50%"
    // Add any other button styles as needed
  };
  

  const getBlogDetail = async ()=>{
  
  const docRef = doc(db, "blogs", id);
  const blogDetail = await getDoc(docRef);
 

  setComments(blogDetail.data().comments ? blogDetail.data().comments : [])
  setLikes(blogDetail.data().likes ? blogDetail.data().likes : [])

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



 const handleAddBookmark = async () => {
  const bookmarkRef = doc(db, "bookmarks", authUser.uid); // Assuming you have the authenticated user's ID available
  const blogRef = doc(db, "blogs",id)
  try {
    if (isBookmarked) {
      // If the post is already bookmarked, remove the bookmark
      await updateDoc(bookmarkRef, {
        [id]: deleteField()
    });
      setIsBookmarked(false);
      toast.success("Removed from Bookmarks");
    } else {
      // If the post is not bookmarked, add the bookmark
      await setDoc(bookmarkRef, {
        [id]: {
          timestamp: serverTimestamp(),
          postTitle,
  postDescription,
  imgUrl,
  userId,
  author,
  content,
  count: bookmarkCount + 1,
        },
      },{ merge: true });
   await  updateDoc(blogRef, {
    count: increment(1),
      }, );
      setBookmarkCount(bookmarkCount + 1)
      
      setIsBookmarked(true);
      
      toast.success("Added to Bookmarks");
    }
  } catch (error) {
    console.error("Error toggling bookmark status: ", error);
    toast.error("Failed to toggle bookmark");
  }
};

  return (

    <>
     <div className=" m-auto block align-self-center relative" key={id}>
    <NavLink to={`/posts/${id}`} className="  mob_width m-auto p_5 hvr-float p-2 " onClick={handleIncrementViewCount}>

    <div style={{height:"450px"}} className="card w-80 block m-auto  bg-black shadow-lg shadow-cyan-500/50 hover:shadow-indigo-500/40 shadow-xl" key={id}>
      {/* <div style={{width:"100%",height:"150px"}} className="relative overflow-hidden "> */}
  <figure  style={{width:"100%",height:"150px"}} className=" w-100 relative overflow-hidden"><img src={imgUrl} 
 
   alt={postTitle}/>
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
      <i className="fas fa-comment text-info "/> {comments?.length} 
      </span>
      <span className="text-white">
      <i className="fas fa-thumbs-up text-secondary"/> {likes?.length} 
      </span>
      <span className="text-white">
        <i className="fas fa-binoculars text-primary "/> {viewCount}
      </span>
       </div>
       
    
   
    
    
  </div>
</div>

 

    </NavLink>
    <div className="card-actions absolute bottom-5 right-6 justify-end">
    {authUser && authUser.uid === userId && (
         <><span style={{}} className="relative m-auto float-right gap-2 flex mob_width rounded-full justify-center">
              <span onClick={() => handleDelete(id)} className="  cursor-pointer text-red-500"><i className="fas fa-trash-can   text-red-500 	p-2 text-sm " />Delete
              </span>
              <span className="">
                <Link to={`/editpost/${id}`} className="text-cyan-400">
                  <i className="fas fa-pen  	p-2 text-sm " />
                  Edit
                </Link>
              </span>

            </span></>

        )}
    </div>
    
    
      <button onClick={handleAddBookmark} key={id} style={buttonStyle} className=" absolute left-0 top-0 px-4"><i className="fas fa-bookmark text-sm p-1" />{bookmarkCount}</button>
    
    
    
      </div>
      
      </>
   
   
  );
};

export default PostSection;