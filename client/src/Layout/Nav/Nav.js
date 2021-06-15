import React, { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import cookies from "js-cookie";
import { FaUserAlt } from "react-icons/fa";
import { GoSignIn } from "react-icons/go";
import { GoSignOut } from "react-icons/go";
import { Link, useHistory } from "react-router-dom";
import { MdLibraryAdd } from "react-icons/md";
import { parseCookies } from "nookies";
import { RiFilePaper2Fill } from "react-icons/ri";

import "./Nav.css";
import axios from "../../axios";
import { useStateValue } from "../../Context/StateProvider";

function Nav() {
  const cookie = parseCookies();
  const user1 = cookie.user ? JSON.parse(cookie.user) : null;
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    const logoutUser = async () => {
      if (user1 && logout) {
        await axios.post("/logout").then(() => {
          dispatch({
            type: "SET_USER",
            user: null,
            isAuth: null,
          });
          cookies.remove("user");
          cookies.remove("isAuth");
          history.push("/");
        });
      }
    };
    if (logout) {
      logoutUser();
      setLogout(false);
    }
  }, [logout]);

  return (
    <nav className="nav">
      <Link to="/">
        <img className="header__logo" src="" alt="Logo" />
      </Link>

      <div className="header__nav">
        <div>
          <div className="header__option">
            <Link
              to={user === null ? "/home" : "/setpaper"}
              className="header__link"
            >
              {user === null ? (
                <span className="header__optionContents">
                  <AiFillHome />
                  Home
                </span>
              ) : (
                <span className="header__optionContents">
                  <RiFilePaper2Fill /> Set Paper
                </span>
              )}
            </Link>
          </div>
        </div>
        {user !== null && user1.role === "admin" && (
          <div>
            <div className="header__option">
              <Link to="/addQuestion" className="header__link">
                <span className="header__optionContents">
                  <MdLibraryAdd />
                  Add Questions
                </span>
              </Link>
            </div>
          </div>
        )}
        <div>
          <div className="header__option">
            <Link
              to={user === null ? "/signin" : "/account"}
              className="header__link"
            >
              {user === null ? (
                <span className="header__optionContents">
                  <GoSignIn />
                  Sign In
                </span>
              ) : (
                <span className="header__optionContents">
                  <FaUserAlt />
                  Account
                </span>
              )}
            </Link>
          </div>
        </div>

        <div>
          {user !== null ? (
            <div
              onClick={(event) => {
                event.preventDefault();
                setLogout(true);
              }}
              className="header__option header__optionAccount"
            >
              <Link to="/signin" className="header__link">
                <span className="header__optionContents">
                  <GoSignOut />
                  Sign Out
                </span>
              </Link>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
