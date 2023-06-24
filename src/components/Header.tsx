import { NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/auth";
import { toast } from "react-toastify";
import "../components/css/header.css" 


const Header: React.FC = () => {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

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
  const userSignout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
        toast.error("Signout Successful");
      })
      .catch((error) => toast.error(error));
  };

  return (
    <>
      <div
        style={{
          color: "white",
          position: "fixed",
          top: "0",
          zIndex: "1",
          backgroundColor: "black",
        }}
        className="navbar navMobile "
      >
        <div className="flex-1">
          <NavLink to="/">
            <a className="btn normal-case text-xl text-white  header-btn">
              Chatter
            </a>
          </NavLink>
        </div>

        <div className="mr-10">
          <div>
            <NavLink to="/posts">
              <label className="btn btn-info normal-case text-md header-btn  w-36">
                Explore
              </label>
            </NavLink>
          </div>
          </div>
        <div className="">
          <div>
            <NavLink to="/createpost">
              <label className="btn normal-case text-md  w-36 header-btn">
                Create Post
              </label>
            </NavLink>
          </div>

          <div className="navbar-end flex no_display">
            <button className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button className="btn btn-ghost btn-circle ">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </button>
            <div className="flex-1"></div>
          </div>
          {authUser ? (
            ""
          ) : (
            < >
            <div className="no_display flex">
              <NavLink to="/login">
                <div className="flex-1">
                  <label className="btn btn-ghost  text-white">Login</label>
                </div>
              </NavLink>
              <NavLink to="/signup">
                <div className="flex-2">
                  <label className="btn btn-ghost  text-white">Signup</label>
                </div>
              </NavLink>
              </div>
            </>
          )}
          {authUser ? (
            <div className="dropdown dropdown-end ">
              <label
                tabIndex={0}
                className="btn btn-primary btn-circle avatar flex-row "
              >
                <div className="w-10 rounded-full  bg-primary">
                  <img src= {authUser.photoURL} />
                 
                </div>
                
              </label>
              
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-4 shadow bg-slate-600 rounded-box w-60"
              >
                <div>
                  {auth ? (
                    <p className="lowercase  left text-m ">{`${authUser.email}`}</p>
                  ) : (
                    ""
                  )}
                </div>

                <li className="">
                  <NavLink to="dashboard/Dash" className="justify-between">
                    Dashboard
                    <span className="badge">New</span>
                  </NavLink>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li onClick={userSignout}>
                  <a>Logout</a>
                </li>
              </ul>
           
            </div>
          ) : (
            ""
          )}
        
         

        </div>
      </div>

      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
    </>
  );
};
export default Header;
