/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  DocumentData,
  DocumentSnapshot,
  endAt,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/auth";
import Spinner from "../../components/Spinner.js";
// import Pagination from "../../components/Pagination.js";
import PostSection from "./PostSection.js";
import Tags from "../../components/Tags.js";
import FeatureBlogs from "../../components/FeatureBlogs";
import Trending from "../../components/Trending.js";
import Category from "../../components/Category.js";
import "../css/postpage.css";
import Search from "../../components/search.js";
import Pagination from '@mui/material/Pagination';
import { isEmpty, isNull } from "lodash";
import { NavLink, useLocation, useParams } from "react-router-dom";
import "../Homepage.css";
import { Helmet } from "react-helmet";
// import { ThemeOptions, Theme } from "@mui/material";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}
interface BlogData {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}


const PostsPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastVisible, setLastVisible] =
    useState<DocumentSnapshot<DocumentData> | null>(null);
  const [noOfPages, setNoOfPages] = useState<number | null>(null);
  const [count, setCount] = useState(null);
  const [noBlogs, setNoBlogs] = useState(null);
  // const queryString = useQuery();
  // const searchQuery = queryString.get("searchQuery");
  const [tags, setTags] = useState([]);
  const [random, useRandom] = useState<BlogData[]>([]);
  // const [blog, setBlog] = useState(null);
  const [search, setSearch] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState([]);
  const [hide, setHide] = useState(false);
  const [page, setPage] = useState(1);
  const id = useParams;
  

  

  useEffect(() => {
    getBlogsData();
    getTotalBlogs();
    getPostsData();
    randomPost();
    // setSearch("");
    // setActive("post");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  

  // useEffect(() => {
  //   getPostsData();
  // }, [search]);

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
    setLoading(false);
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
    if (docSnapshot && Array.isArray(docSnapshot.docs)) {
      docSnapshot.docs.forEach((doc) => {
        const blogData = doc.data();
        if (blogData && Array.isArray(blogData.tags)) {
          tags.push(...blogData.tags);
        }
      });
    }
    const uniqueTags = [...new Set(tags)];
    setTags(uniqueTags);

    // setBlog(blogs.data());
  };

  const getBlogsData = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const first = query(blogRef, orderBy("postTitle"));
    const docSnapshot = await getDocs(first);
    const blogData = docSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as BlogData[];
    const list = [];
    docSnapshot.docs.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });

    const filteredBlogs = blogData.filter((blog) => {
      // Customize the search condition based on your requirements
      // Here, we check if the post title or tags contain the search query
      return (
        blog.postTitle.toLowerCase().includes(search.toLowerCase()) ||
        blog.tags.includes(search.toLowerCase())
      );
    });
    setBlogs(filteredBlogs);
    setCount(filteredBlogs.length);
    setLastVisible(null);

    setTotalBlogs(list);

    setBlogs(blogData);
    setCount(docSnapshot.size);
    setLastVisible(docSnapshot.docs[docSnapshot.docs.length - 1]);
    setLoading(false);
    console.log(list);

    // setBlog(blogs.data());
  };
  const handleSearch = () => {
    return blogs.filter(
      (blogs) =>
        blogs.postTitle.toLowerCase().includes(search) ||
        blogs.postDescription.toLowerCase().includes(search) ||
        blogs.content.toLowerCase().includes(search)
    );
  };


  const getTotalBlogs = async () => {
    const blogRef = collection(db, "blogs");
    const docSnapshot = await getDocs(blogRef);
    const totalBlogs = docSnapshot.size;
    const totalPage = Math.ceil(totalBlogs / 6);
    setNoOfPages(totalPage);
  };

  const fetchMore = async () => {
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

    if (nextBlogsSnapshot.size === 0) {
      // setLoading(false);
      return; // Exit the function without updating the state or page number
    }

    setBlogs(nextBlogData);
    setCount(nextBlogsSnapshot.size);
    console.log(nextBlogsSnapshot.size);
    setLastVisible(nextBlogsSnapshot.docs[nextBlogsSnapshot.docs.length - 1]);
  };




  const fetchPrev = async () => {
    const blogRef = collection(db, "blogs");
    const end =
      noOfPages !== currentPage ? endAt(lastVisible) : endBefore(lastVisible);
    const limitData =
      noOfPages !== currentPage
        ? limit(6)
        : count <= 6 && noOfPages % 2 === 0
        ? limit(6)
        : limitToLast(6);
    const prevBlogsQuery = query(blogRef, orderBy("postTitle"), end, limitData);
    const prevBlogsSnaphot = await getDocs(prevBlogsQuery);
    setBlogs(
      prevBlogsSnaphot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
    setCount(prevBlogsSnaphot.size);
    setLastVisible(prevBlogsSnaphot.docs[prevBlogsSnaphot.docs.length - 1]);
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
  // const handleChange = (e) => {
  //   const { value } = e.target;
  //   if (isEmpty(value)) {
  //     console.log("test");
  //     setBlogs([]);
  //     setHide(false);
  //   }
  //   setSearch(value);
  // };
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
  // const searchBlogs = async () => {
  //     const blogRef = collection(db, "blogs");
  //     const searchTitleQuery = query(blogRef, where("postTitle", "==", searchQuery));
  //     const searchTagQuery = query(
  //       blogRef,
  //       where("tags", "array-contains", searchQuery)
  //     );
  //     const titleSnapshot = await getDocs(searchTitleQuery);
  //     const tagSnapshot = await getDocs(searchTagQuery);

  //     const searchTitleBlogs = [];
  //     const searchTagBlogs = [];
  //     titleSnapshot.forEach((doc) => {
  //       searchTitleBlogs.push({ id: doc.id, ...doc.data() });
  //     });
  //     tagSnapshot.forEach((doc) => {
  //       searchTagBlogs.push({ id: doc.id, ...doc.data() });
  //     });
  //     const combinedSearchBlogs = searchTitleBlogs.concat(searchTagBlogs);
  //     setBlogs(combinedSearchBlogs);
  //     setHide(true);
  //     setActive("");
  //   };

  return (
    <div className="w-screen bg-slate-800 h-100 overflow-hidden">
      <Helmet>
        <meta name="Explore" content="Explore Slate" />
      </Helmet>
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
          <div className="badge badge-primary badge-xs mb-4"></div>{" "}
          <span>
            Scroll <i className="fas fa-feather" />
          </span>
        </div>
      </div>

      <div className="flex  mob_block w-100  relative">
        <div className=" flex-1  justify-center">
          {/* <Search search={search} handleChange={handleChange} /> */}
          <div className="bg-orange-400">
            {random.map((random) => (
              <div className="heroh-full bg-light-subtle text-left p-10 m_0 p_lr">
                <div className="hero-content flex-col lg:flex-row">
                  <img
                    src={random.imgUrl}
                    className=" max-w-sm rounded-lg shadow-2xl"
                  />
                  <div>
                    <p className="text-sm leading-6 text-primary">
                      {" "}
                      Author: {random.author}{" "}
                    </p>
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

          <div style={{ textAlign: "center" }}></div>
          <div
            className="form-floating pt-10 text-center m-auto my-fs-4 p-1 bg-slate-950"
            // style={{ width: "30%" }}
          >
            <input
              style={{ color: "gold" }}
              className="bg-transparent input input-bordered input-accent w-full max-w-xs"
              id="floatingInputCustom"
              type="text"
              placeholder="Search Scrolls"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ul
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
            role="list"
            className=" flex  justify-content-center align-items-center flex-wrap w-full p-10 mob_width p_lr  pointer w_scr  bg-slate-950"
          >
            {handleSearch()
            .slice((page - 1) * 12, (page - 1) * 12 + 12)
            .map((blog) => (
              <li className="   align-center " key={blog.id}>
                <PostSection
                  content={undefined}
                  postTitle={undefined}
                  postDescription={undefined}
                  imgUrl={undefined}
                  userId={undefined}
                  author={undefined}
                  timestamp={undefined}
                  {...blog}
                />
              </li>
            ))}
          </ul>
          {/* <Pagination
            currentPage={currentPage}
            noOfPages={noOfPages}
            handlePageChange={handlePageChange}
            
          /> */}
           {/* <Pagination
                count={parseInt((handleSearch()?.length / 4).toFixed(0))}
                style={{
                  padding: 1,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  color: "white !important" ,
                  fontSize: "50px",
                  backgroundColor:"gold"
                }}
                size="large"
                // classes={{ ul: theme.pagination }}
                onChange={(_, value) => {
                  setPage(value);
                  window.scroll(0, 450);
                } } /> */}
                <Pagination 
                count={parseInt((handleSearch()?.length / 9).toFixed(0))}
                style={{
                  padding: 1,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  color: "green " ,
                  fontSize: "50px",
                  outline:"white ",
                  backgroundColor:"skyblue"
                }}
               
                                  onChange={(_, value) => {
                  setPage(value);
                  window.scroll(0, 450);
                } }
                className=""
                 color="primary" />
        </div>
        <div style={{height:"2465px"}} className=" pb-4 pt-20 p-4 bg-slate-800 w-80  relative mob_width border-l-2 border-l-gray-600 overflow-scroll">
          <div className="container padding">
            <div className="row mx-0">
              <div className="col-md-3">
                <div className="font-bold text-start py-4  text-white">
                  Tags
                </div>
                <Tags tags={tags} />
                <Category catgBlogsCount={categoryCount} />
                <FeatureBlogs title={"Recent Blogs"} blogs={blogs} id={id} />
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


