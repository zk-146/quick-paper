import React from "react";
import { Link } from "react-router-dom";

import "./ButtonLink.css";

function ButtonLink({ path, onClick, type, placeholder }) {
  return (
    <div className="btn">
      <Link to={path} className="btn__link">
        <button onClick={onClick} type={type}>
          {placeholder}
        </button>
      </Link>
    </div>
  );
}

export default ButtonLink;
