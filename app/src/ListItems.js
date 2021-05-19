import React, { useCallback, useState, useEffect } from "react";

import addDays from "date-fns/addDays";
import addMonths from "date-fns/addMonths";
import differenceInDays from "date-fns/differenceInDays";
import differenceInMonths from "date-fns/differenceInMonths";

import AddItem from "./AddItemForm";
import ItemRow from "./ItemRow";
import * as apiClient from "./apiClient";
import icon from "./checklist-icon.png";

// const CurrentDate = () => {
//   const dateVar = new Date();
//   const [currTime, setCurrTime] = useState(dateVar);

//   const returnTime = () => {
//     setCurrTime(dateVar.toLocaleTimeString());
//   };

//   setInterval(() => {
//     returnTime();
//   }, 1000);

//   return currTime;
// };

// This is view for one list.
const ListItems = () => {
  const [allItems, setItems] = useState([]);
  const items = allItems.filter((item) => !item.is_done);
  const completedItems = allItems.filter((item) => item.is_done);

  async function getItems() {
    const itemsArray = await apiClient.getItems();
    setItems(itemsArray);
  }

  // to instantly hide item after checkbox is checked
  const updateItem = useCallback(
    (itemToUpdate) => {
      const updatedItems = allItems.map((item) => {
        if (item.id === itemToUpdate.id) {
          return { ...itemToUpdate };
        } else {
          return item;
        }
      });
      console.log("===We're about to update item", itemToUpdate);
      setItems(updatedItems);
    },
    [allItems],
  );

  useEffect(() => {
    getItems();
  }, []);

  // delete item function
  const deleteItem = useCallback(
    (id) => {
      apiClient.deleteItem(id);
      // automatically update item view
      const filterOut = allItems.filter((item) => item.id !== id);
      setItems(filterOut);
    },
    [allItems],
  );

  const onAdd = (item) => setItems([...allItems, item]);

  const editItem = useCallback(
    (updatedItem) => {
      apiClient.editItem(updatedItem);
      updateItem(updatedItem);
      // window.location = "/"; // ensures you don't have to refresh again
    },
    [updateItem],
  );

  // create a checkRecurring functional component to call in ListItems
  const CheckRecurring = useCallback(
    (items) => {
      // WORKS: loops through each item
      for (let i = 0; i < items.length; i++) {
        // handle every 5 seconds
        if (items[i].recur_freq?.trim() === "Every-5-sec") {
          //WORKS:
          console.log("Time to seriously edit");
          console.log("something should have returned! seconds");
          //changes start date in db --> sets checkBox(true) to be unfiltered
          //WORKS:
          editItem({
            ...items[i],
            is_done: false,
          });
        }
        let itemRecurEndDate =
          items[i].recur_end_date && new Date(items[i].recur_end_date);
        // WORKS: upon opening, the list checks for items with an end date.
        let today = new Date();
        // WORKS: if item has an end date, then check if current date is >= end date.
        if (itemRecurEndDate && itemRecurEndDate <= today) {
          // WORKS: if the so, then delete the item.
          deleteItem(items[i].id);
        } else {
          // WORKS: if not, then if item.recur_freq === q2min/daily/weekly/ nthly && checkbox...
          if (items[i].recur_freq?.trim() === "Daily") {
            let newStartDate = new Date(items[i].recur_start_date);
            console.log({
              today,
              newStartDate,
              diff: differenceInDays(today, newStartDate),
            });
            if (differenceInDays(today, newStartDate) >= 1) {
              while (addDays(newStartDate, 1) < today) {
                newStartDate = addDays(newStartDate, 1);
              }
              console.log("something should have returned! days", newStartDate);
              //changes start date in db --> sets checkBox(true) to be unfiltered
              editItem({
                ...items[i],
                is_done: false,
                recur_start_date: newStartDate,
              });
            }
          } else if (items[i].recur_freq?.trim() === "Weekly") {
            let newStartDate = new Date(items[i].recur_start_date);
            if (differenceInDays(today, newStartDate) >= 7) {
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
          } else if (items[i].recur_freq?.trim() === "Monthly") {
            let newStartDate = new Date(items[i].recur_start_date);
            if (differenceInMonths(today, newStartDate) >= 1) {
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
          }
        }
      }
    },
    [deleteItem, editItem],
  );
  useEffect(() => {
    const checkRecurringInternal = setInterval(() => {
      CheckRecurring(completedItems);
    }, 5000);

    return () => {
      clearInterval(checkRecurringInternal);
    };
  }, [completedItems, CheckRecurring]);

  return (
    <>
      <div className="body" data-testid="test-1">
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
            {items
              // .filter((item) => !item.is_done)
              .map((item) => (
                <ItemRow
                  item={item}
                  deleteItem={deleteItem}
                  key={item.id}
                  getItems={getItems}
                  updateItem={editItem}
                />
              ))}
          </tbody>
        </table>
        <br />
        <h3>Completed Items</h3>
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
            {completedItems
              // .filter((item) => !item.is_done)
              .map((item) => (
                <ItemRow
                  item={item}
                  deleteItem={deleteItem}
                  key={item.id}
                  getItems={getItems}
                  updateItem={editItem}
                />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListItems;
