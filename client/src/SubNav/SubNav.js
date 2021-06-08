import React from "react";
import "./SubNav.css";

function SubNav() {
  return (
    <div className="subnav">
      <div className="subnav__container">
        <div className="subnav__containerProfile">
          <p>Profile</p>
        </div>
        <div className="subnav__containerSettings">
          <p>Settings</p>
        </div>
        <div className="subnav__containerSignOut">
          <p>Sign Out</p>
        </div>
      </div>
    </div>
  );
}

export default SubNav;
