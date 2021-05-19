import "./App.css";

import React, { useState, useEffect, useRef } from "react";

const AddItem = ({ addNewItem }) => {
  const inputItem = useRef();
  const [name, setName] = useState("");

  // const addNewItem = async (name) => {
  //   const response = await apiClient.addItem(name);
  //   onAdd(response[0]);
  // };

  // Clicking Edit/on the value activates editMode. User sees input bar and Submit button.
  const onEditClick = () => {
    setEditMode(true);
  };

  // Submit sets setEditMode(false). User sees value with submitted input item.
  const onSubmitClick = () => {
    addNewItem(name);
    setName("");
    setEditMode(false);
  };

  // Want: When user clicks out of input box => setEditMode(false) => editMode === false, a line with original value.
  //   const cancelEdit = () => {
  //   setEditMode(false);
  // }

  // When user clicks Enter on Edit Mode, onSubmitClick is processed.
  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      addNewItem(e.target.value);
      setName("");
      setEditMode(false);
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
          Click here to add an item.
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
              className="submitButton"
              class="btn btn-primary"
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
