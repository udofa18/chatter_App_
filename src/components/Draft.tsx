import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/auth";
import Spinner from "./Spinner";
import { auth } from "../firebase/auth.js";
import {  NavLink } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Tags from "./Tags.js";
import { toast } from "react-toastify";

const Draft = () => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState([]);
  const [tags, setTags] = useState([]);

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

  const user = authUser?.uid;
  const excerpt = (str: string | undefined, count: number) => {
    if (str && str.length > count) {
      str = str.substring(0, count) + " ... ";
    }
    return str;
  };


  
  const fetchDraft = async () => {
    try {
    // setLoading(true);

      const draftRef = collection(db, "draft");
      const draftQuery = query(draftRef, where("userId", "==", user));
      const querySnapshot = await getDocs(draftQuery);
      const draftData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const tags = [];
      querySnapshot.docs.map((doc) => tags.push(...doc.get("tags")))

      setDraft(draftData);
      setLoading(false);
      const uniqueTags = [...new Set(tags)];
    setTags(uniqueTags);
   
    } catch (error) {
      console.error("Error fetching draft data:",);

      console.log(draft);

    }
    setLoading(false);
  };
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure wanted to delete that Draft ?")) {
      try {
        
        await deleteDoc(doc(db, "draft", id));
        toast.success("Draft deleted successfully");
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchDraft();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {authUser ? (
        <div>
          <div className="  h-full w-full ">
          <div className="blog-heading text-left py-2 mb-4 text-2xl text-base-200 font-bold bg-slate-950 p-10">
            My Drafts
          </div>
            <div
              className="  shadow-xl font-bold m-auto w-100 border border-sky-100 rounded-2xl "
              style={{
                overflow: "scroll",
                height: "40rem",
              }}
            >
              {draft?.map((item) => (
                <div className="flex p-5 m-2 hvr-backward " key={item.id}>
                  <img
                    className="h-32 w-40 img_size  bg-gray-50"
                    src={item.imgUrl}
                    alt={item.postTitle}
                  />
                  <div className="text-1xl font-bold text-gray-100 ml-2">
                    {" "}
                    {item.postTitle}
                    <p>{excerpt(item.postDescription, 120)}</p>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      // style={{ height: '500px' }}
                      children={excerpt(item.content, 200) as string}
                      className=" break-words mob_dis text-accent"
                    />
                    <p className="mt-1 text-xs leading-5 text-cyan-400">
                      Drafted on {item.timestamp.toDate().toDateString()}
                    </p>
                    <div className=""> 
              
              <Tags tags={tags} />
            </div>
            <span style={{ }} className="relative ml-10 ">
              <div onClick={() => handleDelete(item.id)} className="pointer hvr-glow">
            <i className="fas fa-trash-can  pointer  text-red-500 	p-2 text-sm "
               />Delete
              </div>
            <NavLink to={`/createpost/${item.id}`}>
              <i className="fas fa-pen  ml-4 text-cyan-400 text-sm"  /><span className="text-cyan-400"> Edit</span>
            </NavLink>
            </span>
            
            </div>
          </div>
            ) )}
          </div>
         
       </div>
       </div>
      ) : (
        
        <div className="text-white">
          NO DRAFT MADE
        </div>
      )}
    </>
  );
};

export default Draft;
