import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: "AIzaSyCeiZbLVAYKPRGGcyaD6__DFZu-viC1p_g",
  authDomain: "chatter-c792f.firebaseapp.com",
  projectId: "chatter-c792f",
  storageBucket: "chatter-c792f.appspot.com",
  messagingSenderId: "864639171372",
  appId: "1:864639171372:web:277c0f3924f6bf9bd6ca89",
  measurementId: "G-GJJ218MB96"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);