import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/auth";
import { db } from "../../firebase/auth";
import Spinner from "../../components/Spinner.js";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    // limit,
    query,
    serverTimestamp,
    Timestamp,
    updateDoc,
    // orderBy,
    where,
  } from "firebase/firestore";
import { useParams } from "react-router-dom";


const ContentFull = () => {
    const { id } = useParams();
    const [authUser, setAuthUser] = useState(null);
    const [comments, setComments] = useState([]);
    const [upvote, setupvote] = useState([]);
    const [downvote, setdownvote] = useState([]);

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

  return (
    <div>ContentFull</div>
  )
}

export default ContentFull