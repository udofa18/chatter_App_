/* eslint-disable @typescript-eslint/no-unused-vars */
import Spinner from "../../components/Spinner";
import { db } from "../../firebase/auth";
import { auth } from "../../firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import {query, collection, getDocs, where, doc, getDoc } from "firebase/firestore";





const Analytics = ( ) => {
  type BlogData = {
    id: string;
    likes: []; 
    comments: [] ;
  };
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
        if (user) {
          getUserBlogs();
        }
      }, [user]);
    
      
     
      if (loading) {
        return <Spinner />;
      }  
      
      const getUserBlogs = async () => {
        try {
          setLoading(true);
          const blogRef = collection(db, 'blogs');
          const userBlogQuery = query(blogRef, where('userId', '==', user));
          const docSnapshot = await getDocs(userBlogQuery);
          const userBlogsData: BlogData[] = docSnapshot.docs.map((doc) => ({
            id: doc.id,
            likes: [], // Update with the appropriate type for 'likes'
            comments: [], // Update with the appropriate type for 'comments'
          }));
         
          
          const totalPosts = docSnapshot.size;
          setTotalPost(totalPosts);
    
          let totalLikes = 0;
          userBlogsData.forEach((blog) => {
            totalLikes += blog.likes.length;
          });
          setTotalLikes(totalLikes);
    
          let totalComments = 0;
          userBlogsData.forEach((blog) => {
            totalComments += blog.comments.length;
          });
          setTotalComments(totalComments);
    
          // let totalViews = 0;
          // const postIds = userBlogsData.map((blog) => blog.id);
          
          
          //   for (const postId of postIds) {
          //     const docRef = doc(db, 'views', postId);
          //     const docSnapshot = await getDoc(docRef);
          //     if (docSnapshot.exists()) {
          //       const viewData = docSnapshot.data();
          //       totalViews += viewData.count;
               
          //     }
              
          //   }
            
          //   setTotalViews(totalViews);
            
        
          const postIds = userBlogsData.map((blog) => blog.id);
    const viewCountPromises = postIds.map(async (postId) => {
      const docRef = doc(db, 'views', postId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const viewData = docSnapshot.data();
        return viewData.count;
      }
      return 0;
    });

    const viewCounts = await Promise.all(viewCountPromises);
    const totalViews = viewCounts.reduce((acc, count) => acc + count, 0);
    setTotalViews(totalViews);
    setLoading(false);
    
        }catch (error) {
          // Handle any errors that occur during fetching
          console.error('Error fetching user blogs:', error);
        }
      }
      
      if (loading) {
        return <Spinner />;
      }
//   let totalViews= 0;
//   userBlogs.forEach((blog) => {
//     totalComments += blog.length;

//     setTotalComments(totalComments) 
 
//   });
      

    return(
        <div className="  h-full w-full " >
        <div className="blog-heading text-left py-2 mb-4 text-2xl text-base-200 font-bold bg-slate-950 p-10">
       Your Analytics
      </div>
        <div className="stats m-auto w-full m-auto  stats-vertical lg:stats-horizontal shadow">
            <div className="stat">
          <div className="stat-title">Posts</div>
          <div className="stat-value">
            {totalPost} <i className="fas fa-feather text-accent"></i>
          </div>

          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>
        <div className="stat">
          <div className="stat-title">Your Readers</div>
          <div className="stat-value">
            {totalViews} <i className="fab fa-readme text-primary"></i>
          </div>

          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Likes</div>
          <div className="stat-value">
            {totalLikes} <i className="fas fa-thumbs-up text-secondary"></i>
          </div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Comments</div>
          <div className="stat-value">
           {totalComments} <i className="fas fa-comment text-info"></i>
          </div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>
      </div>
    )
}
export default Analytics;