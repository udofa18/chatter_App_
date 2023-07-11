
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/auth";



const Trending = ({ blogs }) => {

  const [viewCount, setViewCount] = useState(0);

  // const handleIncrementViewCount = () => {
  //   const docRef = doc(db, 'views', blogs.id);
  // setDoc(docRef, {
  //   count: viewCount + 1,
  // }, { merge: true });
  
  //   setViewCount(viewCount + 1);
  // };
  const handleIncrementViewCount = async () => {
    const docRef = doc(db, 'views', blogs.id);
  
    try {
      const docSnapshot = await getDoc(docRef);
      
      if (docSnapshot.exists()) {
        // Document exists, increment view count
        await updateDoc(docRef, {
          count: increment(1)
        });
        setViewCount(viewCount + 1);
      } else {
        // Document does not exist, set view count to 1
        await setDoc(docRef, {
          count: 1
        });
        setViewCount(1);
      }
    } catch (error) {
      // Handle any errors that occur during fetching or updating
      console.error('Error incrementing view count:', error);
    }
  };
  const options = {
    loop: true,
    margin: 10,
    autoPlay: true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    animate: true,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  };
  return (
    <>
      <div className=" px-20 p_5 mob_width bg-slate-950 ">
        <div className="text-2xl text-start py-2 mb-4 text-slate-100 font-bold text_cen">Trending</div>
      
      <OwlCarousel animateIn autoplay className="owl-theme" {...options}>
        {blogs?.map((item) => (
          <div className="card px-2" key={item.id} >
            <Link to={`/posts/${item.id}`} onClick={handleIncrementViewCount}>
              <div className="relative pointer flex ">
                <div className="" style={{maxWidth:"300px", maxHeight:"300px"}}>
                  <img
                  
                    src={item.imgUrl}
                    alt={item.title}
                    className="relative h-48 w-40"
                  />
                </div>
                <div className="absolute h-full w-full bottom-0 bg-black  opacity-50 ">""</div>
                <div className="absolute w-100 z-40 p-4 bottom-0 ">
                  <span className="text-white font-bold">{item.postTitle}</span>
                  <div className="text-slate-300">
                    {item.author} - {item.timestamp.toDate().toDateString()}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </OwlCarousel>
      </div>
    </>
  );
};

export default Trending;