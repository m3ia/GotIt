import React, { useState } from "react";

// editText function
const EditItem = ({item}) => {
// state: value
// onClick: setState (via useState): input box with value as placeholder. "submit" button appears
// if user clicks out, value resets as placeholder
// if user clicks enter, or clicks "submit", value changes to e.target.value
// post http req is sent to edit info in db
// api call is made to get all items seemlessly

const editText = async(id)=>{
  apiClient.editItem(id);
  window.location = "/"; // ensures you don't have to refresh again
}
const [name, setName] = useState(item.name);

return <h1>Edit Item</h1>

      <button
        type="button"
        class="btn btn-warning" data-toggle="modal"
        data-target={`#id${item.id}`}>
        Edit
      </button>
      {/* id = "id25*/}
      <div class="modal" id={`id${item.id}`}
        onClick={() => setName(item.name)}>
        <div class="modal-dialog">
          <div class="modal-content">

            <div class="modal-header">
              <h4 class="modal-title">Edit item</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => setName(item.name)} >&times;</button>
            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form control"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={() => editText(item.id)}>
                Save
              </button>
              <button
                type="button"
                class="btn btn-danger" data-dismiss="modal"
                onClick={() => setName(item.name)}>
                  Close
              </button>
            </div>

          </div>
        </div>
      </div>
</Fragment>
);

export default EditItem;
