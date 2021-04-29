export const getTasks = async () => {
  const response = await fetch("/api/tasks");
  return response.json();
};

// add task function
export const addTask = async (name) => {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  return response.json();
};

// delete task function
export const deleteTask = async (id) => {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
