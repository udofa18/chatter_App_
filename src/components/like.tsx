import { useEffect } from "react";
import Tooltip from "bootstrap/js/dist/tooltip";
import 'bootstrap/dist/js/bootstrap.bundle';


const Like = ({ handleLike, likes, userId }) => {
  useEffect(() => {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const tootipList = tooltipTriggerList.map(function (tooltipTriggerEl: string | Element) {
      return new Tooltip(tooltipTriggerEl);
    });
  }, []);

  function LikeStatus() {
    if (likes?.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return likes.find((id: any) => id === userId) ? (
        <>
          <i className="fas fa-thumbs-up text-secondary hvr-buzz m-auto" />
          &nbsp;{likes.length}
        </>
      ) : (
        <>
          <i className="fas fa-thumbs-up hvr-buzz m-auto" />
          &nbsp;{likes.length}
        </> 
      );
    }
    return (
      <>
        <i className="fas fa-thumbs-up hvr-buzz m-auto" />
        &nbsp;
      </>
    );
  }
  return (
    <>
      <span
        style={{ float: "right", cursor: "pointer"}}
        onClick={!userId ? null : handleLike}
      >
        {!userId ? (
          <div
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Please Login to like post"
          >
            <LikeStatus />
          </div>
        ) : (
          <div  className="">
            <LikeStatus />
          </div>
        )}
      </span>
    </>
  );
};

export default Like;