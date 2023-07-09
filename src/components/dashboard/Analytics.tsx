/* eslint-disable @typescript-eslint/no-unused-vars */
import Spinner from "../../components/Spinner";
import { db } from "../../firebase/auth";
import { auth } from "../../firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import {query, collection, getDocs, where } from "firebase/firestore";





const Analytics = ( ) => {
    interface BlogData {
        id: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
      }
    const [userBlogs, setUserBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [authUser, setAuthUser] = useState(null);
    const[totalPost, setTotalPost]= useState(0);
    const[totalLikes, setTotalLikes]= useState(0);
    const[totalComments, setTotalComments]= useState(0);
    const[totalViews, setTotalViews]= useState(0);
    
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
    
      useEffect(() => {
    
        user && getUserBlogs();
       
       // eslint-disable-next-line react-hooks/exhaustive-deps
       }, [user]);
       
    
      
     
      if (loading) {
        return <Spinner />;
      }  
      
      const getUserBlogs = async () => {
        
          setLoading(true);
        const blogRef = collection(db, "blogs", );
        const userBlogQuery = query(blogRef, where("userId", "==", user));
        const docSnapshot = await getDocs(userBlogQuery);
        const userBlogs = [];
        docSnapshot.forEach((doc) => {
            const data = doc.data() as BlogData; // Add the type annotation here
            userBlogs.push({ id: doc.id, ...data });
          });
        setUserBlogs(userBlogs);
        setLoading(false);
        console.log(userBlogs)
        
        const totalPosts = docSnapshot.size;
        setTotalPost(totalPosts)
        let totalLikes = 0;
  userBlogs.forEach((blog) => {
    totalLikes += blog.likes.length;

    setTotalLikes(totalLikes)

    let totalComments = 0;
  userBlogs.forEach(async (blog) => {
    totalComments += blog.comments.length;

    setTotalComments(totalComments) 

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let totalViews = 0;

    const viewsRef = collection(db, "views", );
  const postIds = userBlogs.map((blog) => blog.id);
  const viewsQuery = query(viewsRef, where("postId", "in", postIds));
  const viewsSnapshot = await getDocs(viewsQuery);

  viewsSnapshot.forEach((doc) => {
    const viewData = doc.data();
    console.log(viewData.count)
    totalViews += viewData.count;
      

  });
  });
});
//   let totalViews= 0;
//   userBlogs.forEach((blog) => {
//     totalComments += blog.length;

//     setTotalComments(totalComments) 
 
//   });
      }

    return(
        <div className="  h-full w-full " >
        <div className="blog-heading text-left py-2 mb-4 text-2xl text-base-200 font-bold bg-slate-950 p-10">
        Analytics
      </div>
        <div className="stats m-auto align-center stats-vertical lg:stats-horizontal shadow">
            <div className="stat">
          <div className="stat-title">Posts</div>
          <div className="stat-value">
            {totalPost} <i className="fas fa-heart"></i>
          </div>

          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>
        <div className="stat">
          <div className="stat-title">Readers</div>
          <div className="stat-value">
            {totalViews} <i className="fab fa-readme"></i>
          </div>

          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Likes</div>
          <div className="stat-value">
            {totalLikes} <i className="fas fa-thumbs-up"></i>
          </div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Comments</div>
          <div className="stat-value">
           {totalComments} <i className="fas fa-comment"></i>
          </div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>
      </div>
    )
}
export default Analytics;