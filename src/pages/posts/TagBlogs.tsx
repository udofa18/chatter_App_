import { collection, getDocs, query, where } from "firebase/firestore";
import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostSection from "./PostSection";
import Spinner from "../../components/Spinner";
import { db } from "../../firebase/auth";

const TagBlog = () => {
  const [tagBlogs, setTagBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { tag } = useParams();


  const getTagBlogs = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const tagBlogQuery = query(blogRef, where("tags", "array-contains", tag));
    const docSnapshot = await getDocs(tagBlogQuery);
    const blogs = await getDocs(blogRef);
    const tagBlogs = [];
    docSnapshot.forEach((doc) => {
      tagBlogs.push({ id: doc.id, ...doc.data() });
    });
    setTagBlogs(tagBlogs);
    setLoading(false);
    const tags = [];
  blogs.docs.map((doc) => tags.push(...doc.get("tags")));
 
  };
  
  useEffect(() => {
    getTagBlogs();
    // setActive(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="
       mt-5  m_5 p-20 p_5  w-screen bg-slate-950 mob_width">
        <div className="m-10 m_5">
          <div className="blog-heading text-left text-white shadow  border-b-base-300 bg-accent text-left p-2 mb-4 fixed  hvr-bob ">
            Tag: <strong>{tag.toLocaleUpperCase()}</strong>
          </div>
         
        
          {tagBlogs?.map((item) => (
            <div className="col-md-6 pt-10">
              <PostSection key={item.id} {...item} />
            </div>
          ))}
        
        </div>
      </div>
    </div>
  );
};

export default TagBlog;