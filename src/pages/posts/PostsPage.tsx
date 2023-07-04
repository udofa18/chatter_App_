/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  DocumentData,
  DocumentSnapshot,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/auth";
import Spinner from "../../components/Spinner.js";
import Pagination from "../../components/Pagination.js";
import PostSection from "./PostSection.js";
import Tags from "../../components/Tags.js";
import FeatureBlogs from "../../components/FeatureBlogs";
import Trending from "../../components/Trending.js";
import Category from "../../components/Category.js";
import "../css/postpage.css";
import Search from "../../components/search.js";
import { isEmpty, isNull } from "lodash";
import { NavLink, useLocation, useParams } from "react-router-dom";
import "../Homepage.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
interface BlogData {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const PostsPage = () => {
  // const [search, setSearch] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastVisible, setLastVisible] =
    useState<DocumentSnapshot<DocumentData> | null>(null);
  const [noOfPages, setNoOfPages] = useState<number | null>(null);
  const [count, setCount] = useState(null);
  const [tags, setTags] = useState([]);
  const [random, useRandom] = useState<BlogData[]>([]);
  // const [blog, setBlog] = useState(null);

  const [totalBlogs, setTotalBlogs] = useState([]);
  const [hide, setHide] = useState(false);
  const id = (useParams)

  useEffect(() => {
    getBlogsData();
    getTotalBlogs();
    getPostsData();
  randomPost();
    // setSearch("");
    // setActive("blogs");
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const randomPost = async () => {
    setLoading(true);
    try {
      // Get all blog posts from the "blogs" collection
      const querySnapshot = await getDocs(collection(db, "blogs"));

      // Convert the query snapshot to an array of blog posts
      const blogPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as BlogData[];

      // Generate a random number within the range of the number of blog posts
      const randomIndex = Math.floor(Math.random() * blogPosts.length);

      // Get the randomly selected blog post
      const randomBlogPost = blogPosts[randomIndex];
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useRandom([randomBlogPost]);
      // Use the randomly selected blog post as desired (e.g., display it)
      console.log(randomBlogPost);
    } catch (error) {
      console.log("Error getting blog posts: ", error);
    }
  };
  console.log(random);
  // Call the function to get a random blog post

  const getPostsData = async () => {
    setLoading(true);

    const blogRef = collection(db, "blogs");
    const docSnapshot = await getDocs(blogRef);
    const blogData = docSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const blogPosts = docSnapshot.docs.map(function (doc) {
      return doc.data();
    });
    // const randomIndex = Math.floor(Math.random() * blogPosts.length)
    // const randomBlogPost = blogPosts[randomIndex];
    // setRandom (randomBlogPost)

    const list = [];
    docSnapshot.docs.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });

    const tags = [];
    docSnapshot.docs.map((doc) => tags.push(...doc.get("tags")));
    const uniqueTags = [...new Set(tags)];
    setTags(uniqueTags);

    // setBlog(blogs.data());
  };

  const getBlogsData = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const first = query(blogRef, orderBy("postTitle"), limit(6));
    const docSnapshot = await getDocs(first);
    const blogData = docSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as BlogData[];
    const list = [];
    docSnapshot.docs.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
    setTotalBlogs(list);
    setBlogs(blogData);
    setCount(docSnapshot.size);
    setLastVisible(docSnapshot.docs[docSnapshot.docs.length - 1]);
    setLoading(false);
    console.log(list);

    // setBlog(blogs.data());
  };

  const getTotalBlogs = async () => {
    const blogRef = collection(db, "blogs");
    const docSnapshot = await getDocs(blogRef);
    const totalBlogs = docSnapshot.size;
    const totalPage = Math.ceil(totalBlogs / 6);
    setNoOfPages(totalPage);
  };

  const fetchMore = async () => {
    // setLoading(true);
    const blogRef = collection(db, "blogs");
    const nextBlogsQuery = query(
      blogRef,
      orderBy("postTitle"),
      startAfter(lastVisible),
      limit(6)
    );
    const nextBlogsSnapshot = await getDocs(nextBlogsQuery);
    const nextBlogData = nextBlogsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as BlogData[];
    setBlogs(nextBlogData);
    setCount(nextBlogsSnapshot.size);
    setLastVisible(nextBlogsSnapshot.docs[nextBlogsSnapshot.docs.length - 1]);
    // setLoading(false);
  };

  // if (loading) {
  //   return <Spinner />;
  // }

  const fetchPrev = async () => {
    // setLoading(true);
    const blogRef = collection(db, "blogs");
    const end =
      noOfPages !== currentPage
        ? startAfter(lastVisible)
        : startAfter(lastVisible);
    const limitData =
      noOfPages !== currentPage
        ? limit(6)
        : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        count! <= 6 && noOfPages! % 2 === 0
        ? limit(6)
        : limit(6);
    const prevBlogsQuery = query(blogRef, orderBy("postTitle"), end, limitData);
    const prevBlogsSnapshot = await getDocs(prevBlogsQuery);
    const prevBlogData = prevBlogsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as BlogData[];
    setBlogs(prevBlogData);
    setCount(prevBlogsSnapshot.size);
    setLastVisible(prevBlogsSnapshot.docs[prevBlogsSnapshot.docs.length - 1]);
    // setLoading(false);
  };

  const handlePageChange = (value: string) => {
    if (value === "Next") {
      setCurrentPage((page) => page + 1);
      fetchMore();
    } else if (value === "Prev") {
      setCurrentPage((page) => page - 1);
      fetchPrev();
    }
  };
  const counts = totalBlogs.reduce((prevValue, currentValue) => {
    const name = currentValue.category;
    // eslint-disable-next-line no-prototype-builtins
    if (!prevValue.hasOwnProperty(name)) {
      prevValue[name] = 0;
    }
    prevValue[name]++;
    // delete prevValue["undefined"];
    return prevValue;
  }, {});

  const categoryCount: { category: string; count: number }[] = Object.keys(
    counts
  ).map((k) => {
    return {
      category: k,
      count: counts[k],
    };
  });
  console.log(categoryCount);


  return (
    <div className="w-screen bg-slate-800 h-100 overflow-hidden">
      <div className="w-screen relative bg-slate-950">
        <div className="background h-25">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className=" text-center p_lr mt-10 text-slate-200   text-4xl  font-bold p-40  mar_top">
          Explore Posts on{" "}
          <div className="badge badge-primary badge-xs mb-4"></div> <span>Scroll <i className="fas fa-feather"/></span>
        </div>
      </div>
     
      <div
        className="flex  mob_block w-100 bg-orange-400 relative"
      
      >
        <div className=" flex-1  justify-center">
          {/* <Search search={search} handleChange={handleChange} /> */}
          <div>
            {random.map((random) => (
              <div className="heroh-full bg-light-subtle p-10 m_0 p_lr">
                <div className="hero-content flex-col lg:flex-row">
                  <img
                    src={random.imgUrl}
                    
                    className=" max-w-sm rounded-lg shadow-2xl"
                  />
                  <div>
                  <p className="text-sm leading-6 text-primary"> Author: {random.author} </p>
                  <div className="badge"></div>
                    <h1 className="text-5xl font-bold">{random.postTitle}!</h1>
                    <p className="py-6">{random.postDescription}</p>
                    <NavLink to={`/posts/${random.id}`}>
                    <button className="btn btn-primary">Read</button>
                    </NavLink>
                  </div>

                </div>
              </div>
            ))}
          </div>
          <ul
            role="list"
            className=" flex  flex-wrap w-full p-10 mob_width p_lr m_0 m-auto pointer  bg-slate-950"
          >
            {blogs?.map((blog) => (
              <li
                className="   align-center "
                key={blog.id}
              >
                <PostSection
                   content={undefined}
                  postTitle={undefined}
                  postDescription={undefined}
                  imgUrl={undefined}
                  userId={undefined}
                  author={undefined}
                  timestamp={undefined}
                  {...blog}                />
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            noOfPages={noOfPages}
            handlePageChange={handlePageChange}
          />
        </div>
        <div className=" pb-4 pt-20 p-4 bg-slate-950 w-80 relative mob_width">
          <div className="container padding">
            <div className="row mx-0">
              <div className="col-md-3">
                <div className="font-bold text-start py-4  text-white">
                  Tags
                </div>
                <Tags tags={tags} />
                <Category catgBlogsCount={categoryCount} />
                <FeatureBlogs title={"Recent Blogs"} blogs={blogs} />
              </div>
            </div>
            {/* <RelatedBlog id={id} blogs={relatedBlogs} /> */}
          </div>
        </div>
      </div>
      <Trending blogs={blogs} />
    </div>
  );
};

export default PostsPage;
