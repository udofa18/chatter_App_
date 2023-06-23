import { useNavigate } from "react-router-dom";

const FeatureBlogs = ({ blogs, title }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="card text-white font-bold pt-3 py-2 mb-4">{title}</div>
      {blogs?.map((item) => (
        <div
          className="row flex pb-3 p-4 border-bottom my-4  "
          key={item.id}
          style={{ cursor: "pointer", borderBottom:"2px solid grey" }}
          onClick={() => navigate(`/posts/${item.id}`)}
        >
        
          <div className="col-7 padding text-white">
            <div className="text-start most-popular-font text-l font-bold">{item.postTitle}</div>
            <div className="text-start most-popular-font text-md text-slate-300">{item.postDescription}</div>
            <div className="text-sm most-popular-font-meta text-red-400">
              {item.timestamp.toDate().toDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureBlogs;