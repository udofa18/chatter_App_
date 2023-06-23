import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, Key } from "react";
import { Link } from "react-router-dom";

const Category = ({ catgBlogsCount }) => {
  return (
    <div className="widget">
      <div className="blog-heading text-white font-bold py-2 mb-4">Category</div>
      <div className="link-widget">
        <ul>
          {catgBlogsCount?.map((item: { category: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal; count: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal; }, index: Key) => (
            <li key={index} className="badge badge-warning badge-outline p-4 m-2 text-white">
              <Link
                to={`/category/${item.category}`}
                style={{ textDecoration: "none", float: "left" }}
                className="text-white"
              >
                {item.category}
                <span>({item.count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;