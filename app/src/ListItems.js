import React, { useCallback, useState, useEffect } from "react";

import AddItem from "./AddItemForm";
import gcal from "./ApiCalendar";
import ItemRow from "./ItemRow";
import * as apiClient from "./apiClient";

// TODO: remove once this works on log-in
// // GCal Sign In
// const Login = ({ isAuthenticated }) =>
//   isAuthenticated ? (
//     <button onClick={gcal.handleSignoutClick}>Log out</button>
//   ) : (
//     <button onClick={gcal.handleAuthClick}>Google Cal Log in</button>
//   );

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
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

// This is view for one list.
const ListItems = ({ listId, back, list }) => {
  const [allItems, setItems] = useState([]);
  const [showCompletedItems, setShowCompletedItems] = useState(false);
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
    },
    [updateItem],
  );

  // create a checkRecurring functional component to call in ListItems
  const CheckRecurring = useCallback(
    (items) => {
      const today = new Date();
      // TESTED: loops through each item
      items.forEach((item) => {
        const itemRecurEndDate =
          item.recur_end_date && new Date(item.recur_end_date);
        if (itemRecurEndDate && itemRecurEndDate <= today) {
          // TESTED: if the so, then delete the item.
          deleteItem(item.id);
        } else if (item.recur_start_date && today >= item.recur_start_date) {
          editItem({
            ...item,
            is_done: false,
          });
        }
      });
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
      try {
        setIsAuthenticated(gcal.gapi.auth2.getAuthInstance().isSignedIn.get());
        gcal.listenSign((sign) => setIsAuthenticated(sign));
      } catch {
        setIsAuthenticated(gcal.sign);
      }
    });
  }, []);

  return (
    <>
      {/* Open for test */}
      <div data-testid="test-1">
        {/* Open for Active Items Container */}
        <div className="items-container">
          <button
            className="btn btn-secondary float-right back-button"
            onClick={back}
          >
            Back To All Lists
          </button>
          {/* Open for item title */}
          <div className="list-items-item-title">
            <br />
            <h2>
              {list.name}
              {list.due_date ? (
                <>
                  <br />
                  {/* Open for due date */}
                  <div className="due-date-title">
                    <h6>Due: {list.due_date}</h6>
                  </div>
                  {/* Close for due date */}
                </>
              ) : null}
            </h2>
          </div>
          {/* Close for item title */}
          {/* Open for section to add item */}
          <div className="add-item-section">
            <AddItem addNewItem={addNewItem} />
          </div>
          {/* Close for section to add item */}
          {/* Open for active item row */}
          <div className="item-row-container">
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
            <br />
          </div>
          {/* Close for active item row */}
        </div>
        {/* Closure for active items container */}
        <button
          className="show-completed-toggle btn-primary"
          onClick={() => setShowCompletedItems(!showCompletedItems)}
        >
          {showCompletedItems ? "Hide Completed Items" : "Show Completed Items"}
        </button>

        {showCompletedItems && (
          // Open for Completed Items container
          <div
            className="completed-items-container"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              maxWidth: "75%",
              alignItems: "center",
            }}
          >
            <h3>Completed Items</h3>
            {/* Open for completed item row */}
            <div className="item-row">
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
            </div>
            {/* Closure for completed item row */}
          </div>
          // Close for completed items container
        )}
        {/* Open for GCal  */}
        <div className="my-calendar">
          {isAuthenticated ? (
            <>
              <br />
              <h6>My Upcoming Events on Google Calendar: </h6>
              <Events />
            </>
          ) : null}
        </div>
        {/* Close for GCal  */}
      </div>
      {/*Closure for test*/}
    </>
  );
};

export default ListItems;
