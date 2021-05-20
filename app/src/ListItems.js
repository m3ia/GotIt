import React, { useCallback, useState, useEffect } from "react";

import AddItem from "./AddItemForm";
import gcal from "./ApiCalendar";
import ItemRow from "./ItemRow";
import * as apiClient from "./apiClient";
<<<<<<< HEAD

// GCal Sign In
const Login = ({ isAuthenticated }) =>
  isAuthenticated ? (
    <button onClick={gcal.handleSignoutClick}>Log out</button>
  ) : (
    <button onClick={gcal.handleAuthClick}>Google Cal Log in</button>
  );

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
=======
>>>>>>> 9589895b1867ee5b75e67513597e47ac421895af

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
      const today = new Date();
      // WORKS: loops through each item
      items.forEach((item) => {
        const itemRecurEndDate =
          item.recur_end_date && new Date(item.recur_end_date);
        if (itemRecurEndDate && itemRecurEndDate <= today) {
          // WORKS: if the so, then delete the item.
          deleteItem(item.id);
        } else if (today >= item.recur_start_date) {
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
      <div data-testid="test-1">
        <div className="items-table container-fluid">
          <button className="btn btn-secondary float-right" onClick={back}>
            Back To All Lists
          </button>
          <h2>{list.name}</h2>
          <br />
          <AddItem addNewItem={addNewItem} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              maxWidth: "75%",
              alignItems: "center",
            }}
          >
            <table
              className="table table-hover mt-5"
              style={{ maxWidth: "75%" }}
            >
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
            <button
              className="show-completed-toggle btn-primary"
              onClick={() => setShowCompletedItems(!showCompletedItems)}
            >
              {showCompletedItems
                ? "Hide Completed Items"
                : "Show Completed Items"}
            </button>
            {showCompletedItems && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  maxWidth: "75%",
                  alignItems: "center",
                }}
              >
                <h3>Completed Items</h3>
                <table
                  className="table table-hover mt-5"
                  style={{ maxWidth: "75%" }}
                >
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
              </div>
            )}
          </div>
          <Login {...{ isAuthenticated }} />
          {isAuthenticated ? <Events /> : "Couldn't sign in."}
        </div>
      </div>
      <div className="my-calendar">
        <Events />
      </div>
    </>
  );
};

export default ListItems;
