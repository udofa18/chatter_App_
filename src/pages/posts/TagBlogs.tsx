import { collection, getDocs, query, where } from "firebase/firestore";
import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostSection from "./PostSection";
import Spinner from "../../components/Spinner";
import { db } from "../../firebase/auth";
import Tags from "../../components/Tags";

const TagBlog = () => {
  const [tagBlogs, setTagBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { tag } = useParams();
  const [tags, setTags] = useState([]);


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
  const uniqueTags = [...new Set(tags)];
  setTags(uniqueTags);
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
      <div className="container mt-10 m-20 p-20 h-screen w-screen bg-slate-200">
        <div className="m-10">
          <div className="blog-heading text-left  py-2 mb-4">
            Tag: <strong>{tag.toLocaleUpperCase()}</strong>
          </div>
          <div  className="my-10" >
          <Tags tags={tags} />
          </div>
          {tagBlogs?.map((item) => (
            <div className="col-md-6">
              <PostSection key={item.id} {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagBlog;