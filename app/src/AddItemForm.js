import React, { useState, useEffect, useRef } from "react";

// import EditItem from "./EditItem";
// import * as apiClient from "./apiClient";

const AddItem = () => {
  const inputItem = useRef();

  // Clicking Edit/on the value activates editMode. User sees input bar and Submit button.
  const onEditClick = () => {
    setEditMode(true);
  };

  // Submit sets setEditMode(false). User sees value with submitted input item.
  const onSubmitClick = () => {
    setEditMode(false);
  };

  // Want: When user clicks out => setEditMode(false) => editMode === false, a line with original value.
  //   const cancelEdit = () => {
  //   setEditMode(false);
  // }

  // When user clicks Enter on Edit Mode, onSubmitClick is processed.
  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      onSubmitClick();
    }
  };

  const [name, setName] = useState("Click here to add an item");

  // By default, editMode starts out as false.
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    if (editMode) {
      inputItem.current.focus();
    }
  }, [editMode]);

  return (
    <>
      {!editMode && (
        <div
          className="add-item-row"
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
          <br />
          {name}
        </div>
      )}

      {/* in editMode, user sees input with 
      submitted input item as a placeholder, 
      Submit button. */}
      {editMode && (
        // onKeyPress:Enter => click submit button.
        <>
          <input
            className="add-item-box"
            type="text"
            ref={inputItem}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={onSubmitClick}
            className="submitButton"
            type="submit"
          >
            Submit
          </button>
        </>
      )}
    </>
  );
};

export default AddItem;
