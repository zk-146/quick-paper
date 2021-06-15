import React from "react";

import "./DisplayTable.css";
import Table from "../Table/Table";

const DisplayTable = ({ header, ...otherProps }) => {
  return (
    <div>
      <p className="tables__subject">{header}</p>
      <Table {...otherProps} />
    </div>
  );
};

export default DisplayTable;
