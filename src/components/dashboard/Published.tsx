import { collection, getDocs, query, where } from "firebase/firestore";
import  { useState, useEffect } from "react";
import PostSection from "../../pages/posts/PostSection"
import PostSection2 from "../../pages/posts/postSection2";
import Spinner from "../../components/Spinner";
import { db } from "../../firebase/auth";
import { auth } from "../../firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { NavLink } from "react-router-dom";
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

  useEffect(() => {
    getUserBlogs();
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, );
   

  
  const user = authUser?.uid

  
  const getUserBlogs = async () => {
   
    try{
      setLoading;
    const blogRef = collection(db, "blogs", );
    const userBlogQuery = query(blogRef, where("userId", "==", user));
    const docSnapshot = await getDocs(userBlogQuery);
    const userBlogs = [];
    docSnapshot.forEach((doc) => {
      userBlogs.push({ id: doc.id, ...doc.data() });
    });
    setUserBlogs(userBlogs);
    // setLoading(false)
  }
  
   catch (error) {
    console.error("Error fetching draft data:", error);
  }
 
  };
  if (loading) {
    return <Spinner />;
  }  
  
 
  console.log(userBlogs)

  
  return (
    <>
        {authUser ?(
    <div>
      <div className="  h-full w-full " >
      <div className="blog-heading text-left py-2 mb-4 text-2xl text-base-200 font-bold bg-slate-950 p-10">
            My Posts
          </div>
        <div className="m_5 block align-center  shadow-xl font-bold m-auto w-100 border border-sky-100 rounded-2xl" style={{
          height: "auto"
      }}>
         <ul 
         style={{
          // justifyContent: "center",
          // alignItems: 'center',
          width:'100%'
        }}
         className="  w-full mob_width m_0 p-2  ">
          {userBlogs?.map((item) => (
            <li className=" my-2 m-2 " key={item.id}>
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

export default UserBlog;