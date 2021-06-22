import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { parseCookies } from "nookies";

import "./Login.css";
import axios from "../../axios";
import ButtonLink from "../../components/ButtonLink/ButtonLink";
import ErrorText from "../../components/ErrorText/ErrorText";
import Heading from "../../components/Heading/Heading";
import TextInput from "../../components/Input/TextInput/TextInput";
import { useStateValue } from "../../Context/StateProvider";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [, dispatch] = useStateValue();

  const login = async (event) => {
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
  };

  return (
    <div className="login">
      <form className="login__container">
        {/* <p>Sign In</p> */}
        <Heading text={"Sign In"} />

        <TextInput
          type={"email"}
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <div className="login__password">
          <TextInput
            type={"password"}
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <Link to="/forgotpassword" className="login__containerLink">
            <p className="login__forgotPassword">Forgot password?</p>
          </Link>
        </div>

        {error && <ErrorText error={error} />}

        <ButtonLink
          type="submit"
          onClick={login}
          path="/setpaper"
          placeholder="Sign In"
        />

        <div className="login__conatinerNewUser">
          <Link to="/signup" className="login__containerLink">
            <p className="login__containerNewUserP">
              New user?&ensp;Create new account
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
