import React, { useState, useEffect, useRef } from "react";

import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import RefreshIcon from "@material-ui/icons/Refresh";
import SaveIcon from "@material-ui/icons/Save";
import TodayIcon from "@material-ui/icons/Today";
import ViewWeekIcon from "@material-ui/icons/ViewWeek";
import addDays from "date-fns/addDays";
import addMonths from "date-fns/addMonths";

const RecurringSettings = ({ item, editItem }) => {
  const [recurFreq, setRecurFreq] = useState(item.recur_freq?.trim());
  const [recurStartDate, setRecurStartDate] = useState(item.recur_start_date);
  const [recurEndDate, setRecurEndDate] = useState(item.recur_end_date);

  const onSaveRecur = () => {
    setRecurFreq(recurFreq);

    editItem({
      ...item,
      recur_freq: recurFreq,
      recur_start_date: recurStartDate,
      recur_end_date: recurEndDate,
    });
  };

  return (
    <div className="recurring-modal-container">
      <span
        id="recur-button"
        className="btn action-button"
        data-toggle="modal"
        data-target={`#recur-modal-${item.id}`}
        role="button"
        aria-pressed="false"
        aria-hidden="true"
        tabIndex={0}
      >
        <RefreshIcon />
      </span>
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
                  <option value="5s" selected={recurFreq === "5s"}>
                    5s
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
              {/* Recurring Algo */}
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
          onClick={(e) => {
            onChange(e.target.value);
            !isChecked ? setIsChecked(true) : setIsChecked(false);
          }}
        />
      </label>
    </div>
  );
};

// TODO: Improve capability for clicking-out to exit editing (part 1)
// function useOutsideAlerter(ref, exitEdit) {
//   useEffect(() => {
//     // Function for click event
//     function handleOutsideClick(event) {
//       if (ref.current && !ref.current.contains(event.target)) {
//         exitEdit();
//       }
//     }

//     // Adding click event listener
//     document.addEventListener("click", handleOutsideClick, true);
//   }, [ref, exitEdit]);
// }

function getNextStartDate(item) {
  const now = new Date();
  let newStartDate = new Date(item.recur_start_date);
  let adder = addDays;
  let amountToAdd = 1;

  console.log("testing. item.recur_start_date: ", item.recur_start_date);

  if (item.recur_freq === "Weekly") {
    amountToAdd = 7;
  } else if (item.recur_freq === "Monthly") {
    adder = addMonths;
  } else if (item.recur_freq === "5s") {
    // doesn't matter
    return now;
  } else if (!item.recur_freq) {
    // not recurring
    return null;
  }

  // find the next closest of that window
  console.log(
    "is adder current date plus amount to add greater than or equal to now? ",
    "newstartdate: ",
    newStartDate,
    "now: ",
    now,
    "item sd: ",
    new Date(item.recur_start_date),
    adder(newStartDate, amountToAdd),
    adder(newStartDate, amountToAdd) >= now,
  );
  if (adder(newStartDate, amountToAdd) >= now) {
    newStartDate = new Date(item.recur_start_date);
    return newStartDate;
  } else {
    while (adder(newStartDate, amountToAdd) < now) {
      newStartDate = addDays(newStartDate, 1);
    }
    newStartDate = adder(newStartDate, amountToAdd);
    return newStartDate;
  }
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

  // TODO: Improve capability for clicking-out to exit editing (part 2)
  // const cancelEdit = () => {
  //   setEditMode(false);
  //   setName(item.name);
  // };
  // useOutsideAlerter(inputItem, () => {
  //   if (editMode) cancelEdit();
  // });

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
      {/* <ul class="no-bullets"> */}
      {/* Open for item row container */}
      <div key={item.id} className="item-row-container">
        {/* Open for item row */}
        <div className="item-row">
          {/* <li> */}
          {/* Open for checkbox */}
          <span className="checkbox">
            <Checkbox
              item={item}
              onChange={() => {
                !item.is_done
                  ? updateItem({
                      ...item,
                      is_done: true,
                      recur_start_date: getNextStartDate(item),
                    })
                  : updateItem({
                      ...item,
                      is_done: false,
                      recur_start_date: getNextStartDate(item),
                    });
                // updateItem({ ...item, is_done: true });
              }}
            />
          </span>
          {/* Close for checkbox */}
          {/* Open for item name */}
          <span
            className="item-name-div"
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
            {item.recur_freq && (
              <div>
                <span className="recur-info">
                  <i>Recurs {item.recur_freq}</i>
                </span>
              </div>
            )}
          </span>
          {/* Close for item name */}
          {/* Open for item action buttons */}
          <div className="item-action-buttons float-right">
            <>
              {!editMode && (
                <span
                  className="action-button"
                  id="edit-button"
                  type="button"
                  data-target={`#id${item.id}`}
                  onClick={onEditClick}
                  role="button"
                  aria-pressed="false"
                  aria-hidden="true"
                  tabIndex={0}
                >
                  <EditRoundedIcon />
                </span>
              )}
              {/*in editMode, user sees input with submitted input item as a placeholder, Submit button.*/}
            </>
            <>
              {editMode && (
                <span
                  onClick={onSaveClick}
                  type="submit"
                  id="save-button"
                  className="btn action-button"
                  role="button"
                  aria-pressed="false"
                  aria-hidden="true"
                  tabIndex={0}
                >
                  <SaveIcon />
                </span>
              )}
            </>
            <RecurringSettings item={item} editItem={updateItem} />
            {/* // eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
            <span
              className="action-button"
              id="delete-button"
              onClick={() => deleteItem(item.id)}
              role="button"
              aria-pressed="false"
              aria-hidden="true"
              tabIndex={0}
            >
              <DeleteForeverIcon />
            </span>
          </div>
          {/* Close for item action buttons */}
          {/* </li> */}
          <br />
        </div>
        {/* Close for item row */}
      </div>
      {/* Close for item row container*/}
      {/* </ul> */}
    </>
  );
};

export default ItemRow;
