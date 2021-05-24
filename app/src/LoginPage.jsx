import * as React from "react";
import { useState, useEffect } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import gcal from "./ApiCalendar";
import App from "./App";
import logo from "./got-it-logo1.png";

const AppRootComponent = ({ user }) => (
  <BrowserRouter>
    <Switch>
      <Route path="/lists/:listId">
        <App page="listItems" user={user} />
      </Route>
      <Route path="/">
        <App page="home" user={user} />
      </Route>
    </Switch>
  </BrowserRouter>
);

const LoginPage = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleGoogleAuth = async (isSignedIn) => {
    if (!isSignedIn) {
      setIsAuthenticated(false);
      setUser(null);
      return;
    }
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
    setUser(user);
    setIsAuthenticated(true);
  };

  // GCal Sign In
  const Login = ({ isAuthenticated }) =>
    isAuthenticated ? (
      <button
        onClick={gcal.handleSignoutClick}
        className="btn btn-outline-dark"
      >
        Log out
      </button>
    ) : (
      <>
        <h5>Log in via Gmail</h5>
        <button
          onClick={gcal.handleAuthClick}
          className="btn btn-outline-light"
        >
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

  return (
    <>
      {isAuthenticated ? (
        <AppRootComponent user={user} />
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

export default LoginPage;
