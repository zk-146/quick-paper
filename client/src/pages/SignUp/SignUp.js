import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { parseCookies } from "nookies";
import validator from "validator";

import "./SignUp.css";
import axios from "../../axios";
import ButtonLink from "../../components/ButtonLink/ButtonLink";
import ErrorText from "../../components/ErrorText/ErrorText";
import Heading from "../../components/Heading/Heading";
import TextInput from "../../components/Input/TextInput/TextInput";
import { useStateValue } from "../../Context/StateProvider";

const SignUp = () => {
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
      <form className="signUp__container">
        <Heading text={"Sign Up"} />
        <TextInput
          type={"text"}
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextInput
          type={"email"}
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextInput
          type={"password"}
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <TextInput
          type={"phone"}
          placeholder="Mobile No."
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />

        {error && <ErrorText error={error} />}

        <ButtonLink
          type="submit"
          onClick={register}
          path="/setpaper"
          placeholder="Sign Up"
        />

        <div className="signUp__containerNewUser">
          <Link to="/signin" className="signUp__containerLink">
            <p className="signUp__containerNewUserP">Already a user? Sign In</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
