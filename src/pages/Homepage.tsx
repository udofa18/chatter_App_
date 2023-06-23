import About from "../components/About";
import Features from "../components/Features";
import Review from "../components/Review";
import Trending from "../components/Trending";
import "./Homepage.css";

const Homepage: React.FC = () => {
  return <>
    <div className="pt-10 m-0 z-index w-full relative bg">
      <div
        style={{
          textAlign: "left",
          marginBottom: "8rem",
          paddingTop: "10rem",
        }}
        className="text-center p-4 w-50 m-10 "
      >
        <h1
          style={{ fontSize: "3rem", color: "white" }}
          className="py-5 blinking-text"
        >
          <span
            // style={{ backgroundColor: "#F65942", borderRadius: "30px" }}
            className="font-bold p-2 text-base-200 glass"
          >
            Express
          </span>{" "}
          your Ideas.
        </h1>
        <h1
          style={{ fontSize: "5rem", color: "whitesmoke" }}
          className="py-5 blinking-text"
        >
          <span
            // style={{ backgroundColor: "#F65942", borderRadius: "30px" }}/
            className="font-bold p-2"
          >
            Share
          </span>{" "}
          your Story.
        </h1>
        <button className="btn btn-active normal-case my-5 text-6l w-40 text-cyan-400 relative glass text-base-300">
          Join Chatter
        </button>
        <div className="w-full relative">
          <h2>Browse Categories</h2>

          <div className="border-b-accent">
            <span className="inline-flex items-center m-5 rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
              Badge
            </span>
            <span className="inline-flex items-center m-5 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
              Badge
            </span>
            <span className="inline-flex items-center m-5 rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
              Badge
            </span>
            <span className="inline-flex items-center m-5 rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              Badge
            </span>
            <span className="inline-flex items-center m-5 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              Badge
            </span>
            <span className="inline-flex items-center  m-5 rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
              Badge
            </span>
            <span className="inline-flex items-center m-5 rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
              Badge
            </span>
            <span className='inline-flex items-center m-5 rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10'>
              Badge
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
