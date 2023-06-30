import { DoubleOrbit } 
from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css'

const Spinner : React.FC = () => {
  return (
    <div className="w-full h-screen p-40  mt-40 "> 
    <p className='text-4xl text-center text-white font-bold opacity-10'>CHATTER APP</p>
{/* <DoubleOrbit text={"Loading..."} bgColor={"#F0A500"} 
    center={true} width={"100px"} height={"100px"}/> */}
    <span className="loading loading-ring loading-lg text-secondary relative"/>
  </div>
  )
}

export default Spinner

