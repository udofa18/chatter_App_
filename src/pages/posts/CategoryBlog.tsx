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
      <div className=" container mt-10 m-20 p-20 h-screen w-screen bg-slate-200">
        <div className="m-10">
          <div className="blog-heading text-left py-2 mb-4">
            Category: <strong>{category.toLocaleUpperCase()}</strong>
          </div>
          {categoryBlogs?.map((item) => (
            <div className="col-md-6">
              <PostSection key={item.id} {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBlog;



