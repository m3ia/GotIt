import * as React from "react";
import { useState, useEffect } from "react";

import gcal from "./ApiCalendar";
import App from "./App";
import * as apiClient from "./apiClient";
import logo from "./got-it-logo1.png";

const LoginPage = () => {
  const [userId, setUserId] = useState(0);
  const [signInEmail, setSignInEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(gcal.sign);

  // GCal Sign In
  const Login = ({ isAuthenticated }) =>
    isAuthenticated ? (
      <button onClick={gcal.handleSignoutClick} className="btn btn-primary">
        Log out
      </button>
    ) : (
      <>
        <h5>Log in via Gmail</h5>
        <button onClick={gcal.handleAuthClick} className="btn btn-primary">
          Log In
        </button>
      </>
    );

  useEffect(() => {
    gcal.onLoad(() => {
      try {
        setIsAuthenticated(gcal.gapi.auth2.getAuthInstance().isSignedIn.get());
        gcal.listenSign((sign) => setIsAuthenticated(sign));
      } catch {
        setIsAuthenticated(gcal.sign);
      }
    });
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <App />
      ) : (
        <div className="sign-in-wrapper">
          <div className="sign-in-box container">
            <Login />{" "}
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
