import { useEffect, useState } from "react";
import Topics from "./Topics";
import TopicContentList from "./TopicContentList";


const CommunityPage = () => {
    return (
        <>
        <div className="pt-20 h-full w-screen bg-slate-950 flex">
            <Topics />
            <TopicContentList/>
        </div>
        </>

    )
}

export default CommunityPage