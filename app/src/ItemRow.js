import React, { useState, useEffect, useRef } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import * as apiClient from "./apiClient";

const moment = require("moment");

const RecurringSettings = ({ item, editItem }) => {
  const [recurFreq, setRecurFreq] = useState(item.recur_freq);
  const [recurStartDate, setRecurStartDate] = useState("");
  const [recurStartTime, setRecurStartTime] = useState("");
  const [recurEndDate, setRecurEndDate] = useState("");
  const [recurEndTime, setRecurEndTime] = useState("");

  const [recurStartDT, setRecurStartDT] = useState(item.recur_start_date);
  const [recurEndDT, setRecurEndDT] = useState(item.recur_end_date);

  const onSaveRecur = () => {
    setRecurStartDT(recurStartDate + recurStartTime);
    setRecurEndDT(recurEndDate + recurEndTime);
    setRecurFreq(recurFreq);

    editItem({
      ...item,
      recur_freq: recurFreq,
      recur_start_date: recurStartDate,
      recur_end_date: recurEndDate,
    });
  };

  // const [selectedDate, setSelectedDate]
  console.log(item.recur_freq, recurFreq);

  return (
    <div class="container">
      <button
        type="button"
        id="recur-button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#recur-modal"
      >
        <span role="img" aria-label="Repeat">
          &#10227;
        </span>
      </button>
      <div class="modal" id="recur-modal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Recurring Item Frequency</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div class="modal-body">
              Pick your Frequency:
              <div class="dropdown">
                <select
                  name="options"
                  id="recur-freq"
                  onBlur={(e) => {
                    setRecurFreq(e.target.value);
                    console.log(e.target.value);
                  }}
                >
                  <option value="daily" selected={recurFreq === "daily"}>
                    Daily
                  </option>
                  <option value="weekly" selected={recurFreq === "weekly"}>
                    Weekly
                  </option>
                  <option value="monthly" selected={recurFreq === "monthly"}>
                    Monthly
                  </option>
                </select>
              </div>
              {/* <DatePicker selected={} onChange{} /> */}
              <div class="date-input">
                <label htmlFor="recur-start-date">
                  <b>Recurring Start Date:</b>
                </label>
                <input
                  type="date"
                  class="form-control"
                  id="recur-start-date"
                  value={recurStartDate}
                  onChange={(e) => setRecurStartDate(e.target.value)}
                ></input>
                {/* <input
                  type="time"
                  class="form-control"
                  id="recur-start-time"
                  value={recurStartTime}
                  onChange={(e) => setRecurStartTime(e.target.value)}
                ></input> */}
                <label htmlFor="recur-end-date">
                  <b>Recurring End Date:</b>
                </label>
                <input
                  type="date"
                  class="form-control"
                  id="recur-end-date"
                  value={recurEndDate}
                  onChange={(e) => setRecurEndDate(e.target.value)}
                ></input>
                {/* <input
                  type="time"
                  class="form-control"
                  id="recur-end-time"
                  value={recurEndTime}
                  onChange={(e) => setRecurEndTime(e.target.value)}
                ></input> */}
              </div>
              {/* <!-- Modal footer --> */}
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  onClick={onSaveRecur}
                >
                  Save
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Checkbox = ({ item }) => {
  const [isChecked, setIsChecked] = useState(false);

  const editItem = (updatedItem) => {
    apiClient.editItem({ ...item, ...updatedItem });
    window.location = "/"; // ensures you don't have to refresh again
  };

  const completeItem = (is_done) => {
    editItem({ is_done });
    setIsChecked(true);
    console.log(item);
  };

  return (
    <div class="form-check-inline">
      <label class="form-check-label">
        <input
          type="checkbox"
          class="form-check-input"
          id="checkbox"
          value={isChecked}
          name="{editItem.name}"
          // function to update the item in the db...filters item out from view
          onClick={() => completeItem(true)}
        />
      </label>
    </div>
  );
};

// Item Row Component
const ItemRow = ({ item, deleteItem }) => {
  const [name, setName] = useState(item.name);

  // const [name, setName] = useState(item.name);
  const [editMode, setEditMode] = useState(false);

  const editItem = (item, updatedItem) => {
    apiClient.editItem({ ...item, ...updatedItem });
    // window.location = "/"; // ensures you don't have to refresh again
  };

  //useRef for focusing into input bar
  const inputItem = useRef();

  // Clicking Edit/on the value activates editMode. User sees input and Submit button.
  const onEditClick = () => {
    setEditMode(true);
  };
  // Submit sets setEditMode(false). User sees value with submitted input item, Edit button.
  const onSaveClick = () => {
    setEditMode(false);
    editItem(item, { name });
  };
  // Want: When user clicks out => setEditMode(false) => editMode === false, a line with original value, and a view of the edit button.
  //   const cancelEdit = () => {
  //   setEditMode(false);
  // }

  // When user clicks Enter on Edit Mode, onSubmitClick is processed.
  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      onSaveClick();
    }
  };
  useEffect(() => {
    if (editMode) {
      inputItem.current.focus();
    }
  }, [editMode]);

  return (
    <>
      <tr key={item.id} className="item-row">
        <td>
          <Checkbox item={item} />
        </td>
        <td>
          <div
            className="item-div"
            id={`id${item.id}`}
            onClick={() => {
              onEditClick();
            }}
            onKeyPress={() => {
              onEditClick();
            }}
            tabIndex={0}
            role="button"
            aria-pressed="false"
          >
            <>{!editMode && name}</>
            <>
              {editMode && (
                <input
                  type="text"
                  ref={inputItem}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              )}
            </>
          </div>
        </td>
        <td>
          <>
            {!editMode && (
              <button
                class="btn btn-warning"
                type="button"
                // className="edit-button"
                data-target={`#id${item.id}`}
                onClick={onEditClick}
              >
                Edit
              </button>
            )}
            {/*in editMode, user sees input with submitted input item as a placeholder, Submit button.*/}
          </>
          <>
            {editMode && (
              <button
                onClick={onSaveClick}
                className="save-button"
                type="submit"
                class="btn btn-primary"
              >
                Save
              </button>
            )}
          </>
        </td>
        <td>
          <RecurringSettings item={item} editItem={editItem} />
        </td>
        <td>
          <button
            class="btn btn-danger"
            id="delete-button"
            onClick={() => deleteItem(item.id)}
          >
            &#10005;
          </button>
        </td>
      </tr>
    </>
  );
};

export default ItemRow;
