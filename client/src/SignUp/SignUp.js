import React, { useState } from "react";
import "./SignUp.css";
import { Link, useHistory } from "react-router-dom";
import axios from "../axios";
import { useStateValue } from "../Context/StateProvider";
import { parseCookies } from "nookies";
import validator from "validator";

function SignUp() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [error, setError] = useState("");

  const [, dispatch] = useStateValue();

  const register = async (event) => {
    event.preventDefault();
    if (name === "") {
      setError("Please enter your name");
      return;
    }
    if (!validator.isEmail(email)) {
      setError("Invalid Email address");
      return;
    }
    if (password.length < 6) {
      setError("Password's length should not be less than 6");
      return;
    }
    if (phone === "") {
      setError("Please enter your mobile number");
      return;
    }
    await axios
      .post(`/signup`, {
        email,
        password,
        name,
        mobile: phone,
        withCredentials: true,
      })
      .then((data) => {
        const cookies = parseCookies();
        const user = cookies.user ? JSON.parse(cookies.user) : "";
        const isAuth = cookies.isAuth ? JSON.parse(cookies.isAuth) : "";
        dispatch({
          type: "SET_USER",
          user: data,
        });
        history.push("/setpaper");
      })
      .catch((err) => {
        if (err) {
          if (err.response.data.error) {
            console.log(err.response.data);
            setError(err.response.data.error);
          }
        }
      });
  };

  return (
    <div className="signUp">
      <div className="signUp__container">
        <p>Sign Up</p>
        <form>
          <div>
            <input
              id="name"
              className="cred__input"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Name"
            />
          </div>

          <div>
            <input
              id="email"
              className="cred__input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
            />
          </div>

          <div>
            <input
              id="password"
              className="cred__input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
            />
          </div>

          <div>
            <input
              id="phone"
              className="cred__input"
              type="number"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Mobile No."
            />
          </div>

          {error && <p className="input__error">{error}</p>}
          <div className="btn">
            <Link to="/setpaper" className="btn__link">
              <button onClick={register} type="submit">
                Sign Up
              </button>
            </Link>
          </div>
        </form>
        <div className="signUp__containerNewUser">
          <Link to="/signin" className="signUp__containerLink">
            <p className="signUp__containerNewUserP">Already a user? Sign In</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
