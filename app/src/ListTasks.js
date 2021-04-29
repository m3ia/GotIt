import React, { Fragment, useEffect, useState } from "react";

import EditTask from "./EditTask";

const ListTasks = () => {
  const [tasks, setTasks] = useState([]);

  // delete task function
  async function deleteTask(id) {
    try {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });

      // automatically update task view
      setTasks(tasks.filter((task) => task.task_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getTasks() {
    const res = await fetch("http://localhost:5000/tasks");

    const tasksArray = await res.json();

    setTasks(tasksArray);
  }
  useEffect(() => {
    getTasks();
  }, []);

  console.log(tasks);
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
          {tasks.map((task) => (
            <tr key={task.task_id}>
              <td>{task.description}</td>
              <td>
                <EditTask task={task} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTask(task.task_id)}
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

export default ListTasks;
