import React, { useCallback, useState, useEffect } from "react";

import { lightFormat } from "date-fns";

import AddItem from "./AddItemForm";
import gcal from "./ApiCalendar";
import ItemRow from "./ItemRow";
import * as apiClient from "./apiClient";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    gcal
      .listUpcomingEvents(7)
      .then(({ result: { items } }) => setEvents(items));
  }, []);

  return events.length === 0 ? null : (
    <table className="gcal-table table-bordered">
      <thead>
        <tr>
          <th scope="col">Event</th>
          <th scope="col">Date</th>
          {/* <th scope="col">End Date</th> */}
        </tr>
      </thead>
      <tbody>
        {events.map((event) => {
          const eventStartDate =
            event.start.date ||
            lightFormat(new Date(event.start.dateTime), "yyyy-MM-dd");
          return (
            <tr key={event.id}>
              {/* <th scope="row"></th> */}
              <td>{event.summary}</td>
              <td>{eventStartDate}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const AddListToGCal = ({ list }) => {
  const currURL = window.location.href;
  const [events, setEvents] = useState([]);

  const addListToGCal = async () => {
    await gcal.createEvent({
      summary: `${list.name}`,
      start: {
        date: list.due_date,
      },
      end: {
        date: list.due_date,
      },
      source: {
        url: `${currURL}`,
      },
      description: `${currURL}`,
    });
  };

  return (
    <>
      <button
        className="btn btn-warning add-list-to-gcal-button"
        onClick={addListToGCal}
      >
        Add List to Google Calendar
      </button>
      <div className="my-calendar">
        <br />
        <h6>Upcoming Events on My Google Calendar: </h6>
        <Events />
      </div>
    </>
  );
};

// This is view for one list.
const ListItems = ({ listId, back }) => {
  const [list, setList] = useState(null);
  const [allItems, setItems] = useState([]);
  const [showCompletedItems, setShowCompletedItems] = useState(false);
  const items = allItems.filter((item) => !item.is_done);
  const completedItems = allItems.filter((item) => item.is_done);
  // gcal
  const [isAuthenticated, setIsAuthenticated] = useState(gcal.sign);

  async function getItems(listId) {
    const list = await apiClient.getList(listId);
    const itemsArray = await apiClient.getItems(listId);
    setItems(itemsArray);
    setList(list);
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
  if (!list) {
    return null;
  }
  return (
    <>
      {/* Open for test */}
      <div data-testid="test-1">
        {/* Open for Active Items Container */}
        <div className="items-container">
          {/* Open for item title */}
          <div className="list-items-header">
            <div className="list-items-title">
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
            <button
              className="btn btn-secondary float-right back-button"
              onClick={back}
            >
              Back To All Lists
            </button>
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
          className="show-completed-toggle btn btn-primary"
          onClick={() => setShowCompletedItems(!showCompletedItems)}
        >
          {showCompletedItems ? "Hide Completed Items" : "Show Completed Items"}
        </button>

        {showCompletedItems && (
          // Open for Completed Items container
          <div
            className="completed-items-container"
            // style={{
            //   display: "flex",
            //   flexDirection: "column",
            //   justifyContent: "center",
            //   maxWidth: "75%",
            //   alignItems: "center",
            // }}
          >
            <h3>Completed Items</h3>
            {/* Open for completed item row */}
            <div className="items-row-container">
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

        {
          isAuthenticated && list.due_date ? (
            // Open for GCal
            <div className="add-list-to-gcal">
              <AddListToGCal list={list} />
            </div>
          ) : null
          // Close for GCal
        }
      </div>
      {/*Closure for test*/}
    </>
  );
};

export default ListItems;
