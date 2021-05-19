import React, { useState, useEffect } from "react";

import * as apiClient from "./apiClient";
import icon from "./got-it-logo-icon1.png";
import listIcon from "./list-icon.png";

// const ListIcon = () => {
//   return (
//     <>
//       {icon}
//       <button
//         type="button"
//         // className="edit-button"
//         data-target={`#id${list.id}`}
//         // onClick={onEditClick}
//       >
//         View
//       </button>
//     </>
//   );
// };

const CreateNewList = ({ onAdd, updateList, setLists }) => {
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");

  const addNewList = async (name, dueDate) => {
    const response = await apiClient.addList(name, dueDate);
    onAdd(response[0]);
  };

  const onSaveNewList = () => {
    addNewList({
      name: name,
      due_date: dueDate || null,
    });
    setName("");
  };

  // // Validation to ensure name is not empty
  // function validateForm() {
  //   var x = document.forms["myForm"]["fname"].value;
  //   if (x === "") {
  //     alert("List name must be filled out");
  //     return false;
  //   }
  // }
  return (
    <div className="container">
      <button
        type="button"
        id="create-new-list-button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#myModal"
      >
        Create a New List
      </button>
      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Create a New List</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="modal-body">
              <b>List Name:</b>
              <div className="form-group">
                {/* <form
                  name="myForm"
                  action="/action_page.php"
                  onsubmit={() => validateForm()}
                  method="post"
                  required
                > */}
                <label htmlFor="list">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="list"
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {/* </form> */}
              </div>
              <b>Due Date: (optional)</b>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control"
                  id="list-due-date"
                  defaultValue={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                ></input>
              </div>
              {/* <!-- Modal footer --> */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={onSaveNewList}
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

const ViewAllLists = () => {
  const [lists, setLists] = useState([]);

  async function getLists() {
    const listsArray = await apiClient.getLists();
    setLists(listsArray);
  }

  const onAdd = (list) => setLists([...lists, list]);

  const updateList = (listToUpdate) => {
    const updatedLists = lists.map((list) => {
      if (list.id === listToUpdate.id) {
        return { ...listToUpdate };
      } else {
        return list;
      }
    });
    setLists(updatedLists);
  };

  useEffect(() => {
    getLists();
  }, []);

  // delete list function
  // const deleteList = (id) => {
  //   apiClient.deleteList(id);
  //   // automatically update list view
  //   const filterOut = lists.filter((list) => list.id !== id);
  //   setLists(filterOut);
  // };

  return (
    <>
      <div className="logo-icon">
        <img
          src={icon}
          className="app-icon"
          alt="checklist icon"
          width="10px"
        />
        <h1>Got It!</h1>
        <br />
        <CreateNewList
          onAdd={onAdd}
          updateList={updateList}
          setLists={setLists}
        />
      </div>
      <div className="list-container">
        {lists.map((list) => (
          <div key={list.id} className="list-element">
            <div className="list-name">{list.name}</div>

            <img
              src={listIcon}
              className="list-icon"
              alt="list icon"
              width="100px"
            />

            <div className="list-buttons">
              <button
                type="button"
                className="list-button btn btn-secondary btn-sm"
                id="view-button"
              >
                View
              </button>
              <button
                type="button"
                className="list-button btn btn-danger btn-sm"
                id="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewAllLists;
