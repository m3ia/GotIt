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

const CreateNewList = ({
  onAdd,
  updateList,
  setLists,
  isAuthenticated,
  user,
}) => {
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");

  const addNewList = async (newList) => {
    console.log({ name, dueDate });
    const response = await apiClient.addList(newList);
    onAdd(response[0]);
  };

  const onSaveNewList = () => {
    addNewList({
      name: name,
      due_date: dueDate || null,
      owner_id: user.id,
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
        className="btn btn-primary float-right create-new-list-button"
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

const ViewAllLists = ({ selectList, userId, user }) => {
  const [lists, setLists] = useState([]);

  async function getLists(userId) {
    const listsArray = await apiClient.getLists(userId);
    setLists(listsArray);
    console.log("in getlists", userId);
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
    getLists(userId);
  }, [userId]);

  // delete list function
  const deleteList = (id) => {
    apiClient.deleteList(id);
    // automatically update list view
    const filterOut = lists.filter((list) => list.id !== id);
    setLists(filterOut);
  };

  return (
    <>
      <CreateNewList
        onAdd={onAdd}
        updateList={updateList}
        setLists={setLists}
        user={user}
      />
      <br />
      <br />
      <div className="list-container">
        {lists.map((list) => (
          <div key={list.id} className="list-element">
            <div className="list-title">
              <span className="list-name">{list.name}</span>
              {list.due_date ? (
                <>
                  <br />
                  <div className="due-date-title">
                    <span>List Due Date: {list.due_date}</span>
                  </div>
                </>
              ) : null}
            </div>

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
                onClick={() => selectList(list)}
              >
                View
              </button>
              <button
                type="button"
                className="list-button btn btn-danger btn-sm"
                id="delete-button"
                onClick={() => deleteList(list.id)}
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
