import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState, useEffect } from "react";
// import {au } from "../../node_modules/firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { auth } from "../firebase/auth.js";
import "firebase/auth";
import"../pages/css/pages.css"
import { db } from "../firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Login = () => {
  // const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  //
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");

    const result = await signInWithPopup(auth, provider);
    const user = result.user

    // The signed-in user info.
   
    // This gives you a Google Access Token.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    await setDoc(
      doc(db, 'users', result.user.uid), 
      {name: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      },
    
    )
    
  };
  // useEffect(() => {
  //   const listen = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setAuthUser(user);
  //     } else {
  //       setAuthUser(null);
  //     }
  //   });

  //   return () => {
  //     listen();
  //   };
  // }, []);
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((userCredential) => {
        navigate("/dashboard");
       
      })
      .catch((err) => {
        setError(err.message);
      });

   

  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  // const loading = useAuthState(auth)

  return (
      <div
        
        className="   h-full p-20 mon_mag "
      >
        <div className="background">
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
</div>
        {/* <input type="checkbox" id="my-modal-2" className="modal-toggle" /> */}
        <div className="mar_top m-auto w-1/2 bg-slate-950 p_5  p-10 relative text-white rounded-box mob_width">
          <div className="">
            <h3 className="text-lg font-bold">Login to Chatter!</h3>
            {error && (
              <div className="alert alert-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}.</span>
              </div>
            )}
            <form onSubmit={login} className="form-control">
              <label className="label-text mt-5 text-slate-100">Email</label>
              <input
                // className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="Enter email"
                className="input input-bordered w-full  mt-3 text-slate-600"
              />
              <label className="label-text mt-5 text-slate-100">Password</label>
              <span className="flex mt-3 gap-2">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="password"
                  className="input input-bordered w-full   text-slate-600"
                  required
                />
                <button
                  onClick={handleTogglePassword}
                  className="bg-slate-600 w-20 centre p-1"
                >
                  {showPassword ? (
                    <i className="fas fa-eye m-auto m-1"></i>
                  ) : (
                    <i className="fas fa-eye-slash m-auto"></i>
                  )}
                </button>
              </span>

              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text text-slate-100">Remember me</span>
                  <input type="checkbox" className="checkbox border-base-300" />
                </label>
              </div>
              <div className="m-auto">
                <button
                  type="submit"
                  className="btn"
                  // onClick={()=>modal.showModal()}
                >
                  Login
                </button>
              </div>
            </form>
            <p className="text-center m-4">
              Dont have account yet?
              <NavLink className="text-success" to="/signup">
                {" "}
                Signup!
              </NavLink>{" "}
            </p>
            <div className="m-auto form-control">
              <p className="py-5 m-auto">or login with:</p>
              <div className="m-auto flex gap-7 my-5">
                <button
                  className="btn btn-active btn-circle"
                  onClick={signInWithGoogle}
                >
                  {" "}
                  <i className="fab fa-google text-3xl"></i>
                </button>
                <button className="btn btn-active btn-circle">
                  {" "}
                  <i className="fab fa-facebook-f text-3xl"></i>
                </button>
                <button className="btn btn-active btn-circle">
                  {" "}
                  <i className="fab fa-twitter text-3xl"></i>
                </button>
              </div>
            </div>
          </div>

      
        </div>
      </div>
  );
};

export default Login;
