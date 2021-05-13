import React, { useState, useEffect } from "react";

import addDays from "date-fns/addDays";
import addMinutes from "date-fns/addMinutes";
import addMonths from "date-fns/addMonths";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import differenceInCalendarMonths from "date-fns/differenceInCalendarMonths";
import differenceInMinutes from "date-fns/differenceInMinutes";

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

  // to instantly hide item after checkbox is checked
  const updateItem = (itemToUpdate) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemToUpdate.id) {
        return { ...itemToUpdate };
      } else {
        return item;
      }
    });
    const newUpdItems = updatedItems.filter((item) => !item.is_done);
    setItems(newUpdItems);
  };

  // delete item function
  function deleteItem(id) {
    apiClient.deleteItem(id);
    // automatically update item view
    const filterOut = items.filter((item) => item.id !== id);
    setItems(filterOut);
  }

  const onAdd = (item) => setItems([...items, item]);

  const editItem = (item, updatedItem) => {
    apiClient.editItem({ ...item, ...updatedItem });
    // window.location = "/"; // ensures you don't have to refresh again
  };

  // create a checkRecurring functional component to call in ListItems
  const CheckRecurring = (items) => {
    // WORKS: loops through each item
    for (let i = 0; i < items.length; i++) {
      let itemRecurEndDate = new Date(items[i].recur_end_date);
      // WORKS: upon opening, the list checks for items with an end date.
      let today = new Date();
      // WORKS: if item has an end date, then check if current date is >= end date.
      if (itemRecurEndDate && itemRecurEndDate <= today) {
        // WORKS: if the so, then delete the item.
        deleteItem(items[i].id);
      } else {
        // WORKS: if not, then if item.recur_freq === q2min/daily/weekly/monthly && checkbox...
        if (items[i].recur_freq?.trim() === "daily") {
          let newStartDate = new Date(items[i].recur_start_date);
          if (differenceInCalendarDays(today, newStartDate) >= 1) {
            while (addDays(newStartDate, 1) < today) {
              newStartDate = addDays(newStartDate, 1);
            }
            console.log("something should have returned! days");
            //changes start date in db --> sets checkBox(true) to be unfiltered
            editItem({
              ...items[i],
              is_done: false,
              recur_start_date: newStartDate,
            });
          }
        } else if (items[i].recur_freq?.trim() === "weekly") {
          let newStartDate = new Date(items[i].recur_start_date);
          if (differenceInCalendarDays(today, newStartDate) >= 7) {
            while (addDays(newStartDate, 7) < today) {
              newStartDate = addDays(newStartDate, 7);
            }
            console.log("something should have returned! weeks");
            //changes start date in db --> sets checkBox(true) to be unfiltered
            editItem({
              ...items[i],
              is_done: false,
              recur_start_date: newStartDate,
            });
          }
        } else if (items[i].recur_freq?.trim() === "monthly") {
          let newStartDate = new Date(items[i].recur_start_date);
          if (differenceInCalendarMonths(today, newStartDate) >= 1) {
            while (addMonths(newStartDate, 1) < today) {
              newStartDate = addDays(newStartDate, 1);
            }
            //changes start date in db --> sets checkBox(true) to be unfiltered
            editItem({
              ...items[i],
              is_done: false,
              recur_start_date: newStartDate,
            });
          }
        } //WORKS:
        else if (items[i].recur_freq?.trim() === "every-2-min") {
          let newStartDate = new Date(items[i].recur_start_date);
          //WORKS:
          if (differenceInMinutes(today, newStartDate) >= 2) {
            while (addMinutes(newStartDate, 2) < today) {
              newStartDate = addMinutes(newStartDate, 1);
            }
            console.log("something should have returned! minutes");
            //changes start date in db --> sets checkBox(true) to be unfiltered
            //WORKS:
            editItem({
              ...items[i],
              is_done: false,
              recur_start_date: newStartDate,
            });
          }
        }
      }
    }
  };

  CheckRecurring(items);
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
                updateItem={updateItem}
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
