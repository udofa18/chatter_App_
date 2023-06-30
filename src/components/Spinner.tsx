import { DoubleOrbit } 
from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css'
import ClipLoader from "react-spinners/ClipLoader"

const Spinner : React.FC = () => {
  return (
    <div className="w-screen border h-screen p-40 m-auto"> 
    {/* <p className='text-4xl text-center text-white font-bold opacity-10'>CHATTER APP</p>
<DoubleOrbit text={"Loading..."} bgColor={"blue"} 
    center={true} width={"100px"} height={"100px"}/>
    <span className="loading loading-ring loading-lg text-secondary relative"/>
     */}
     <div className=' center  flex mt-40 '>
      <ClipLoader
        color={"skyblue"}
        // loading={loading}
        // cssOverride={override}
        
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
        className='m-auto w-100'
      />
      </div>
  </div>
  )
}

export default Spinner

