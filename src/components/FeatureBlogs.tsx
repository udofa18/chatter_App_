import { doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase/auth";
import { useState } from "react";

const FeatureBlogs = ({ blogs, title, id }) => {
  const [viewCount, setViewCount] = useState(0);

  const handleIncrementViewCount = async () => {
    const docRef = doc(db, "views", id);
    try {
      await getDoc(docRef);
      // Document exists, increment view count
      updateDoc(docRef, {
        count: increment(1),
      });
      setViewCount(viewCount + 1);
    } catch (error) {
      // Document does not exist, set view count to 1
      await setDoc(docRef, {
        count: 1,
      });
      setViewCount(1);
    }
  };

  const navigate = useNavigate();
  return (
    <div>
      <div className="card text-white font-bold pt-3 py-2 mb-4">{title}</div>
      {blogs?.map((item) => (
        <Link
          to={`/posts/${item.id}`}
          onClick={() => {
            handleIncrementViewCount();
          }}
        >
          {" "}
          <div
            className="row flex pb-3 p-4 border-bottom my-4 hvr-hang  "
            key={item.id}
            style={{ cursor: "pointer", borderBottom: "2px solid grey" }}
          >
            <div
              className="col-7 padding text-white"
              onClick={handleIncrementViewCount}
            >
              <div className="text-start most-popular-font text-l font-bold">
                {item.postTitle}
              </div>
              <div className="text-start most-popular-font text-md text-slate-300">
                {item.postDescription}
              </div>
              <div className="text-sm most-popular-font-meta text-red-400">
                {item.timestamp.toDate().toDateString()}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FeatureBlogs;
