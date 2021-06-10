import React, { useState } from "react";
import "./Profile.css";
import EditIcon from "@material-ui/icons/Edit";
import { parseCookies } from "nookies";
import axios from "../../axios";

function Profile() {
  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(cookie.user) : null;

  const [editName, setEditName] = useState(false);
  const [name, setName] = useState(user.name);
  const { email } = user;
  const [editPassword, setEditPassword] = useState(false);
  const [, setPassword] = useState("password");
  const [, setNewPassword] = useState("");
  const { mobile } = user;

  const changeName = async () => {
    await axios.post("/change-name", {
      name: name,
    });
  };

  return (
    <div className="account__container">
      <div className="account__containerSub">
        <p className="account__containerSubLeft">Name</p>
        <div className="account__containerSubRight">
          {editName === false ? (
            <button className="account__containerSubRightIcon">
              <EditIcon
                onClick={() => {
                  setEditName(true);
                }}
              />
              {name}
            </button>
          ) : (
            <div>
              {/* <form> */}
              <input
                className="account__containerSubRightInput cred__input"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <button
                className="account__containerSubRightButton"
                // type="submit"
                onClick={() => {
                  changeName();
                  setEditName(false);
                }}
              >
                Save
              </button>
              {/* </form> */}
            </div>
          )}
        </div>
      </div>
      <div className="account__containerSub">
        <p className="account__containerSubLeft">Email</p>
        <p className="account__containerSubRight">
          <button className="account__containerSubRightIcon"></button>
          {email}
        </p>
      </div>
      <div
        className={
          editPassword === true
            ? "account__containerSub account__containerSubPassword"
            : "account__containerSub"
        }
      >
        <p className="account__containerSubLeft">Password</p>
        <div
          className={
            editPassword === true
              ? "account__containerSubRight account__containerSubRightPassword"
              : "account__containerSubRight"
          }
        >
          {editPassword === false ? (
            <button className="account__containerSubRightIcon">
              <EditIcon
                onClick={(e) => {
                  setEditPassword(true);
                }}
              />
              ********
            </button>
          ) : (
            <form>
              <div>
                Enter current password
                <br />
                <input
                  className="account__containerSubRightInput cred__input"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <br />
                Enter new password
                <br />
                <input
                  className="account__containerSubRightInput cred__input"
                  type="password"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
                <button
                  className="account__containerSubRightButton"
                  type="submit"
                  // onClick={() => reauthenticate(password)}
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="account__containerSub">
        <p className="account__containerSubLeft">Mobile Number</p>
        <div className="account__containerSubRight">
          <p>{mobile}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
