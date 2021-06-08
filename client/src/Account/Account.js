import React, { useState } from "react";
import "./Account.css";
import Profile from "./Profile/Profile";
import SetPaperAccount from "./SetPaper/SetPaperAccount";
import SavedPaperAccount from "./SavedPaper/SavedPaperAccount";

function Account() {
  let [profile, setProfile] = useState(true);
  let [setPaper, setSetPaper] = useState(false);
  let [savedPaper, setSavedPaper] = useState(false);

  function handleClick() {
    if (profile) {
      return <Profile />;
    } else if (setPaper) {
      return <SetPaperAccount />;
    } else if (savedPaper) {
      return <SavedPaperAccount />;
    }
  }

  return (
    <div className="account">
      <div>
        <div className="account__sidebar">
          <div
            className={
              profile === true
                ? "account__sidebarProfile account__sidebarSelected"
                : "account__sidebarProfile"
            }
            onClick={() => {
              setSetPaper(false);
              setSavedPaper(false);
              setProfile(true);
            }}
          >
            <p>Profile</p>
          </div>
          <div
            className={
              setPaper === true
                ? "account__sidebarSetPaper account__sidebarSelected"
                : "account__sidebarSetPaper"
            }
            onClick={() => {
              setProfile(false);
              setSavedPaper(false);
              setSetPaper(true);
            }}
          >
            <p>Set Paper</p>
          </div>
          <div
            className={
              savedPaper === true
                ? "account__sidebarSavedPaper account__sidebarSelected"
                : "account__sidebarSavedPaper"
            }
            onClick={() => {
              setProfile(false);
              setSetPaper(false);
              setSavedPaper(true);
            }}
          >
            <p>Saved Paper</p>
          </div>
        </div>
        {handleClick()}
      </div>
    </div>
  );
}

export default Account;
