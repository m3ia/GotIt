export const getItems = async () => {
  const response = await fetch("/api/items");
  return response.json();
};

// add item function
export const addItem = async (name) => {
  const response = await fetch("/api/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });
  return response.json();
};

// delete item function
export const deleteItem = async (id) => {
  const response = await fetch(`/api/items/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
