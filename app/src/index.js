import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from "./App";
import ListItems from "./ListItems";
import LoginPage from "./LoginPage.jsx";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/home">
          <App page="home" />
        </Route>
        <Route path="/lists/:listId" component={ListItems}>
          <App page="listItems" />
        </Route>
      </Switch>
    </BrowserRouter>
    ,
  </React.StrictMode>,
  document.getElementById("root"),
);

// const Page1 = () => (
//   <div>
//     hello i'm page 1. <Link to={"/page2/3"}>To Page 2!</Link>
//   </div>
// );
// const Page2 = ({ match }) => (
//   <div>hello i'm page 2. {match.params.listId} </div>
// );

// ReactDOM.render(
//   <BrowserRouter>
//     <Switch>
//       <Route exact path="/" component={Page1} />
//       <Route path="/page2/:listId" component={Page2} />
//     </Switch>
//   </BrowserRouter>,
//   document.getElementById("root"),
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
