import * as React from "react";
import { useState, useEffect } from "react";

import gcal from "./ApiCalendar";
import App from "./App";
import * as apiClient from "./apiClient";
import logo from "./got-it-logo1.png";

const LoginPage = () => {
  const [userId, setUserId] = useState(0);
  const [signInEmail, setSignInEmail] = useState("");
  <input>email address</input>;
  return (
    <>
      <div className="sign-in-box container">
        <h5>Sign In</h5>
        <input
          type="text"
          value={signInEmail}
          onChange={(e) => setSignInEmail(e.target.value)}
        />
        {userId && <App userId={userId} />}
      </div>
      <div className="log-in-box container">
        <h5>Log in</h5>

        {/* TODO create dummy unclickable sign-in button */}
      </div>
      {userId && <App userId={userId} />}
    </>
  );
};

export default LoginPage;
