import React, { useState, useEffect, useRef } from "react";

import * as apiClient from "./apiClient";

const Checkbox = () => {
  return (
    <div class="form-check-inline">
      <label class="form-check-label">
        <input
          type="checkbox"
          class="form-check-input"
          id="checkbox"
          name="{EditItem.name}"
          value="something"
          onClick={
            console.log("hi")
            // function to update the item in the db...filters item out from view
          }
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

  const editText = async (id, newName) => {
    apiClient.editItem(newName, id);
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
    editText(item.id, name);
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
  console.log({ editMode });

  return (
    <>
      <tr key={item.id} className="item-row">
        <td>
          <Checkbox />
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
        <td>Recurring Option</td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteItem(item.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default ItemRow;
