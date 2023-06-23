import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/auth";

export default function useFirebaseAuth() {
    // ...
    const clear = () => {
      setAuthUser(null);
      setLoading(true);
    };
  

  
    useEffect(() => {
      const unsubscribe = Firebase.auth().onAuthStateChanged(authStateChanged);
      return () => unsubscribe();
    }, []);
  
    return {
      authUser,
      loading,
     
    };
  }