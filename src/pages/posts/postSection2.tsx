import { onAuthStateChanged } from "firebase/auth";
import  { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../../firebase/auth";
import "../../components/Tags";
import "./PostDetail"
import { deleteDoc, deleteField, doc, getDoc, increment, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
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



const PostSection2 = ({
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
  useEffect(() => {
    // Retrieve the view count from Firestore
    const fetchBookmarkCount = async () => {
      try {
        const docRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBookmarkCount(docSnap.data().count);
        }
      } catch (error) {
        console.log('Error fetching view count');
      }
    };
    
    fetchBookmarkCount();
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
        console.error("Error checking bookmark status: ", error);
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
      // setLoading(true);
      await deleteDoc(doc(db, "blogs", id));
      toast.success("Blog deleted successfully");
      // setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
};

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




 const handleAddBookmark = async () => {
  const bookmarkRef = doc(db, "bookmarks", authUser.uid); // Assuming you have the authenticated user's ID available

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
        },
      },{ merge: true });
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
     <div className=" m-auto block relative m-4 text-left" key={id}>
     <div className="">
 
</div>
    <NavLink to={`/posts/${id}`} className="   mob_width m-auto w-full p_5  h-aut0 " onClick={handleIncrementViewCount}>
    <div className="w-full block " key={id}>
 
   {/* </div> */}
  <div className=" flex w-full dis_block space-x-5 align-center text-left ">
  <div>  <h2 className="font-bold text-left text-white">
    {postTitle}
     
    </h2>
    <p className=" text-xs leading-5 text-cyan-400">
          Posted on {timestamp.toDate().toDateString()}
        </p></div>
    {/* <p className="text-gray-300">{excerpt(postDescription, 120)}</p> */}
    <div className="flex gap-4 ">
      <span className="text-white">
      <i className="fas fa-comment text-info"/> {comments?.length} 
      </span>
      <span className="text-white">
      <i className="fas fa-thumbs-up text-secondary"/> {likes?.length} 
      </span>
      <span className="text-white">
        <i className="fas fa-binoculars text-primary"/> {viewCount}
      </span>
      <span className="text-white">
        <i className="fas fa-bookmark text-yellow-400"/> {bookmarkCount}
      </span>
       </div>
       
    
       <div className="card-actions   bottom-2 right-6 justify-end">
    {authUser && authUser.uid === userId && (
         <><span style={{}} className="relative m-auto float-right gap-2 flex mob_width rounded-full justify-center">
              <span onClick={() => handleDelete(id)} className="  cursor-pointer text-red-500"><i className="fas fa-trash-can   text-red-500 	p-2 text-sm " />
              </span>
              <span className="">
                <Link to={`/editpost/${id}`} className="text-cyan-400">
                  <i className="fas fa-pen  	p-2 text-sm " />
                 
                </Link>
              </span>

            </span></>

        )}
    </div>
    
    
  </div>
</div>

 

    </NavLink>
   
    

    
    
    
      </div>
      
      </>
   
   
  );
};

export default PostSection2;