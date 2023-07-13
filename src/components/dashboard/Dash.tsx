/* eslint-disable @typescript-eslint/no-unused-vars */

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/auth";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/auth";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import Spinner from "../../components/Spinner";


const Dash = () => {
  const [authUser, setAuthUser] = useState(null);
  const [shortBio, setShortBio] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [interests, setInterests] = useState("");
  const [country, setCountry] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [occupation, setOccupation] = useState("");
  const [name, setName] = useState("");
  const [profileData, setProfileData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }

      //  console.log(authUser)
    });
    return () => {
      listen();
    };
  }, [authUser]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileDocRef = doc(db, "users", authUser.uid); // Assuming you have a "profiles" collection in Firebase
        const profileDocSnapshot = await getDoc(profileDocRef);
        if (profileDocSnapshot.exists()) {
          const profileData = profileDocSnapshot.data();
          setShortBio(profileData.shortBio || "");
          setFacebookLink(profileData.facebookLink || "");
          setTwitterLink(profileData.twitterLink || "");
          setGithubLink(profileData.githubLink || "");
          setLinkedinLink(profileData.linkedinLink || "");
          setInterests(profileData.interests || "");
          setCountry(profileData.country || "");
          setWebsiteUrl(profileData.websiteUrl || "");
          setOccupation(profileData.occupation || "");
          setName(profileData.name || "");
          setphotoURL(profileData.photoURL);
          // setProfileData(profileData)
        }
      } catch (error) {
        console.error("Error fetching profile data: ", error);
      }
    };

    if (authUser) {
      fetchProfileData();
    }
  }, [authUser]);
  const [loading, setLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [photoURL, setphotoURL] = useState("");
  const [progress, setProgress] = useState(null);

  if (loading) {
    return <Spinner />;
  }  
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));

    if (file) {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
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
            setphotoURL(downloadUrl);
          });
        }
      );
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const profileDocRef = doc(db, "users", authUser.uid); // Assuming you have a "profiles" collection in Firebase
      await setDoc(
        profileDocRef,
        {
          shortBio,
          facebookLink,
          twitterLink,
          githubLink,
          linkedinLink,
          interests,
          country,
          websiteUrl,
          occupation,
          name,
          photoURL,
        },
        { merge: true }
      );

      console.log("Profile updated successfully!");
      toast.success("Profile updated successfully!");
      
      navigate('/dashboard/Dash', { replace: true, state: { key: Math.random() }});
      setLoading(false)
      // Optionally, display a success message or navigate to a different page
    } catch (error) {
      console.error("Error updating profile: ", error);
      // Display an error message to the user
    }
  };

  return (
    <>
      {authUser ? (
        <div className="w-100 m-auto p_5">
          <div className="  shadow-xl font-bold m-auto w-100 border border-sky-100 rounded-2xl ">
            <div className="m-auto w-100">
              <img
                // width={80}
                src={photoURL}
                style={{ width: "10rem", height: "10rem" }}
                className=" rounded-full m-auto p-5
            "
              />
              <div  className=" image-upload m-auto   mb-5 p-0  text-center">
                <label htmlFor="file-input" className="btn bg-primary h-100 m-auto">
                  <i className="fas fa-upload text-center"></i> Update Photo
                </label>

                <input
                className="hidden"
                  id="file-input"
                  onChange={handleImageUpload}
                  accept="image/*"
                  type="file"
                />
              </div>

              <p className=" text-white m-auto text-center text-3xl">
                {name} {""}{" "}
              </p>
              <p className=" text-center text-base-300 dark:text-base-100">
                Last Activity: {authUser.metadata.lastSignInTime}
              </p>
              <div
                className="w-full m-auto flex align-content-center text-center align-self-center m-auto flex gap-5 text-2xl"
                style={{ justifyContent: "center" }}
              >
                <a href={facebookLink}>
                  <i className=" fab fa-facebook text-info"></i>
                </a>
                <a href={twitterLink}>
                  {" "}
                  <i className="fab fa-twitter text-info"></i>
                </a>
                <a href={linkedinLink}>
                  {" "}
                  <i className=" fab fa-linkedin text-info"></i>
                </a>
                <a href={githubLink}>
                  {" "}
                  <i className="fab fa-github text-info"></i>
                </a>
                <a href={websiteUrl}>
                  <i className="fas fa-globe text-accent"></i>
                </a>
              </div>
            </div>
            <form onSubmit={handleSubmit} className=" text-white m-auto ">
              <div className="flex mob_block ">
                <div className=" w-50 m-auto mt-10">
                  <h2>Basic Information</h2>
                  <label className="flex gap-4 p_5 p-5">
                    <div className="m-auto">Display Name:</div>
                    <input
                      type="text"
                      className="p-2 border rounded-full m-auto  text-slate-600 enabled:hover:border-gray-400 "
                      style={{ width: "20rem" }}
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                  <label className="flex gap-4 p_5 p-5">
                    <div className="m-auto">Bio:</div>
                    <input
                      type="text"
                      className="p-2 border rounded-full m-auto  text-slate-600 enabled:hover:border-gray-400 "
                      style={{ width: "20rem" }}
                      placeholder="I Love Meeting new People"
                      value={shortBio}
                      onChange={(e) => setShortBio(e.target.value)}
                    />
                  </label>
                  <label className="flex gap-4 p_5 p-5">
                    <div className="m-auto text-white">Email:</div>
                    <input
                      type="text"
                      disabled
                      className="p-2 border rounded-full m-auto  text-slate-600 enabled:hover:border-gray-400 "
                      placeholder={authUser.email}
                      style={{ width: "20rem" }}
                    />
                  </label>
                  <label className="flex gap-4 p_5 p-5">
                    <div className="m-auto text-white">Interests:</div>
                    <input
                      type="text"
                      className="p-2 border rounded-full m-auto  text-slate-600 enabled:hover:border-gray-400 "
                      style={{ width: "20rem" }}
                      placeholder="Football, React, Politics"
                      value={interests}
                      onChange={(e) => setInterests(e.target.value)}
                    />
                  </label>
                  <label className="flex gap-4 p_5 p-5">
                    <div className="m-auto text-white">Location:</div>
                    <input
                      type="text"
                      className="p-2 border rounded-full m-auto  text-slate-600 enabled:hover:border-gray-400 "
                      style={{ width: "20rem" }}
                      value={country}
                      placeholder="Lagos, Nigeria"
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </label>
                  <label className="flex gap-4 p_5 p-5">
                    <div className="m-auto text-white">Occupation:</div>
                    <input
                      type="text"
                      className="p-2 border rounded-full m-auto  text-slate-600 enabled:hover:border-gray-400 "
                      value={occupation}
                      style={{ width: "20rem" }}
                      placeholder="Software Dev"
                      onChange={(e) => setOccupation(e.target.value)}
                    />
                  </label>
                </div>
                <div className="w-50 m-auto mt-10">
                  <h2>Social Profile</h2>
                  <label className="flex gap-4 p_5 p-5">
                    <div className="m-auto text-white">Facebook:</div>
                    <input
                      type="url"
                      className="p-2 border rounded-full m-auto  text-slate-600 enabled:hover:border-gray-400 "
                      style={{ width: "20rem" }}
                      value={facebookLink}
                      pattern="https://.*"
                      onChange={(e) => setFacebookLink(e.target.value)}
                    />
                  </label>
                  <label className="flex gap-4 p_5 p-5">
                    <div className="m-auto text-white">Twitter:</div>

                    <input
                      type="url"
                      className="p-2 border rounded-full m-auto  text-slate-600 enabled:hover:border-gray-400 "
                      style={{ width: "20rem" }}
                      value={twitterLink}
                      pattern="https://.*"
                      onChange={(e) => setTwitterLink(e.target.value)}
                    />
                  </label>
                  <label className="flex gap-4 p_5 p-5">
                    <div className="m-auto text-white">Github:</div>

                    <input
                      type="url"
                      className="p-2 border rounded-full m-auto  text-slate-600 enabled:hover:border-gray-400 "
                      style={{ width: "20rem" }}
                      value={githubLink}
                      pattern="https://.*"
                      onChange={(e) => setGithubLink(e.target.value)}
                    />
                  </label>
                  <label className="flex gap-4 p_5 p-5">
                    <div className="m-auto text-white">Linkedin:</div>

                    <input
                      type="url"
                      className="p-2 border rounded-full m-auto  text-slate-600 enabled:hover:border-gray-400 "
                      style={{ width: "20rem" }}
                      value={linkedinLink}
                      pattern="https://.*"
                      onChange={(e) => setLinkedinLink(e.target.value)}
                    />
                  </label>
                  <label className="flex gap-4 p_5 p-5">
                    <div className="m-auto text-white">Website:</div>

                    <input
                      type="url"
                      pattern="https://.*"
                      className="p-2 border rounded-full m-auto  text-slate-600 enabled:hover:border-gray-400 "
                      style={{ width: "20rem" }}
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                    />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="m-auto mt-10 mb-5 block bg-primary text-center"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Dash;
