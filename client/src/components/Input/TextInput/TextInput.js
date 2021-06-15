import React from "react";

import "./TextInput.css";

function TextInput({
  value,
  placeholder,
  type,
  size = "",
  onChange,
  required = false,
}) {
  return (
    <input
      className={"text__input " + (size === "" ? "" : "text__input-small")}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  );
}

export default TextInput;
