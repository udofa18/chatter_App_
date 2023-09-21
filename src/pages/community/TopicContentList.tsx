import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/auth";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { useParams } from "react-router-dom";
import TopicContentDetails from "../community/topicContentDetails";


 interface DissData {
  id: string;
  [key: string]: any;
}


 const TopicContentList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [discussions, setDiscussions] = useState<DissData[]>([]);
   const { id } = useParams<{ id: string }>();


   useEffect(() => {
    getDiscussionsData();
  }, [id]);


   if (loading) {
    return <Spinner />;
  }
   const getDiscussionsData = async () => {
    setLoading(true);
    const dissRef = collection(db, "community");
    const first = query(dissRef, orderBy("title"));
    const docSnapshot = await getDocs(first);
    const blogData = docSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as object),
    })) as DissData[];
    setLoading(false);
    setDiscussions(blogData);
  };
   return (
    <div className="w-full text-center">
      <div className="">
        <ul
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
          role="list"
          className=" justify-content-center h-screen overflow-y-auto px-32 align-items-center w-full p-10  mob_width p_lr pointer w_scr bg-slate-950"
        >
          {discussions.map((discussion) => (
            <li className="align-center my-4 border-b" key={discussion.id}>
              <TopicContentDetails
                topic={discussion.topic}
                id={discussion.id}
                title={discussion.title}
                description={discussion.description}
                timestamp={discussion.timestamp}
                author={discussion.author}
                imgUrl={discussion.imgUrl}
                likes={discussion.likes}
                dislikes={discussion.dislikes}
                discussion={discussion}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
 export default TopicContentList;