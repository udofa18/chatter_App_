import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from "../../firebase/auth";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase/auth.js';
import { useNavigate, useParams } from "react-router-dom";



const initialState = {
   title: "",
   topic: "",
   description: "",
   comments: [],
   likes: [],
   dislikes: [],
}
const categoryOption = [
   "Gaming",
   "Sports",
   "Business",
   "Crypto",
   "Technology",
   "Food",
   "Education",
   "Religion",
   "Arts",
   "Fashion",
   "Programming",
   "Movies",
   "Politics"
];
const Topics = () => {
   const [form, setForm] = useState(initialState);
   const { title, topic, description } = form;
   const [progress, setProgress] = useState(null);
   const [selectedImage, setSelectedImage] = useState(null);
   const [photoURL, setphotoURL] = useState("");
   const { id } = useParams();
   const [authUser, setAuthUser] = useState(null)
   const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
   const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
   const navigate = useNavigate();

   useEffect(() => {
      id && handleImageEdit()
      handleAddPost
   }, [id])
   useEffect(() => {
      const listen = onAuthStateChanged(auth, (user) => {
         if (user) {
            setAuthUser(user);

         } else {
            setAuthUser(null);
         }


      })

      return () => {
         listen();
      }
   }, [])
  
   const handleAddPost = async (e: { preventDefault: () => void; }) => {

      e.preventDefault();

      if (topic && title && description) {


         if (!id) {
            try {
               await addDoc(collection(db, "community"), {
                  ...form,
                  timestamp: serverTimestamp(),
                  author: authUser.displayName,
                  userId: authUser.uid,
                  // profileUrl: authUser.profileUrl,
               });
               toast.success("Discussion Created");
               navigate("/community")
            } catch (err) {
               console.log(err);
            }
         } else {



            if (id) {
               try {
                  await updateDoc(doc(db, "blogs", id), {
                     ...form,
                     timestamp: serverTimestamp(),
                     author: authUser.displayName,
                     userId: authUser.uid,
                     profileUrl: authUser.profileUrl,
                  });
                  toast.success("Discussion Updated");
                  navigate("/community")

               }



               catch (err) {
                  console.log(err);
                  toast.error("try again")
               }
            }

         }
      } else {
         return toast.error("All fields are mandatory to fill");
      }
   }
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
   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value });

   };
   const onTopicChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
      setForm({ ...form, topic: e.target.value });

   };

   return (
      <div className='w-25 border-r'>

         <ul className="m-8 text-white">
            <div className="flex text-white text-center">
            {authUser ? (
               <label htmlFor="my_modal_6" className="btn btn-primary flex cursor-pointer">+ Create  Discussion </label>
            ):("")}
            </div>
            <h4 className='py-4 border-b'>Topics</h4>
            <li className='flex gap-1 mb-4 hover:btn-primary rounded-full p-2 cursor-pointer '>
               <span>
                  <i className="fas fa-gamepad " />
               </span>
               Gaming

            </li>
            <li className='flex gap-1 mb-4 hover:btn-primary rounded-full p-2 cursor-pointer'>
               <span>
                  <i className="fas fa-futbol" />
               </span>
               Sports

            </li>
            <li className='flex gap-1 mb-4 hover:btn-primary rounded-full p-2 cursor-pointer'>
               <span>
                  <i className="fas fa-chart-line" />
               </span>
               Business

            </li>
            <li className='flex gap-1 mb-4 hover:btn-primary rounded-full p-2  cursor-pointer'>
               <span >
                  <i className="fab fa-btc" />
               </span>
               Crypto

            </li>
            <li className='flex gap-1 mb-4 hover:btn-primary rounded-full p-2 cursor-pointer'>
               <span>
                  <i className="fas fa-satellite-dish" />
               </span>
               Technology

            </li>
            <li className='flex gap-1 mb-4 hover:btn-primary rounded-full p-2 cursor-pointer'>
               <span>
                  <i className="fas fa-utensils" />
               </span>
               Food

            </li>
            <li className='flex gap-1 mb-4 hover:btn-primary rounded-full p-2 cursor-pointer'>
               <span>
                  <i className="fas fa-graduation-cap" />
               </span>
               Education

            </li>
            <li className='flex gap-1 mb-4 hover:btn-primary rounded-full p-2 cursor-pointer'>
               <span>
                  <i className="fas fa-cross" />
               </span>
               Religion

            </li>
            <li className='flex gap-1 mb-4 hover:btn-primary rounded-full p-2 cursor-pointer'>
               <span>
                  <i className="fas fa-palette" />
               </span>
               Arts

            </li>
            <li className='flex gap-1 mb-4 hover:btn-primary rounded-full p-2 cursor-pointer'>
               <span>
                  <i className="fab fa-angellist" />
               </span>
               Fashion

            </li>
            <li className='flex gap-1 mb-4 hover:btn-primary rounded-full p-2 cursor-pointer'>
               <span>
                  <i className="fas fa-code" />
               </span>
               Programming

            </li>
            <li className='flex gap-1 mb-4 hover:btn-primary rounded-full p-2 cursor-pointer'>
               <span>
                  <i className="fas fa-video" />
               </span>
               Movies

            </li>
            <li className='flex gap-1 mb-4 hover:btn-primary rounded-full p-2 cursor-pointer'>
               <span>
                  <i className="fas fa-scale-balanced" />
               </span>
               Politics

            </li>
         </ul>
         <input type="checkbox" id="my_modal_6" className="modal-toggle" />
         <div className="modal">

            <div className="modal-box text-left text-white">
               <form action="" className="form" method="dialog" onSubmit={handleAddPost}>
                  <label htmlFor="my_modal_6" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                  <h3 className="font-bold text-lg">New Discussion!</h3>
                  <div className=" block">
                     <div>
                        <label>Topic</label>
                        <div className="col-12 py-3">
                           <select
                              required
                              value={topic}
                              onChange={onTopicChange}
                              className="catg-dropdown select w-full p-3"
                              title='please select a topic'
                           >
                              <option>Please select topic</option>
                              {categoryOption.map((option, index) => (
                                 <option value={option || ""} key={index}>
                                    {option}
                                 </option>
                              ))}
                           </select>
                        </div>
                        <label>Title:</label>
                        <input
                           required
                           value={title}
                           placeholder='Title'
                           name='title'
                           onChange={handleChange}
                           type="text" className="p-2 w-full input input-bordered form-control"></input>
                     </div>
                     <div>
                        <label>Short Description</label>
                        <input
                           required
                           value={description}
                           name='description'
                           onChange={handleChange}
                           type="text" className="p-2 input input-bordered w-full " />
                     </div>
                     <label>Add Image</label>
                     <input type="file"
                        onChange={handleImageChange}
                        accept="image/*, video/*"
                        className=" w-full file-input file-input-bordered file-input-primary" />
                     <div className="card p-4 m-auto">
                        {previewUrl && (
                           <img
                              className="w-full h-30"
                              src={previewUrl}
                              alt="File Preview"
                           />
                        )}
                     </div>
                  </div>


                  <button disabled={progress !== null && progress < 100} className=" btn-primary mt-4" type="submit">
                     {id ? "Update" : "Submit"}
                  </button>
                  <button className=" text-danger mt-4" type="reset">
                    X clear
                  </button>
               </form>
            </div>
         </div>

      </div>
   )
}

export default Topics