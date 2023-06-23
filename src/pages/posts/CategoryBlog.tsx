import { collection, getDocs, query, where } from "firebase/firestore";
import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostSection from "../posts/PostSection";
import Spinner from "../../components/Spinner";
import { db } from "../../firebase/auth";

const CategoryBlog = ( ) => {
  const [categoryBlogs, setCategoryBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { category } = useParams();

  const getCategoryBlogs = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const categoryBlogQuery = query(blogRef, where("category", "==", category));
    const docSnapshot = await getDocs(categoryBlogQuery);
    const categoryBlogs = [];
    docSnapshot.forEach((doc) => {
      categoryBlogs.push({ id: doc.id, ...doc.data() });
    });
    setCategoryBlogs(categoryBlogs);
    setLoading(false);
    
  };
  console.log(categoryBlogs)
  useEffect(() => {
    getCategoryBlogs();
    // setActive(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className=" container mt-5 m-20 pt-10 h-full w-screen bg-slate-200 overflow-hidden">
        <div className="m-10 h-full overflow-scroll">
          <div className="blog-heading text-white shadow  border-b-base-300 bg-accent text-left p-2 mb-4 fixed  hvr-bob ">
            Category: <strong>{category.toLocaleUpperCase()}</strong>
          </div>
          {categoryBlogs?.map((item) => (
            <div className="col-md-6 mt-10 ">
              <PostSection key={item.id} {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBlog;



