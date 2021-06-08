import axios from "../axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import { parseCookies } from "nookies";
import { useStateValue } from "../Context/StateProvider";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [, dispatch] = useStateValue();

  async function login(event) {
    event.preventDefault();
    try {
      const res = await axios.post("/login", {
        email,
        password,
      });
      if (res.error) {
        console.log(res);
      } else {
        const cookie1 = parseCookies();
        const user = cookie1.user ? JSON.parse(cookie1.user) : "";
        const isAuth = cookie1.isAuth ? JSON.parse(cookie1.isAuth) : "";
        dispatch({
          type: "SET_USER",
          user: user,
          isAuth: isAuth,
        });
        history.push("/");
      }
    } catch (err) {
      console.log(err.response.data.error);
      setError(err.response.data.error);
    }
  }
  // khanzaid1015@gmail.com

  return (
    <div className="login">
      <div className="login__container">
        <p>Sign In</p>
        <form>
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

          <div className="login__password">
            <input
              id="password"
              className="cred__input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
            />

            <Link to="/forgotpassword" className="login__containerLink">
              <p className="login__forgotPassword">Forgot password?</p>
            </Link>
          </div>
          {error && <p className="input__error">{error}</p>}
          <div className="btn">
            <Link to="/setpaper" className="btn__link">
              <button onClick={login} type="submit">
                Sign In
              </button>
            </Link>
          </div>
        </form>

        <div className="login__conatinerNewUser">
          <Link to="/signup" className="login__containerLink">
            <p className="login__containerNewUserP">
              New user?&ensp;Create new account
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
