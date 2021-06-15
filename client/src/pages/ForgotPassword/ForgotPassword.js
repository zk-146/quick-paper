import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./ForgotPassword.css";
import ButtonLink from "../../components/ButtonLink/ButtonLink";
import TextInput from "../../components/Input/TextInput/TextInput";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const resetPassword = () => {};

  return (
    <div className="forgotPassword">
      <div className="forgotPassword__container">
        <div className="forgotPassword__containerHeader">
          <p>Forgot Your Password?</p>
        </div>
        <p>
          Enter the email address that you used to sign-up. We'll send you an
          email with a link to reset your password.
        </p>
        {emailSent ? (
          <div className="forgotPassword__containerEmailSent">
            <p>
              Password Reset link has been sent to your Email Account. Please
              check your email.
            </p>
          </div>
        ) : (
          <></>
        )}
        <TextInput
          type={"email"}
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <ButtonLink
          type="submit"
          onClick={resetPassword}
          path=""
          placeholder="Reset Password"
        />

        <Link to="/signin" className="forgotPassword__containerSignin">
          <p>Return to Sign In</p>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
