// get all lists
export const getLists = async () => {
  const response = await fetch("/api/lists");
  return response.json();
};

// add list function
export const addList = async (payload) => {
  console.log(payload);
  const response = await fetch("/api/lists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response.json();
};

// edit list function
export const editList = async (list) => {
  const body = list;
  const response = await fetch(`/api/lists/${list.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

// delete list function
export const deleteList = async (id) => {
  const response = await fetch(`/api/lists/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

// get all items
export const getItems = async (listId) => {
  const response = await fetch(`/api/items?listId=${listId}`);
  return response.json();
};

// add item function
export const addItem = async (name, listId) => {
  const response = await fetch("/api/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      list_id: listId,
    }),
  });
  return response.json();
};

// edit item function
export const editItem = async (item) => {
  const body = item;
  const response = await fetch(`/api/items/${item.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
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
