import React, { useCallback, useState, useEffect } from "react";

import addDays from "date-fns/addDays";
import addMonths from "date-fns/addMonths";
import differenceInDays from "date-fns/differenceInDays";
import differenceInMonths from "date-fns/differenceInMonths";

import AddItem from "./AddItemForm";
import gcal from "./ApiCalendar";
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
const ListItems = ({ listId, back, list }) => {
  const [allItems, setItems] = useState([]);
  const items = allItems.filter((item) => !item.is_done);
  const completedItems = allItems.filter((item) => item.is_done);
  // gcal
  const [isAuthenticated, setIsAuthenticated] = useState(gcal.sign);

  async function getItems(listId) {
    const itemsArray = await apiClient.getItems(listId);
    setItems(itemsArray);
  }

  const addNewItem = async (name) => {
    const response = await apiClient.addItem(name, listId);
    onAdd(response[0]);
  };

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
    getItems(listId);
  }, [listId]);

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
        if (items[i].recur_freq?.trim() === "DEMO: Every-5-sec") {
          //WORKS:
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
          // WORKS: if not, then if item.recur_freq === q2min/daily/weekly/monthly && checkbox...
          if (items[i].recur_freq?.trim() === "Daily") {
            let newStartDate = new Date(items[i].recur_start_date);
            if (differenceInDays(today, newStartDate) >= 1) {
              while (addDays(newStartDate, 1) < today) {
                newStartDate = addDays(newStartDate, 1);
              }
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

  useEffect(() => {
    gcal.onLoad(() => {
      setIsAuthenticated(gcal.gapi.auth2.getAuthInstance().isSignedIn.get());
      gcal.listenSign((sign) => setIsAuthenticated(sign));
    });
  }, []);

  return (
    <>
      <div data-testid="test-1">
        <div className="items-table container-fluid">
          <button className="btn btn-secondary float-right" onClick={back}>
            Back To All Lists
          </button>
          <h2>{list.name}</h2>
          <br />
          <AddItem addNewItem={addNewItem} />
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
          <Login {...{ isAuthenticated }} />
          {isAuthenticated ? <Events /> : null}
        </div>
      </div>
    </>
  );
};

// GCal Sign In
const Login = ({ isAuthenticated }) =>
  isAuthenticated ? (
    <button onClick={gcal.handleSignoutClick}>Log out</button>
  ) : (
    <button onClick={gcal.handleAuthClick}>Google Cal Log in</button>
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

export default ListItems;
