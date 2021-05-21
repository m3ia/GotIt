import * as React from "react";
import { Fragment, useState, useEffect } from "react";

import EmailIcon from "@material-ui/icons/Email";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

import ListItems from "./ListItems";
import ViewAllLists from "./ViewAllLists";
import logo2 from "./got-it-logo1-removebg-preview.png";
import logo from "./got-it-logo1.png";
// import * as apiClient from "./apiClient";

const App = ({ userId }) => {
  const [page, setPage] = useState("home");
  const [selectedListId, setSelectedListId] = useState(null);
  const [list, setList] = useState({});
  const back = () => {
    setPage("home");
    setSelectedListId(null);
  };

  return (
    <Fragment>
      <div>
        <div className="logo">
          <img src={logo2} className="logo" alt="Got It Logo" width="75%" />
        </div>
        <div className="description">
          <p>
            Got It! is the recurring checklist for anyone who loves to prep and
            plan on the daily, weekly, or monthly basis!
            <br /> With shareable lists, Got It was made with families, friends,
            and collectives in mind.
          </p>
        </div>
      </div>
      <div className="page-container">
        <div id="content-wrap">
          {page === "home" && (
            <ViewAllLists
              selectList={(list) => {
                setPage("listItems");
                setSelectedListId(list.id);
                setList(list);
              }}
              userId={userId}
            />
          )}
          {page === "listItems" && (
            <ListItems listId={selectedListId} back={back} list={list} />
          )}
        </div>
      </div>
      {/* Footer */}
      <footer className="page-footer font-small blue pt-4">
        {/* Footer Links */}
        <div className="container-fluid text-center text-md-left">
          {/* Grid row */}
          <div className="row">
            {/* Grid column */}
            <div className="col-md-6 mt-md-0 mt-3">
              {/* Content */}
              <h5>Got It! The Recurring Checklist</h5>
              <p>
                Developed by Meia Natividad
                <br />
                as her final project for Techtonica
              </p>
            </div>
            {/* Grid column */}

            <hr className="clearfix w-100 d-md-none pb-3"></hr>

            {/* Grid column */}
            <div className="col-md-3 mb-md-0 mb-3"></div>
            {/* Grid column */}

            {/* Grid column */}
            <div className="col-md-3 mb-md-0 mb-3 social-buttons">
              {/* Links */}
              <p className="mb-0">
                <a
                  href="https://github.com/m3ia/GotIt"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitHubIcon />
                </a>
                <a
                  href="https://linkedin.com/in.meiamay"
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="mailto:meianatividad@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <EmailIcon />
                </a>
              </p>
            </div>
            {/* Grid column */}
          </div>
          {/* Grid row */}
        </div>
        {/* Copyright */}
        <div className="footer-copyright text-center py-3">
          May 2021
          <br /> Made with pride in Oakland, CA
        </div>
        {/* Copyright */}
      </footer>
      {/* Footer */}
    </Fragment>
  );
};

export default App;
