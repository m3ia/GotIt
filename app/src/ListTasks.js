import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  // delete todo function
async function deleteTodo(id) {
  try {
    await fetch(`http://localhost:5000/todos/${id}`, {
      method:"DELETE"
    });
    
    // automatically update todo view
    setTodos(todos.filter(todo => todo.todo_id !== id));
  } catch (err) {
    console.error(err.message);
  }
}

  async function getTodos() {
    const res = await fetch("http://localhost:5000/todos");

    const todosArray = await res.json();

    setTodos(todosArray);
  }
  useEffect(() => {
    getTodos();
  }, []);

    console.log(todos);
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
        {
          todos.map(todo => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo}/>
              </td>
              <td>
                <button 
                  className="btn btn-danger" 
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                Delete
                </button>
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </Fragment>
  );

}

export default ListTodos;