import { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className=" absolute">
      {isVisible && (
        <span onClick={scrollToTop} className="fixed bottom-5 right-10">
          <i className="fa fa-arrow-up text-white btn bg-sky-600 text-2xl" />
        </span>
      )}
    </div>
  );
};

export default ScrollToTop;