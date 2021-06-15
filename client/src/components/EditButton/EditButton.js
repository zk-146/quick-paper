import React from "react";
import EditIcon from "@material-ui/icons/Edit";

import "./EditButton.css";

const EditButton = ({ children, onClick }) => {
  return (
    <button className="editButton">
      <EditIcon onClick={onClick} />
      {children}
    </button>
  );
};

export default EditButton;
