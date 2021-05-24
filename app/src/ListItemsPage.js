import React, { useState, useEffect } from "react";

import App from "./App";
import * as apiClient from "./apiClient";

const ListItemsPage = ({ match }) => {
  console.log(match.params.listId);
  const [items, setItems] = useState([]);
  async function getList(listId, userId) {
    const itemsArray = await apiClient.getItems(listId, userId);
    setItems(itemsArray);
  }

  useEffect(() => {
    getLists(listId, userId);
  }, [listId, userId]);

  return <App page="listItems" />;
};
