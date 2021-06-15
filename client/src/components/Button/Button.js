import React from "react";

import "./Button.css";

const Button = ({ children, onClick, size = "", disabled = false }) => {
  return (
    <button
      type="submit"
      className={
        "button printButton " +
        (size === "" ? "" : "button-small ") +
        (!disabled ? "" : "button-disabled ")
      }
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
