import React, { Fragment, useEffect, useState } from "react";

import EditItem from "./EditItem";

const ListItems = () => {
  const [items, setItems] = useState([]);

  // delete item function
  async function deleteItem(id) {
    try {
      await fetch(`http://localhost:5000/items/${id}`, {
        method: "DELETE",
      });

      // automatically update item view
      setItems(items.filter((item) => item.item_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getItems() {
    const res = await fetch("http://localhost:5000/items");

    const itemsArray = await res.json();

    setItems(itemsArray);
  }
  useEffect(() => {
    getItems();
  }, []);

  console.log(items);
  return (
    <Fragment>
      {" "}
      <table class="table table-hover mt-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* 
            <tr>
              <td>John</td>
              <td>Doe</td>
              <td>john@example.com</td>
            </tr>
*/}
          {items.map((item) => (
            <tr key={item.item_id}>
              <td>{item.description}</td>
              <td>
                <EditItem item={item} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteItem(item.item_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

// George's starter code
// const App = () => {
//   const [tasks, setTasks] = React.useState([]);

//   const loadTasks = async () => setTasks(await apiClient.getTasks());

//   React.useEffect(() => {
//     loadTasks();
//   }, []);

//   return (
//     <main className="App">
//       <TaskList tasks={tasks} />
//       <AddTask loadTasks={loadTasks} />
//     </main>
//   );
// };

// const TaskList = ({ tasks }) => (
//   <ul>
//     {tasks.map(({ id, name }) => (
//       <li key={id}>{name}</li>
//     ))}
//   </ul>
// );

// const AddTask = ({ loadTasks }) => {
//   const [task, setTask] = React.useState("");

//   const canAdd = task !== "";

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (canAdd) {
//       await apiClient.addTask(task);
//       loadTasks(); // grabs all tasks so you don't have to reload
//       setTask("");
//     }
//   };

//   return (
//     <form onSubmit={onSubmit}>
//       <label>
//         New task:{" "}
//         <input onChange={(e) => setTask(e.currentTarget.value)} value={task} />
//       </label>
//       <button disabled={!canAdd}>Add</button>
//     </form>
//   );
// };

export default ListItems;
