import React, { useState, useEffect, useRef } from "react";

import * as apiClient from "./apiClient";

export const Checkbox = ({ item }) => {
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
// editText function
export const EditItem = ({ item }) => {
  const [name, setName] = useState(item.name);
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
  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      setEditMode(false);
      editText(item.id, e.target.value);
      console.log(e.target.value, item.id);
    }
  };
  useEffect(() => {
    if (editMode) {
      inputItem.current.focus();
    }
  }, [editMode]);
  console.log(editMode);
  return (
    <>
      <td>
        {/* <div className="item-row"> */}
        {/* Need to figure out how to add event listener below. */}
        <div
          className="item-row"
          id={`id${item.id}`}
          onClick={() => {
            onEditClick();
          }}
          onKeyPress={() => {
            onEditClick();
          }}
          // see a11y doc: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/interactive-supports-focus.md
          tabIndex={0}
          role="button"
          // see a11y doc: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-hidden_attribute
          // aria-hidden="true"
          aria-pressed="false"
        >
          <>
            {!editMode && name}
            {/* onKeyPress:Enter => click Save button. */}
          </>
          <>
            {editMode && (
              <input
                type="text"
                ref={inputItem}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            )}
          </>
        </div>
      </td>
      <td>
        <>
          {/* <h1>Edit Item</h1> */}
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
          {/* in editMode, user sees input with submitted input item as a placeholder, Submit button. */}
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
    </>
  );
};

// export default EditItem;
