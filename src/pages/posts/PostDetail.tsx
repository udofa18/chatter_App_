import {
  collection,
  doc,
  getDoc,
  getDocs,
  // limit,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  // orderBy,
  where,
} from "firebase/firestore";
import { isEmpty } from "lodash";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CommentBox from "../../components/CommentBox";
import Like from "../../components/like.tsx";
  import FeatureBlogs from "../../components/FeatureBlogs";
//   import RelatedBlog from "../components/RelatedBlog";
import Tags from "../../components/Tags";
import { auth } from "../../firebase/auth";
import { db } from "../../firebase/auth";
import Spinner from "../../components/Spinner.js";
import UserComment from "../../components/UserComment.tsx";
import { onAuthStateChanged } from "firebase/auth";
import Trending from "../../components/Trending.tsx";
import "react-markdown-editor-lite/lib/index.css";
import gfm from 'remark-gfm'
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";




const PostDetail = () => {

  
  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);



  const userId = authUser?.uid;
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  // const [totalBlogs, setTotalBlogs] = useState([]);

  useEffect(() => {
    const getRecentBlogs = async () => {
      const blogRef = collection(db, "blogs");

      // const recentBlogs = query(
      //   blogRef,
      //   orderBy("timestamp", "desc"),
      //   limit(5)
      // );
      const docSnapshot = await getDocs(blogRef);
      setBlogs(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    getRecentBlogs();
  }, []);

  // const MdEditor = () => import('react-markdown-editor-lite')

  useEffect(() => {
    id && getBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  


  if (loading) {
    return <Spinner />;
  }
  

  const getBlogDetail = async () => {
    
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const docRef = doc(db, "blogs", id);
    const blogDetail = await getDoc(docRef);
    const blogs = await getDocs(blogRef);
     const tags = [];
    blogs.docs.map((doc) => tags.push(...doc.get("tags")));
  
    const uniqueTags = [...new Set(tags)];
    setTags(uniqueTags);
  
    setBlog(blogDetail.data());
    const relatedBlogsQuery = query(
      blogRef,
      where("tags", "array-contains-any", blogDetail.data().tags)
    );
    setComments(blogDetail.data().comments ? blogDetail.data().comments : []);
    setLikes(blogDetail.data().likes ? blogDetail.data().likes : []);
    const relatedBlogSnapshot = await getDocs(relatedBlogsQuery);
    const relatedBlogs = [];
    relatedBlogSnapshot.forEach((doc) => {
      relatedBlogs.push({ id: doc.id, ...doc.data() });
    });
    setRelatedBlogs(relatedBlogs);
    // setActive(null);
    setLoading(false);

    
  };


  const handleComment = async (e) => {
    e.preventDefault();
    comments.push({
      createdAt: Timestamp.fromDate(new Date()),
      userId,
      name: authUser?.displayName,
      body: userComment,
    });
    toast.success("Comment posted successfully");
    await updateDoc(doc(db, "blogs", id), {
      ...blog,
      comments,
      timestamp: serverTimestamp(),
    });
    setComments(comments);
    setUserComment("");
  };

  const handleLike = async () => {
    if (userId) {
      if (blog?.likes) {
        const index = likes.findIndex((id) => id === userId);
        if (index === -1) {
          likes.push(userId);
          setLikes([...new Set(likes)]);
        } else {
          likes = likes.filter((id) => id !== userId);
          setLikes(likes);
        }
      }
      await updateDoc(doc(db, "blogs", id), {
        ...blog,
        likes,
        timestamp: serverTimestamp(),
      });
    }
  };


  console.log("relatedBlogs", relatedBlogs);
  return (
    <div>
    <div className=" flex   mt-10 w-screen bg-base-200 ">
      <div className="w-80 flex-1  h-100 snap-y  overflow-hidden ">
        <div className="card  shadow-xl w-full px-10 mt-10 relative">
          <figure style={{ margin: "0 auto",}} className="overflow-hidden mt-10 bg-slate-300">
            <img width={600} height={200} src={blog?.imgUrl} alt="" className="" />
          </figure>
          <div className="card-body relative">
            <h1 className="text-3xl font-bold text-base-400 pb-4">
              {blog?.postTitle}
            </h1>
            <div className="flex gap-5">
              <span>
                <p className="text-sm">
                  -{blog?.timestamp.toDate().toDateString()}
                </p>
              </span>
              <span className="meta-info text-start text-sm">
                <p className="author">Publihed by: {blog?.author}</p>
              </span>
            </div>
            <div className="flex flex-col-right gap-10  ">
            <Like handleLike={handleLike} likes={likes} userId={userId} />
            <div><i className="fas fa-comment"/> {comments?.length} Comments </div>
            </div>
            <div className="border">
              {" "}
              <Tags tags={blog?.tags} />
            </div>
            <p className=" text-lg ms-3">{blog?.postDescription}</p>

            <div>
            <ReactMarkdown
            remarkPlugins={[gfm]}
            components={{
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    // style={light}
                    language={match[1]}
                    PreTag="div"
                    children={String(children).replace(/\n$/, "")}
                    {...props}
                  />
                ) : (
                  <code className={className} {...props} />
                );
              }}}
            children={blog?.content as string} 
            className=" break-words p-4 bg-base-100 w-100 text-wrap markdown-body"

            
        
                
            />
            </div>
            <div className="flex flex-col-right gap-10 w-100  ">
            <Like handleLike={handleLike} likes={likes} userId={userId} />
            <div><i className="fas fa-comment"/> {comments?.length} Comments </div>
            </div>
            <div className="card glass p-5">
              <div className="scroll">
                <h4 className="small-title">{comments?.length} Comment</h4>
                {isEmpty(comments) ? (
                  <UserComment
                    msg={
                      "No Comment yet posted on this blog. Be the first to comment"
                    }
                    name="any"
                    body="any"
                    createdAt="any"
                  />
                ) : (
                  <>
                    {comments?.map((comment) => (
                      <UserComment {...comment} />
                    ))}
                  </>
                )}
              </div>

              <CommentBox
                userId={userId}
                userComment={userComment}
                setUserComment={setUserComment}
                handleComment={handleComment}
              />
            </div>
          </div>
        </div>
      </div>

      <div className=" pb-4 pt-4 p-4 bg-slate-800 snap-y w-80">
        <div className="container padding">
          <div className="row mx-0">
            <div className="col-md-3">
              <div className="font-bold text-start py-4 w-32 text-white">Tags</div>
              <Tags tags={tags} />
              <FeatureBlogs title={"Recent Blogs"} blogs={blogs} />
              
            </div>
          </div>
          {/* <RelatedBlog id={id} blogs={relatedBlogs} /> */}
        </div>
      </div>
    </div>
    <Trending blogs={blogs}/>
    </div>
  );
};
// export uniqueTags;
export default PostDetail;


