/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import PasswordStrengthBar from 'react-password-strength-bar';
import { createUserWithEmailAndPassword , GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {auth, db } from "../firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import"../pages/css/pages.css"


const Signup = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate()
  const [error, setError]= useState(null)
  const [username, setUsername] = useState("");
  
  const handleGoogleSignUp = async () => {
  const provider =  new GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');
const result = await signInWithPopup(auth, provider);

// The signed-in user info.
const user = result.user;
// // This gives you a Google Access Token.
const credential = GoogleAuthProvider.credentialFromResult(result);
const token = credential.accessToken;

  }
     const [password, setPassword] = useState("");
	const passwordChangeHandler = (event) => {
		setPassword(event.target.value);
	}
        const [showPassword, setShowPassword] = useState(false);
      
        const handleTogglePassword = (e) => {
            e.preventDefault();
          setShowPassword(!showPassword);
        };

        const signup=(e)=> {
          e.preventDefault();
          createUserWithEmailAndPassword (auth, email, password)
          .then(async(userCredential)=>{
            // const username = state;
            await setDoc(
              doc(db, 'users', userCredential.user.uid), 
              { password, email, username },
            );
            navigate('/login')
            console.log(userCredential);
          }).catch((err)=>{setError(err.message)})
        }
  return (
    <div>
         <div style={{
        backgroundImage:
          "url(https://img.freepik.com/free-photo/solemn-dark-skinned-african-american-student-his-workplace-looking-his-copy-book-writing-notes-preparing-final-exams-university-concentrated-handsome-guy-working-cafe-during-break_273609-7480.jpg?t=st=1685441892~exp=1685442492~hmac=3c9047f34a42bb3aaaadd0785fa188827e782ae191b569727d25a3938b1ce71c)",
      }}
          className=" overlay bg-cover bg-center h-full p-20  mon_mag ">
        <div className="m-auto w-1/2 glass p-10 relative text-white rounded-box  mob_width">
         
          <h3 className="text-lg font-bold">Signup to Chatter!</h3>
          {error  &&
          <div className="alert alert-error">
  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span>{error}.</span>
</div>}
          <form
          onSubmit={signup}
          className="form-control">
            <label className="label-text mt-5 text-slate-100">@Username</label>
            <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="@"
              className="input input-bordered w-full  text-slate-600 mt-3"
            />
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
            <span className="flex mt-3">
            <input
            value={password}
            
            type={showPassword ? 'text' : 'password'}
             id="password" 
              placeholder="password"
              className="input input-bordered w-full   text-slate-600"
              required
              onChange={passwordChangeHandler}
              
            />
            <button onClick={handleTogglePassword} className="bg-slate-600 w-20 centre p-1">
        {showPassword ? <i className="fas fa-eye m-auto m-1"></i> : <i className="fas fa-eye-slash m-auto"></i>}</button>

        </span>
        <PasswordStrengthBar password={password} className="mt-5"/>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text text-slate-100">Remember me</span>
                <input type="checkbox"  className="checkbox" />
              </label>
            </div>
            <div className="m-auto">
              <button type="submit" className="btn">
                Signup
              </button>
            </div>

          </form>
           <p className="text-center m-4">
              Dont have account yet?
              <NavLink className="text-success" to="/login">
                {" "}
                Login!
              </NavLink>{" "}
            </p>
          <div className="m-auto form-control">
            <p className="py-5 m-auto">or signup with:</p>
            <div className="m-auto flex gap-7 my-5">
              <button className="btn btn-active btn-circle" onClick={handleGoogleSignUp }>
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
  )
}

export default Signup