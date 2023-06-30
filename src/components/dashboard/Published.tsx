import { collection, getDocs, query, where } from "firebase/firestore";
import  { useState, useEffect } from "react";
import PostSection from "../../pages/posts/PostSection"
import Spinner from "../../components/Spinner";
import { db } from "../../firebase/auth";
import { auth } from "../../firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
// import { useParams } from "react-router-dom";

const UserBlog = ( ) => {
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  // const id ={useParams}

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

  const user = authUser?.uid
  

  const getUserBlogs = async () => {
    // setLoading(true);
    try{
    const blogRef = collection(db, "blogs", );
    const userBlogQuery = query(blogRef, where("userId", "==", user));
    const docSnapshot = await getDocs(userBlogQuery);
    const userBlogs = [];
    docSnapshot.forEach((doc) => {
      userBlogs.push({ id: doc.id, ...doc.data() });
    });
    setUserBlogs(userBlogs);
    setLoading(false);
  }
   catch (error) {
    console.error("Error fetching draft data:", error);
  }
  };
  console.log(userBlogs)
  useEffect(() => {
    getUserBlogs();
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, );
 
   if (loading) {
     return <Spinner />;
   }  

  return (
    <>
        {authUser ?(
    <div>
      <div className="  h-full w-full " >
      <div className="blog-heading text-left py-2 mb-4 font-bold">
            My Posts
          </div>
        <div className="m_5" style={{
        overflow: "scroll" , height: "40rem",
      }}>
         
          {userBlogs?.map((item) => (
            <div className="flex-wrap w-50 flex p-10 m-2 ">
              <PostSection key={item.id} {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  
      
        ):("")
      }
    

  
  </>
  );

};

export default UserBlog;