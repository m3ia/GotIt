import * as React from "react";
import { useState, useEffect } from "react";

import gcal from "./ApiCalendar";
import App from "./App";
import * as apiClient from "./apiClient";
import logo from "./got-it-logo1.png";

const LoginPage = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleGoogleAuth = async (isSignedIn) => {
    console.log("Are we here?", isSignedIn);
    if (!isSignedIn) {
      setIsAuthenticated(false);
      setUser(null);
      return;
    }
    console.log("About to send to backend", gcal.getIdToken());
    const response = await fetch("/api/v1/auth/google", {
      method: "POST",
      body: JSON.stringify({
        token: gcal.getIdToken(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const user = await response.json();
    console.log("WE MADE IT!", { user });
    setUser(user);
    setIsAuthenticated(true);
  };

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
        handleGoogleAuth(gcal.gapi.auth2.getAuthInstance().isSignedIn.get());
        gcal.listenSign(handleGoogleAuth);
      } catch {
        setIsAuthenticated(false);
      }
    });
  }, []);

  console.log("this is user", user);
  return (
    <>
      {isAuthenticated ? (
        <App user={user} />
      ) : (
        <div className="sign-in-wrapper">
          <div className="sign-in-box container">
            <Login />
            <img src={logo} className="logo" alt="Got It Logo" width="15%" />
          </div>
        </div>
      )}
    </>
  );
};

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log("Name: " + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
}

export default LoginPage;
