/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, Key } from "react";
import { Link } from "react-router-dom";

const Tags = ({ tags }) => {
  return (
    <div>
      <div className="tags">
        {tags?.map((tag: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal, index: Key) => (
          <div className="badge badge-primary m-1 p-2 hvr-bounce-in" key={index}>
            <Link
              to={`/tag/${tag}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              {tag}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;