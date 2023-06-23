import { uuidv4 } from "@firebase/util";
import { serverTimestamp, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/auth";

export function useAddPost() {
    const [isLoading, setLoading] = useState(false);
   
    
    async function addPost(post) {
        setLoading(true);
        const id = uuidv4();
        console.log(post)

        await setDoc(doc(db, "posts", id), {
            ...post,
            id,
            date:  serverTimestamp(),
            
        });
       
        setLoading(false);
    }


    return { addPost, isLoading };
}



// export function usePosts(uid = null) {
//     const q = uid
//         ? query(
//             collection(db, "posts"),
//             orderBy("date", "desc"),
//             where("uid", "==", uid)
//         )
//         : query(collection(db, "posts"), orderBy("date", "desc"));
//     const [posts, isLoading, error] = useCollectionData(q);
//     if (error) throw error;
//     return { posts, isLoading };
// }

// export function useToggleLike({ id, isLiked, uid }) {
//     const [isLoading, setLoading] = useState(false);

//     async function toggleLike() {
//         setLoading(true);
//         const docRef = doc(db, "posts", id);
//         await updateDoc(docRef, {
//             likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
//         });
//         setLoading(false);
//     }

//     return { toggleLike, isLoading };
// }



// export function useDeletePost(id) {
//     const [isLoading, setLoading] = useState(false);
    

//     async function deletePost() {
//         const res = window.confirm("Are you sure you want to delete this post?");

//         if (res) {
//             setLoading(true);

//             // Delete post document
//             await deleteDoc(doc(db, "posts", id));
           
//             setLoading(false);
//         }
//     }

//     return { deletePost, isLoading };
// }