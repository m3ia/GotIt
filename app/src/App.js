import * as React from "react";
import { Fragment } from "react";

import ListItems from "./ListItems";
import * as apiClient from "./apiClient";

const App = () => {
  // const [items, setItems] = React.useState([]);

  // const loadItems = async () => setItems(await apiClient.getItems());

  // React.useEffect(() => {
  //   loadItems();
  // }, []);

  return (
    <Fragment>
      <div className="container">
        {/* <ItemList items={items} /> */}
        {/* <AddItem loadItems={loadItems} /> */}
        <ListItems />
      </div>
    </Fragment>
  );
};

// const ItemList = ({ items }) => (
//   <ul>
//     {items.map(({ id, name }) => (
//       <li key={id}>{name}</li>
//     ))}
//   </ul>
// );

// const AddItem = ({ loadItems }) => {
//   const [item, setItem] = React.useState("");

//   const canAdd = item !== "";

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (canAdd) {
//       await apiClient.addItem(item);
//       loadItems(); // grabs all items so you don't have to reload
//       setItem("");
//     }
//   };

//   return (
//     <form onSubmit={onSubmit}>
//       <label>
//         New item:{" "}
//         <input onChange={(e) => setItem(e.currentTarget.value)} value={item} />
//       </label>
//       <button disabled={!canAdd}>Add</button>
//     </form>
//   );
// };

export default App;
