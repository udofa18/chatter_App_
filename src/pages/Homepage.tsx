import About from "../components/About";
import Features from "../components/Features";
import Review from "../components/Review";
import Trending from "../components/Trending";
import "./Homepage.css";
import { NavLink } from "react-router-dom";

const Homepage: React.FC = () => {
  return <>

    <div className="pt-10  w-full relative  bg-slate-950">
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
      <div
        style={{
          textAlign: "center",
          paddingTop: "10rem",
          backdropFilter:"blur(5px)"
        }}
        className="t_center h-screen pt-20  "
      >
        <div className="mt">
        <h1
          style={{ fontSize: "3rem", color: "white" }}
          className="py-5   t_center mob_font mt "
        >
            Express your Ideas.
        </h1>
        <h1
          style={{ fontSize: "4rem", color: "whitesmoke" }}
          className="py-2  t_center mob_font"
        >
        
            Share your Story. <i className="fas fa-feather  icn_text text-slate-300 "/>
        </h1>
        </div>
        <NavLink to="/login">
        <button className="btn btn-primary font-bold normal-case my-5 text-6l w-40  relative ">
          Join Scroll
        </button>
        </NavLink>
        <div className="w-full relative">
          <h2 className="text-base-200 font-bold text-2xl mt-20"> Categories:</h2>

          <div className="border-b-accent">
            <span className="inline-flex badge-outline items-center m-5 rounded-md  px-2 py-1 text-2xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
              Technology
            </span>
            <span className="inline-flex badge-outline items-center m-5 rounded-md  px-2 py-1 text-2xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
              Fashion
            </span>
            <span className="inline-flex badge-outline items-center m-5 rounded-md  px-2 py-1 text-2xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
              Lifestyle
            </span>
            <span className="inline-flex items-center m-5 rounded-md  px-2 py-1 text-2xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              Politics
            </span>
            <span className="inline-flex items-center m-5 rounded-md  px-2 py-1 text-2xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              Academic
            </span>
            <span className="inline-flex items-center  m-5 rounded-md  px-2 py-1 text-2xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
              Coding
            </span>
            <span className="inline-flex items-center m-5 rounded-md  px-2 py-1 text-2xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
              Religion
            </span>
            <span className='inline-flex items-center m-5 rounded-md  px-2 py-1 text-2xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10'>
              Fun
            </span>
          </div>
        </div>
      </div>
    </div>
    <About/>
    <Features/>
    <Trending blogs={undefined}/>
    <Review/>
    
    {/* <Trending /> */}
  </>;
};

export default Homepage;
