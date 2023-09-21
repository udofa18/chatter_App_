import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth } from "../../firebase/auth";
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from "../../firebase/auth";
import Upvote from './upvote.tsx';


const TopicContentDetails = ({
  id,
  title,
  topic,
  description,
  timestamp,
  author,
  imgUrl,
  likes,
  dislikes,
discussion,

}) => {

  const [authUser, setAuthUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [upvote, setUpvote] = useState([]);
  const [downvote, setDownvote] = useState([]);

 
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
  const userId = authUser?.uid;

  useEffect(() => {
    
    
  })
  const handleUpvote = async () => {
    
    if (userId) {
      if (discussion?.likes) {
        const index = likes.findIndex((id) => id === userId);
        const updatedLikes = [...likes]; // Create a new array to modify
  
        if (index === -1) {
          updatedLikes.push(userId);
          setUpvote([...new Set(updatedLikes)]); // Update the likes array
        } else {
          updatedLikes.splice(index, 1);
          setUpvote(updatedLikes); // Update the likes array
        }
  
        // Update the document in Firebase with the new likes array
        await updateDoc(doc(db, "community", id), {
          ...discussion,
          likes: updatedLikes,
          timestamp: serverTimestamp(),
        });
      }
    }
  };
  
// const handleDownvote=() => {
//   setDownvote(downvote + 1);
//   setUpvote(upvote - 1 )
// }


  return (
    <div className=' m-auto block w-full align-self-center relative' key={id}>
      <div style={{ height: "auto" }} className="card w-full p-4 block m-auto  hover:bg-slate-900  hover:border-cyan-500  hover:border" key={id}>
        {/* <div style={{width:"100%",height:"150px"}} className="relative overflow-hidden "> */}
        <div className='flex gap-4'>
          <div className="text-slate-600 "> /{topic}/</div>
          <div className="badge badge-ghost">Created by {author}</div>
          <p className="mt-1 text-xs leading-5 text-cyan-400">
            {timestamp.toDate().toDateString()}
          </p>
        </div>
        <h2 className="card-title py-5  text-white">
          {title}

        </h2>

        <figure style={{ width: "100%", height: "250%" }} className=" w-100  relative overflow-hidden">
          <img src={imgUrl} width={500}

            alt={title} />
        </figure>
        {/* </div> */}
        <div className="card-body bg-gradient text-left p_10 ">



          <p className="text-gray-300 italic">{description}</p>
          <div className="flex gap-4 ">
            <span className="text-white">
              <i className="fas fa-comment text-info " /> {comments?.length}
            </span>
            <span className="text-white flex gap-2 bg-slate-800  rounded-full overflow-hidden">
              <span className='hover:bg-slate-700 p-2'
              //  onClick={!userId ? null : handleUpvote}
               > 
              {/* <i className="fas fa-up-long text-primary " /> {likes?.length} */}
              <Upvote handleUpvote={handleUpvote} upvote={upvote} />
              </span>
              <span className='hover:bg-slate-700 p-2 '>
                <i className="fas fa-down-long text-secondary" /> {dislikes?.length}
              </span>
            </span>
            {/* <span className="text-white">
        <i className="fas fa-binoculars text-primary "/> {viewCount}
      </span> */}
          </div>





        </div>
      </div>
    </div>
  )
}

export default TopicContentDetails