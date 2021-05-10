import React, { useState, useEffect } from "react";

import AddItem from "./AddItemForm";
import ItemRow from "./ItemRow";
import * as apiClient from "./apiClient";
import icon from "./checklist-icon.png";

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

  // add check-for-recurring function here.
  // delete item function
  async function deleteItem(id) {
    apiClient.deleteItem(id);
    console.log(items, id);
    // automatically update item view
    const filterOut = items.filter((item) => item.id !== id);
    setItems(filterOut);
    console.log(filterOut);
  }

  const onAdd = (item) => setItems([...items, item]);

  return (
    <>
      <div className="body">
        <img src={icon} className="app-icon" alt="checklist icon" />
        <h1>Got It!</h1>
        <h2>Main List</h2>
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
              <ItemRow
                item={item}
                deleteItem={deleteItem}
                key={item.id}
                getItems={getItems}
              />
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
