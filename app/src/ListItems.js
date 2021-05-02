import React, { Fragment, useEffect, useState } from "react";

import EditItem from "./EditItem";

// This is view for one list.
const ListItems = () => {
  const [items, setItems] = useState([]);

  // delete item function
  async function deleteItem(id) {
    try {
      await fetch(`http://localhost:5000/items/${id}`, {
        method: "DELETE",
      });

      // automatically update item view
      setItems(items.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getItems() {
    const res = await fetch("http://localhost:5000/items");

    const itemsArray = await res.json();

    setItems(itemsArray);
  }
  useEffect(() => {
    getItems();
  }, []);

  console.log(items);
  return (
    <Fragment>
      {" "}
      <table class="table table-hover mt-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
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
              <td>{item.description}</td>
              <td>
                <EditItem item={item} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListItems;
