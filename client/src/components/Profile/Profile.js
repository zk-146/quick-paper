import React, { useState } from "react";
import { parseCookies } from "nookies";

import "./Profile.css";
import axios from "../../axios";
import Button from "../Button/Button";
import EditButton from "../EditButton/EditButton";
import TextInput from "../Input/TextInput/TextInput";

const Profile = () => {
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
        <p className="account__containerSubLeft">Name</p>{" "}
        <div className="account__containerSubRight">
          {editName === false ? (
            <EditButton
              onClick={() => {
                setEditName(true);
              }}
            >
              {name}
            </EditButton>
          ) : (
            <div>
              <TextInput
                type="text"
                placeholder="Name"
                size="small"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button
                onClick={() => {
                  changeName();
                  setEditName(false);
                }}
                size={"small"}
              >
                Save
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="account__containerSub">
        <p className="account__containerSubLeft">Email</p>
        <p className="account__containerSubRight">{email}</p>
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
            <EditButton onClick={() => setEditPassword(true)}>
              ********
            </EditButton>
          ) : (
            <form>
              <div>
                Enter current password
                <br />
                <TextInput
                  type="password"
                  placeholder="Current password"
                  size="small"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <br />
                Enter new password
                <br />
                <TextInput
                  type="password"
                  placeholder="New password"
                  size="small"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
                <Button
                  onClick={() => {
                    changeName();
                    setEditName(false);
                  }}
                  size={"small"}
                >
                  Save
                </Button>
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
};

export default Profile;
