import React, { useState } from "react";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  function resetPassword() {}

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
          <React.Fragment></React.Fragment>
        )}
        <div>
          <input
            id="email"
            className="cred__input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="btn__link">
          <button onClick={resetPassword} type="submit">
            Reset Password
          </button>
        </div>
        <Link to="/signin" className="forgotPassword__containerSignin">
          <p>Return to Sign In</p>
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
