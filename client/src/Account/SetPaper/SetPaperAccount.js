import React from "react";
import "./SetPaperAccount.css";

function SetPaperAccount() {
  return (
    <div className="account__container">
      <div className="account__containerSetPaper">
        <div className="account__containerSub">
          <p className="account__containerSubLeft">Set Paper</p>
          <p className="account__containerSubRight">15/200</p>
        </div>
        <div className="account__containerSub">
          <p className="account__containerSubLeft">Date of registration</p>
          <p className="account__containerSubRight">16-09-2020</p>
        </div>
        <div className="account__containerSub">
          <p className="account__containerSubLeft">Expires On</p>
          <p className="account__containerSubRight">16-09-2021</p>
        </div>
      </div>
    </div>
  );
}

export default SetPaperAccount;
