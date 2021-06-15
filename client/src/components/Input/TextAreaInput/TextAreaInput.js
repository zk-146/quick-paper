import React from "react";

import "./TextAreaInput.css";

const TextAreaInput = ({ placeholder, onChange }) => {
  return (
    <textarea
      type="text"
      className="textArea__input"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default TextAreaInput;
