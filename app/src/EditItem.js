import React, { useState, useEffect, useRef } from "react";

import * as apiClient from "./apiClient";

// editText function
const EditItem = ({ item }) => {
  const editText = async (id, newName) => {
    apiClient.editItem(newName, id);
    window.location = "/"; // ensures you don't have to refresh again
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
  };
  // Want: When user clicks out => setEditMode(false) => editMode === false, a line with original value, and a view of the edit button.
  //   const cancelEdit = () => {
  //   setEditMode(false);
  // }

  // When user clicks Enter on Edit Mode, onSubmitClick is processed.
  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      editText(item.id, e.target.value);
      onSaveClick();
      console.log(e.target.value, item.id);
    }
  };
  const [name, setName] = useState(item.name);
  const [editMode, setEditMode] = React.useState(false);
  useEffect(() => {
    if (editMode) {
      inputItem.current.focus();
    }
  }, [editMode]);

  return (
    <>
      <td>
        {/* <div className="item-row"> */}
        {/* Need to figure out how to add event listener below. */}
        <div
          className="item-row"
          id={`id${item.id}`}
          // this is not currently working
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
            {/* onKeyPress:Enter => click submit button. */}
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
              type="button"
              class="btn btn-warning"
              className="edit-button"
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
            <button onClick={onSaveClick} className="save-button" type="submit">
              Save
            </button>
          )}
        </>
      </td>
    </>
  );
};

export default EditItem;
