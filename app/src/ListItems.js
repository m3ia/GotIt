import React, { useState, useEffect } from "react";

import AddItem from "./AddItemForm";
import ItemRow from "./ItemRow";
import * as apiClient from "./apiClient";

// This is view for one list.
const ListItems = () => {
  const [items, setItems] = useState([]);

  async function getItems() {
    const itemsArray = await apiClient.getItems();

    setItems(itemsArray);
  }
  useEffect(() => {
    getItems();
  }, []);

  // delete item function
  async function deleteItem(id) {
    apiClient.deleteItem(id);

    // automatically update item view
    setItems(items.filter((item) => item.id !== id));
  }

  const onAdd = (item) => setItems([...items, item]);

  return (
    <>
      <div className="body">
        <h1>Main List</h1>
        <br />
        <AddItem onAdd={onAdd} />
        <table className="table table-hover mt-5">
          <thead>
            <tr className="header-row">
              <th>Complete</th>
              <th>Item</th>
              <th>Edit</th>
              <th>Frequency</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* 
              <tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
              </tr>
  */}
            {items.map((item) => (
              <ItemRow item={item} deleteItem={deleteItem} />
            ))}
          </tbody>
        </table>
        <br />
        Completed Dropdown goes here
      </div>
    </>
  );
};

export default ListItems;
