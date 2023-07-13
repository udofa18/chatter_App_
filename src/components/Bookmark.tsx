/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/auth";
import Spinner from "./Spinner";
import { auth } from "../firebase/auth.js";
import {  NavLink, useParams } from "react-router-dom";
import PostSection2 from "../pages/posts/postSection2.js";

const Bookmark = () => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookmark, setBookmark] = useState([]);
  const [tags, setTags] = useState([]);
  const id = (useParams)

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

  const user = authUser?.uid;
  const excerpt = (str: string | undefined, count: number) => {
    if (str && str.length > count) {
      str = str.substring(0, count) + " ... ";
    }
    return str;
  };


  useEffect(() => {
  const fetchBookmarks = async () => {
    try {
    setLoading(true);

      const bookmarkDocRef = doc(db, "bookmarks", user);
      const bookmarkDocSnapshot = await getDoc(bookmarkDocRef);
      const bookmarksData = bookmarkDocSnapshot.data();
      if (bookmarksData) {
        const bookmarkList = Object.keys(bookmarksData).map((bookmarkId) => {
          return {
            id: bookmarkId,
            ...bookmarksData[bookmarkId]
          };
        });
        setBookmark(bookmarkList);
      } else {
        setBookmark([]);
      }
    
      setLoading(false)
    }
   
    catch (error) {
      console.error("Error fetching bookmarks: ", error);
    }
    
    // setLoading(false);
  };
  if (authUser) {
    fetchBookmarks();
  }


  },[authUser, user]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {authUser ?(
        <div >
          <div className="  h-full w-full " >
      <div className="blog-heading text-left py-2 mb-4 text-2xl  text-base-200 font-bold bg-slate-950 p-10">
           Bookmarks
          </div>
        <div className="m_5  shadow-xl font-bold m-auto w-100 border border-sky-100 rounded-2xl" 
      >
         <ul 
        style={{
          justifyContent: "center",
          alignItems: 'center',
          width:'100%'
        }} 
        
         className=" w-full mob_width m_0   "  key={user}   >
          {bookmark?.map((item)  => ( 
            <li className="my-2 m-2 px-2 rounded-lg   bg-slate-700 hover:bg-slate-950 " key={item.id}  >
              <PostSection2 key={item.id} {...item} />
            </li>
          ))}
          </ul>
        </div>
      </div>
       </div>
     ):(
        
      <div>  No Publihed Items 
       <NavLink to="createpost"> Create a scroll</NavLink>
      </div>
        )
    }
  
    </>
  );
};

export default Bookmark;
