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
        mt-5  pt-10 h-100 w-screen bg-slate-950 overflow-hidden">
        <div className="m-10 m-10 m_5 h-full ">
          <div className="blog-heading text-white shadow z-10  border-b-base-300 bg-accent text-left p-2 mb-4 fixed  hvr-bob ">
            Tag: <strong>{tag.toLocaleUpperCase()}</strong>
          </div>
         
        <ul
        className="flex flex-wrap"
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
        role="list"
        className=" flex flex-wrap  justify-content-center align-items-center flex-wrap w-full p-10 mob_width p_lr  pointer w_scr  bg-slate-950">
          {tagBlogs?.map((item) => (
            <li className="mt-10 ">
              <PostSection key={item.id} {...item} />
            </li>
          ))}
        
        </ul>
        </div>
      </div>
    </div>
  );
};

export default TagBlog;