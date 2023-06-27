
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/auth";
import { useEffect, useState } from "react";



const Dash = () => {
  const [authUser, setAuthUser] = useState(null)

  useEffect(()=>{
    const listen =onAuthStateChanged(auth, (user)=>{
     if (user){
       setAuthUser(user);
 
     }else{
       setAuthUser(null);
     }
   
//  console.log(authUser)
   })
   return()=>{
    listen();
  }
}, [authUser])

  return (
   <>
      {authUser ? (

    <div className="w-100 bg-slate-300 p-5 p_5">
      <div className=" bg-base-100 shadow-xl flex">
        <figure>
          <img
            // width={80}
            src={authUser.photoURL}
            style={{  width: "5rem", height: "5rem" }}
            className="  m-0 rounded-full m-5
            "
          />
        </figure>
        <div className=" text ">
          <label>Full name:</label>
          <p className="card-title text-base">{authUser.displayName}</p>
          <label>Email:</label>         
          <p className="card-title text-base">{authUser.email}</p>
          <label>Last Sign-in:</label>
          <p className="card-title text-base">{authUser.metadata.lastSignInTime
}</p>
        </div>
      </div>

      <div className="stats stats-vertical lg:stats-horizontal shadow">
        <div className="stat">
          <div className="stat-title">Readers</div>
          <div className="stat-value">
            31K <i className="fas fa-heart"></i>
          </div>

          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Likes</div>
          <div className="stat-value">
            4,200 <i className="fas fa-thumbs-up"></i>
          </div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Comments</div>
          <div className="stat-value">
            1,200 <i className="fas fa-comment"></i>
          </div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>
    </div>)
    :("")
}
    </>
  );
};

export default Dash;
