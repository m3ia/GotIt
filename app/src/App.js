import * as React from "react";
import { Fragment } from "react";

import ListItems from "./ListItems";
// import * as apiClient from "./apiClient";

const App = () => {
  return (
    <Fragment>
      <div className="container">
        <ListItems />
      </div>
    </Fragment>
  );
};

export default App;
