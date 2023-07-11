/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState, useEffect, ChangeEventHandler } from "react";

import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { db, storage } from "../../firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { serialize } from 'slate-react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../tags.ts";
import "../tag.css";
import { auth } from '../../firebase/auth.js';
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import ReactMarkdown from "react-markdown";
import MarkdownIt from 'markdown-it';


import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import remarkMath from "remark-math";
// import rehypeKatex from "rehype-katex";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";


import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import "react-markdown-editor-lite/lib/index.css";
import gfm from 'remark-gfm'
import language from 'react-syntax-highlighter/dist/esm/languages/hljs/1c';
import {
  paragraphStyle,
  heading1,
  heading2,
  heading3,
  heading4,
  heading5,
  heading6,
  orderedListStyle,
  unorderedListStyle,
} from '../posts/MarkdownStyles.tsx'
// import ReactTagInput from "react-tag-input";

const mdParser = new MarkdownIt();

const RenderMd = ({ markdown }) => (
  <ReactMarkdown
    children={markdown}
    components={{
      code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || "");
        return !inline && match ? (
          <SyntaxHighlighter
            children={String(children).replace(/\n$/, "")}
            style={atomDark}
            language={match[1]}
            PreTag="div"
            {...props}
          />
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }
    }}
  />
);



const initialState = {
  postTitle: "",
  tags: [],
  trending: "no",
  category: "",
  postDescription: "",
  content: "",
  comments: [],
  likes: [],
};
const categoryOption = [
  "Fashion",
  "Technology",
  "Food",
  "Politics",
  "Sports",
  "Business",
  "Lifestyle",
  "Blockchain",
];




const CreatePost = ({ user}) => {
  // const [content, setContent] = useState<string>("");
  const [form, setForm] = useState(initialState);
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogId, setBlogID]= useState();

  const { postTitle, category, tags, postDescription, content  } = form;


  



  // const [value, setValue] = useState(initialValue);


  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);



  // const handleOnChange = (newValue) => {
  //   setValue(newValue);
  // };

  
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.log(e.target.files);
      setSelectedFile(undefined);
      setPreviewUrl(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
    
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result as string);
    };

    fileReader.readAsDataURL(e.target.files[0]);
  };
  const handleImageEdit = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    const data = snapshot.data();
    if (data) {
      const imgUrl = data.imgUrl as string;
      setPreviewUrl(imgUrl);
    }
  };

  const [progress, setProgress] = useState(null);

 


  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, selectedFile.name);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is done");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info("Image upload ");
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    selectedFile && uploadFile();
  }, [selectedFile]);

  useEffect(() => {
    id && getBlogDetail  ();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(() => {
    getDraft  ();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

useEffect(()=>{
  id && handleImageEdit()
},[id])

  const getBlogDetail = async () => {

    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    //  const blogId = id
    if (snapshot.exists()) {
      const data = snapshot.data() as {
        postTitle: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tags: any[];
        trending: string;
        category: string;
        postDescription: string;
        content: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        comments: any[];
        likes: any[];
        imgUrl: any
      };
      setForm({ ...data });
     
      
    } 
  
     
  };
    
const getDraft =  async() => {
const draftCollection =  doc(db,"draft", id)
const snapshot = await getDoc(draftCollection);
    if (snapshot.exists()) {
      const data = snapshot.data() as {
        postTitle: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tags: any[];
        trending: string;
        category: string;
        postDescription: string;
        content: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        comments: any[];
        likes: any[];
      };
      setForm({ ...data });
    }
}

   
 
  const handleEditorChange = ({ html, text }) => {
    console.log("handleEditorChange", html, text);
    const content=(text as string)
    setForm({ ...form, content });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(postTitle, form.postDescription);
  };
  const handleTags = (tags=[]) => {
        setForm({ ...form, tags });
        console.log( form.tags);
  };
  const onCategoryChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setForm({ ...form, category: e.target.value });
    console.log(category);
  };
  const [authUser, setAuthUser] = useState(null)
  useEffect(()=>{
    const listen =onAuthStateChanged(auth, (user)=>{
     if (user){
       setAuthUser(user);
 
     }else{
       setAuthUser(null);
     }
   
 
   })
 
   return()=>{
     listen();
   }
 }, [])
 console.log(content)


  const handleAddPost = async (e: { preventDefault: () => void; }) => {
   
    e.preventDefault();

    if (category && tags && postTitle && postDescription && content ) {

      
      if (!id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            timestamp: serverTimestamp(),
            author: authUser.displayName,
            userId: authUser.uid,
          });
          toast.success("Blog created successfully");
          navigate("/posts")
        } catch (err) {
          console.log(err);
        }
      } else {

        

      if (id){
        try {
          await updateDoc(doc(db, "blogs" , id), {
            ...form,
            timestamp: serverTimestamp(),
            author: authUser.displayName,
            userId: authUser.uid,
          });
          toast.success("Blog updated successfully");
          navigate("/posts")

          // try {
          //   await updateDoc(doc(db, "draft", id), {
          //     ...form,
          //     timestamp: serverTimestamp(),
          //     author: authUser.displayName,
          //     userId: authUser.uid,
          //   });
          //   toast.success("Blog updated successfully");
          //   navigate("/posts")
          // } catch (err) {
          //   console.log(err);
          }
      
        
        
        catch (err) {
          console.log(err);
          toast.error("Click on Publish Draft Instead")
        }
      }
        
      }
    } else {
      return toast.error("All fields are mandatory to fill");
    }}

    const handleAddDraft = async (e: { preventDefault: () => void; }) => {
   
      e.preventDefault();
  
      if (category && tags && postTitle && postDescription && content ) {
        if (!id) {
          try {
            await addDoc(collection(db, "draft"), {
              ...form,
              timestamp: serverTimestamp(),
              author: authUser.displayName,
              userId: authUser.uid,
            });
            toast.success("Added to Draft");
            
          } catch (err) {
            console.log(err);
          }
        }else {
          if (id){
            try {
              await updateDoc(doc(db, "draft" , id), {
                ...form,
                timestamp: serverTimestamp(),
                author: authUser.displayName,
                userId: authUser.uid,
              });
              toast.success("Draft updated ");
              
            }
            catch (err) {
              console.log(err);
              // toast.error("Click on Publish Draft Instead")
            }
        }
      }
    }
       
  };
  const handlepublishDraft = async (e: { preventDefault: () => void; }) => {
   
    e.preventDefault();

    if (category && tags && postTitle && postDescription && content ) {
      
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            timestamp: serverTimestamp(),
            author: authUser.displayName,
            userId: authUser.uid,
          });
          toast.success("Draft Published");
          
        } catch (err) {
          console.log(err);
        }
      }
     
};
  return (
      <div style={{}} className="bg-base-300 mt-20   ">
        <div className=" container  bg-base-200 p-20 m-auto p_5">
       
          <h3 className="text-lg font-bold"> {id ? "Edit Post" : "Create New Post "}</h3>
          <form className="form-control" onSubmit={handleAddPost}>
            <label className="label-text mt-5 text-l"> Title</label>

            <input
              required
              value={postTitle}
              name="postTitle"
              onChange={handleChange}
              type="text"
              className="input input-bordered w-full  mt-3 text-xl font-bold"
            />
            <label className="label-text mt-5 text-l">Description</label>

            <input
              required
              value={postDescription}
              type="text"
              name="postDescription"
              onChange={handleChange}
              className="input input-bordered w-full  text-x"
            ></input>

            <label className="label-text flex mt-5 text-x w-auto">
              Tags (Seperate with Key ENTER)
              <span className="bg-error p-1 block rounded text-x ">
              Ensure you select at least 1 Tag
            </span>
            </label>
            
            <div className=" border-1 rounded-1 cursor-text">
              <div className="tags flex m-2 border-1"></div>
              
              <ReactTagInput
              
            tags={tags}
            placeholder="Add Tags"
            onChange={handleTags}
            editable
            maxTags={10}
          />
              
            </div>
            
           
           
            <label className="label-text mt-5  mb-3 text-l">Add Image</label>

            <input
              type="file"
              onChange={handleImageChange}
              id="myFile"
              accept="image/*, video/*"
              name="filename"
              className="file-input file-input-bordered w-full max-w-xs"
            />
            <div className="card p-4 m-auto">
              {previewUrl && (
                <img
                  className="w-full h-30"
                  src={previewUrl}
                  alt="File Preview"
                />
              )}
            </div>
            <div className="col-12 py-3">
              <select
                value={category}
                onChange={onCategoryChange}
                className="catg-dropdown p-5"
              >
                <option>Please select category</option>
                {categoryOption.map((option, index) => (
                  <option value={option || ""} key={index}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <label className="label-text mt-5 md-5 text-l">Content</label>
            <div className="k-flex-grow" style={{ maxWidth: "100%" }}>
            <div className="App">
           
        <MdEditor
        
            style={{ height: "500px", display:"" }}
            value={content}
            renderHTML={(text) => mdParser.render(text) }
            onChange={handleEditorChange}
            view={{ menu: true, md: true, html: false }}
            canView={{
              menu: true,
              md: true,
              html: false,
              both: false,
              fullScreen: false,
              hideMenu: false,}}
            ></MdEditor>

<label className="label-text mt-20  text-l">Preview</label>
                <ReactMarkdown
            remarkPlugins={[gfm]}
            components={{
              p: ({ children }) => <p style={paragraphStyle}>{children}</p>,
              h1: ({ children }) => <h1 style={heading1}>{children}</h1>,
              h2: ({ children }) => <h2 style={heading2}>{children}</h2>,
              h3: ({ children }) => <h3 style={heading3}>{children}</h3>,
              h4: ({ children }) => <h4 style={heading4}>{children}</h4>,
              h5: ({ children }) => <h5 style={heading5}>{children}</h5>,
              h6: ({ children }) => <h6 style={heading6}>{children}</h6>,
              ol: ({ children }) => <ol style={orderedListStyle}>{children}</ol>,
              ul: ({ children }) => <ul style={unorderedListStyle}>{children}</ul>,

              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    // style={light}
                    {...props}
                    style={atomDark}
                    language={language}                   
                    PreTag="div"
                    children={String(children).replace(/\n$/, "")}
                   
                  />
                ) : (
                  <code {...props}  className={` bg-gray-200 p-4 text-black-900`}>
                    {children}
                  </code> 
                );
              }}}
            children={content as string} 
            className=" break-words p-4 bg-base-100 w-100 text-wrap markdown-body mt-10 mb-10"

            
        
                
            />
            
        
      </div>

            <div className="m-auto py-5">
              <button
                type="submit"
                className="btn mr-10"
                disabled={progress !== null && progress < 100}
              >
                {id? "Update" : "Submit"}

              </button>
               { id? (
               <button
                onClick={handlepublishDraft}
                 className="btn mr-10"
                 disabled={progress !== null && progress < 100}>
                   Publish Draft
                 
               </button>)
              :
              
              ("")}
             
              <button
              className="btn btn-accent"
              onClick={handleAddDraft}
              >
                <i className="fas fa-sd-card" />  {id? "Update" : ""}
              </button>

              
            </div> 
            </div>
         
          </form>
          
        </div>
      </div>
  );
};



export default CreatePost;
