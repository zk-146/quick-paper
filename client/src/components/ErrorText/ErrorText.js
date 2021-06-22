import React from "react";
import "./ErrorText.css";

function ErrorText({ error }) {
  return <p className="errorText">{error}</p>;
}

export default ErrorText;
