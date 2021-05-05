import React, { Fragment, useEffect, useState } from "react";

import EditItem from "./EditItem";
import * as apiClient from "./apiClient";

// This is view for one list.
const ListItems = () => {
  const [items, setItems] = useState([]);

  // const loadItems = async () => setItems(await apiClient.getItems());

  // useEffect(() => {
  //   loadItems();
  // }, []);
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

  return (
    <>
      {" "}
      <table className="table table-hover mt-5">
        <thead>
          <tr>
            <th>Complete</th>
            <th>Description</th>
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
            <tr key={item.id}>
              <td>Checkbox</td>
              <EditItem item={item} />
              <td>Recurring Option</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                  {/* Delete icon. Removed since emojis are not ARIA - compliant. Tested and works.*/}
                  {/* <span
                  role="img"
                  id={`id${item.id}`}
                  aria-label="Delete item button"
                  onClick={() => {
                    deleteItem(item.id);
                  }}
                  onKeyPress={() => {
                    deleteItem(item.id);
                  }}
                  aria-hidden="true"
                >
                  &#10060;
                </span> */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      Add Item Bar goes here
      <br />
      Completed Dropdown goes here
    </>
  );
};

export default ListItems;
