import React, { useState, useEffect, useRef } from "react";

import addDays from "date-fns/addDays";
import addMonths from "date-fns/addMonths";

// import { zonedTimeToUtc } from "date-fns-tz";

const RecurringSettings = ({ item, editItem }) => {
  const [recurFreq, setRecurFreq] = useState(item.recur_freq?.trim());
  const [recurStartDate, setRecurStartDate] = useState(item.recur_start_date);
  // const [recurStartTime, setRecurStartTime] = useState("");
  const [recurEndDate, setRecurEndDate] = useState(item.recur_end_date);
  // const [recurEndTime, setRecurEndTime] = useState("");

  // const [recurStartDT, setRecurStartDT] = useState(item.recur_start_date);
  // const [recurEndDT, setRecurEndDT] = useState(item.recur_end_date);

  const onSaveRecur = () => {
    // const utcDate = zonedTimeToUtc(recurStartDate, "Europe/Berlin");
    // setRecurStartDT(utcDate);
    // setRecurEndDT(recurEndDate + recurEndTime);
    setRecurFreq(recurFreq);

    editItem({
      ...item,
      recur_freq: recurFreq,
      recur_start_date: recurStartDate,
      recur_end_date: recurEndDate,
    });
  };

  return (
    <div className="container">
      <button
        type="button"
        id="recur-button"
        className="btn btn-primary btn-sm"
        data-toggle="modal"
        data-target={`#recur-modal-${item.id}`}
      >
        {item.recur_freq && <span> {item.recur_freq} </span>}
        {!item.recur_freq && (
          <span role="img" aria-label="Repeat" id="freq-symbol">
            &#10227;
          </span>
        )}
      </button>
      <div className="modal" id={`recur-modal-${item.id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Recurring Item Frequency</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="modal-body">
              <b>Pick your Frequency:</b>
              <div className="dropdown">
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
                  <option value="DEMO" selected={recurFreq === "DEMO"}>
                    DEMO
                  </option>
                  <option value="Daily" selected={recurFreq === "Daily"}>
                    Daily
                  </option>
                  <option value="Weekly" selected={recurFreq === "Weekly"}>
                    Weekly
                  </option>
                  <option value="Monthly" selected={recurFreq === "Monthly"}>
                    Monthly
                  </option>
                </select>
              </div>
              {/* <DatePicker selected={} onChange{} /> */}
              <div className="date-input">
                <label htmlFor="recur-start-date">
                  <b>Recurring Start Date:</b>
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="recur-start-date"
                  defaultValue={recurStartDate}
                  onChange={(e) => setRecurStartDate(e.target.value)}
                ></input>
                {/* <input
                  type="time"
                  className="form-control"
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
                  className="form-control"
                  id="recur-end-date"
                  defaultValue={recurEndDate}
                  onChange={(e) => setRecurEndDate(e.target.value)}
                ></input>
                {/* <input
                  type="time"
                  className="form-control"
                  id="recur-end-time"
                  value={recurEndTime}
                  onChange={(e) => setRecurEndTime(e.target.value)}
                ></input> */}
              </div>
              {/* <!-- Modal footer --> */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={onSaveRecur}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
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
    <div className="form-check-inline">
      <label className="form-check-label">
        <input
          type="checkbox"
          className="form-check-input"
          id="checkbox"
          // value={isChecked}
          checked={isChecked}
          name="{item.name}"
          // function to update the item in the db...filters item out from view
          // onClick={() => completeItem(true)}
          onClick={(e) => {
            onChange(e.target.value);
            !isChecked ? setIsChecked(true) : setIsChecked(false);
          }}
        />
      </label>
    </div>
  );
};

function useOutsideAlerter(ref, exitEdit) {
  useEffect(() => {
    // Function for click event
    function handleOutsideClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        exitEdit();
      }
    }

    // Adding click event listener
    document.addEventListener("click", handleOutsideClick, true);
  }, [ref, exitEdit]);
}

function getNextStartDate(item) {
  const now = new Date();
  let newStartDate = new Date(item.recur_start_date);
  let adder = addDays;
  let amountToAdd = 1;

  if (item.recur_freq === "Weekly") {
    amountToAdd = 7;
  } else if (item.recur_freq === "Monthly") {
    adder = addMonths;
  } else if (item.recur_freq === "DEMO") {
    // doesn't matter
    return now;
  } else if (!item.recur_freq) {
    // not recurring
    return null;
  }

  // find the next closest of that window
  while (adder(newStartDate, amountToAdd) < now) {
    newStartDate = addDays(newStartDate, 1);
  }
  newStartDate = adder(newStartDate, amountToAdd);
  return newStartDate;
}

// Item Row Component
const ItemRow = ({ item, deleteItem, updateItem }) => {
  const [name, setName] = useState(item.name);

  // const [name, setName] = useState(item.name);
  const [editMode, setEditMode] = useState(false);

  //useRef for focusing into input bar
  const inputItem = useRef(null);

  // Clicking Edit/on the value activates editMode. User sees input and Submit button.
  const onEditClick = () => {
    setEditMode(true);
  };
  // Submit sets setEditMode(false). User sees value with submitted input item, Edit button.
  const onSaveClick = () => {
    setEditMode(false);
    updateItem({ ...item, name });
  };

  // When user clicks out => setEditMode(false) => editMode === false, a line with original value, and a view of the edit button.
  const cancelEdit = () => {
    setEditMode(false);
    setName(item.name);
  };
  useOutsideAlerter(inputItem, () => {
    if (editMode) cancelEdit();
  });

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
              !item.is_done
                ? updateItem({
                    ...item,
                    is_done: true,
                    recur_start_date: getNextStartDate(item),
                  })
                : updateItem({ ...item, is_done: false });
              // updateItem({ ...item, is_done: true });
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
                  style={item.is_done ? { color: "blue" } : { color: "black" }}
                />
              )}
            </>
          </div>
        </td>
        <td>
          <>
            {!editMode && (
              <button
                className="btn btn-warning btn-sm"
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
                type="submit"
                className="btn btn-primary save-button btn-sm"
              >
                Save
              </button>
            )}
          </>
        </td>
        <td>
          <RecurringSettings item={item} editItem={updateItem} />
        </td>
        <td>
          <button
            className="btn btn-danger btn-sm"
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
