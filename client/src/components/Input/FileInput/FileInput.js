import React from "react";

import "./FileInput.css";

const FileInput = ({ placeholder, onChange }) => {
  return (
    <input
      type="file"
      className="file__input"
      style={{ cursor: "pointer", width: "20rem" }}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default FileInput;
