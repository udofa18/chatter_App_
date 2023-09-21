import { useEffect, useState } from "react";
import Tooltip from "bootstrap/js/dist/tooltip";
import 'bootstrap/dist/js/bootstrap.bundle';
import { auth } from "../../firebase/auth";
import { onAuthStateChanged } from "firebase/auth";


const Upvote = ({ handleUpvote, upvote }) => {
  useEffect(() => {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const tootipList = tooltipTriggerList.map(function (tooltipTriggerEl: string | Element) {
      return new Tooltip(tooltipTriggerEl);
    });
  }, []);
  const [authUser, setAuthUser] = useState(null);
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


  const userId = authUser?.uid;

  function UpvoteStatus() {
    if (upvote?.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return upvote.find((id: any) => id === userId) ? (
        <>
          <i className="fas fa-up-long text-primary p-2  m-auto" />
          &nbsp;{upvote?.length}
        </>
      ) : (
        <>
          <i className="fas fa-up-long text-secondary  m-auto" />
          &nbsp;{upvote?.length}
        </>
      );
    }
    return (
      <>
        <i className="fas fa-up-long text-primary  m-auto" />
        &nbsp;
      </>
    );
  }
  return (
    <>
      <span
        style={{ float: "right", cursor: "pointer"}}
        onClick={!userId ? null : handleUpvote}
      >
        {!userId?  (
          <div
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Please Login to like post"
          >
            <UpvoteStatus />
          </div>
        ) : (
          <div  className="">
            <UpvoteStatus />
          </div>
        )}
      </span>
    </>
  );
};

export default Upvote;