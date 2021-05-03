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

// edit item function 

export const editItem = async (id) => {
  const body = { name };
  const response = await fetch(`/api/items/${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)

  });

// delete item function
export const deleteItem = async (id) => {
  const response = await fetch(`/api/items/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
