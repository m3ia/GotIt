import "./App.css";

import React, { useState, useEffect, useRef } from "react";

const AddItem = ({ addNewItem }) => {
  const inputItem = useRef();
  const [name, setName] = useState("");

  // Clicking Edit/on the value activates editMode. User sees input bar and Submit button.
  const onEditClick = () => {
    setEditMode(true);
  };

  // Submit sets setEditMode(false). User sees value with submitted input item.
  const onSubmitClick = async () => {
    await addNewItem(name);
    inputItem.current.focus();
    setName("");
  };

  // When user clicks Enter on Edit Mode, onSubmitClick is processed.
  const handleKeyPress = async (e) => {
    if (e.charCode === 13) {
      await addNewItem(e.target.value);
      inputItem.current.focus();
      setName("");
    }
  };

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
          className="add-item-section"
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
          <span className="add-item-row">Click here to add an item.</span>
        </div>
      )}

      {/* in editMode, user sees input with 
      submitted input item as a placeholder, 
      Submit button. */}
      {editMode && (
        // onKeyPress:Enter => click submit button.
        <>
          <div className="add-item">
            <input
              className="add-item-box"
              type="text"
              ref={inputItem}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Item"
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={onSubmitClick}
              className="btn btn-primary submitButton"
              type="submit"
            >
              Submit
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default AddItem;
