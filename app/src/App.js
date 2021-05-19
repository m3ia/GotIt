import * as React from "react";
import { Fragment, useState, useEffect } from "react";

import gcal from "./ApiCalendar";
import ListItems from "./ListItems";
import ViewAllLists from "./ViewAllLists";
// import * as apiClient from "./apiClient";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(gcal.sign);
  const [page, setPage] = useState("home");
  const [selectedListId, setSelectedListId] = useState(null);
  const back = () => {
    setPage("home");
    setSelectedListId(null);
  };

  useEffect(() => {
    gcal.onLoad(() => {
      setIsAuthenticated(gcal.gapi.auth2.getAuthInstance().isSignedIn.get());
      gcal.listenSign((sign) => setIsAuthenticated(sign));
    });
  }, []);
  return (
    <Fragment>
      <Login {...{ isAuthenticated }} />
      {isAuthenticated ? <Events /> : null}
      <div className="container">
        {page === "home" && (
          <ViewAllLists
            selectList={(list) => {
              setPage("listItems");
              setSelectedListId(list.id);
            }}
          />
        )}
        {page === "listItems" && (
          <ListItems listId={selectedListId} back={back} />
        )}
      </div>
    </Fragment>
  );
};

const Login = ({ isAuthenticated }) =>
  isAuthenticated ? (
    <button onClick={gcal.handleSignoutClick}>Log out</button>
  ) : (
    <button onClick={gcal.handleAuthClick}>Log in</button>
  );

const Events = () => {
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    gcal
      .listUpcomingEvents(10)
      .then(({ result: { items } }) => setEvents(items));
  }, []);

  return events.length === 0 ? null : (
    <ul>
      {events.map((event) => (
        <li key={event.id}>{event.summary}</li>
      ))}
    </ul>
  );
};

export default App;
