import React, { useState, useEffect, useRef } from "react";

import "react-datepicker/dist/react-datepicker.css";

import * as apiClient from "./apiClient";

const moment = require("moment");

const RecurringSettings = ({ item, editItem }) => {
  const [recurFreq, setRecurFreq] = useState(item.recur_freq?.trim());
  const [recurStartDate, setRecurStartDate] = useState(item.recur_start_date);
  // const [recurStartTime, setRecurStartTime] = useState("");
  const [recurEndDate, setRecurEndDate] = useState(item.recur_end_date);
  // const [recurEndTime, setRecurEndTime] = useState("");

  // const [recurStartDT, setRecurStartDT] = useState(item.recur_start_date);
  // const [recurEndDT, setRecurEndDT] = useState(item.recur_end_date);

  const onSaveRecur = () => {
    // setRecurStartDT(recurStartDate + recurStartTime);
    // setRecurEndDT(recurEndDate + recurEndTime);
    setRecurFreq(recurFreq);

    editItem({
      ...item,
      recur_freq: recurFreq,
      recur_start_date: recurStartDate,
      recur_end_date: recurEndDate,
    });
    window.location = "/";
  };

  // const [selectedDate, setSelectedDate]
  console.log(recurFreq === "weekly", recurFreq, item.recur_freq, item);
  return (
    <div class="container">
      <button
        type="button"
        id="recur-button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target={`#recur-modal-${item.id}`}
      >
        {item.recur_freq && (
          <span role="img" aria-label="Repeat" id="freq-symbol">
            &#10227;
          </span>
        )}
        {!item.recur_freq && <span> Recur </span>}
      </button>
      <div class="modal" id={`recur-modal-${item.id}`}>
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
              <b>Pick your Frequency:</b>
              <div class="dropdown">
                <select
                  name="options"
                  id="recur-freq"
                  onBlur={(e) => {
                    setRecurFreq(e.target.value);
                  }}
                  // value={recurFreq}
                  defaultValue={recurFreq}
                >
                  <option value="select" selected={recurFreq === null}>
                    Set Frequency
                  </option>
                  <option
                    value="every-2-min"
                    selected={recurFreq === "every-2-min"}
                  >
                    Every 2 minutes
                  </option>
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
                  defaultValue={recurStartDate}
                  onChange={(e) => setRecurStartDate(e.target.value)}
                ></input>
                {/* <input
                  type="time"
                  class="form-control"
                  id="recur-start-time"
                  value={recurStartTime}
                  onChange={(e) => setRecurStartTime(e.target.value)}
                ></input> */}
                {/* Can improve end date option in future */}
                <label htmlFor="recur-end-date">
                  <b>Recurring End Date:</b>
                </label>
                <input
                  type="date"
                  class="form-control"
                  id="recur-end-date"
                  defaultValue={recurEndDate}
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

const Checkbox = ({ item, onChange }) => {
  const [isChecked, setIsChecked] = useState(item.is_done);

  return (
    <div class="form-check-inline">
      <label class="form-check-label">
        <input
          type="checkbox"
          class="form-check-input"
          id="checkbox"
          value={isChecked}
          name="{item.name}"
          // function to update the item in the db...filters item out from view
          // onClick={() => completeItem(true)}
          onClick={(e) => {
            onChange(e.target.value);
            setIsChecked(true);
          }}
        />
      </label>
    </div>
  );
};

// Item Row Component
const ItemRow = ({ item, deleteItem, updateItem }) => {
  const [name, setName] = useState(item.name);

  // const [name, setName] = useState(item.name);
  const [editMode, setEditMode] = useState(false);

  const editItem = (item, updatedItem) => {
    apiClient.editItem({ ...item, ...updatedItem });
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
          <Checkbox
            item={item}
            onChange={() => {
              editItem(item, { is_done: true });
              updateItem({ ...item, is_done: true });
            }}
          />
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
