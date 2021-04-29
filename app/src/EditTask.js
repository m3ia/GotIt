// import React, { Fragment, useState } from "react";

// const EditTask = ({todo}) => {
  // //editText function
  // const editText = async(id)=>{
  //   try {

  //     const body = { description };
  //     const res = await fetch(`http://localhost:5000/todos/${id}`, 
  //     {
  //       method: "PUT",
  //       headers: {"Content-Type": "application/json"},
  //       body: JSON.stringify(body)
  //     });

  //     window.location = "/"; // ensures you don't have to refresh again
  //   } catch (error) {
  //       console.error(error.message)
  //   }
  // }
  // const [description, setDescription] = useState(todo.description);

  // return <h1>Edit Task</h1>

    // <Fragment>
//       <button 
//         type="button" 
//         class="btn btn-warning" data-toggle="modal" 
//         data-target={`#id${todo.todo_id}`}>
//         Edit
//       </button>
//       {/* id = "id25*/}
//       <div class="modal" id={`id${todo.todo_id}`}
//         onClick={() => setDescription(todo.description)}>
//         <div class="modal-dialog">
//           <div class="modal-content">

//             <div class="modal-header">
//               <h4 class="modal-title">Edit Todo</h4>
//               <button 
//                 type="button" 
//                 class="close" 
//                 data-dismiss="modal" 
//                 onClick={() => setDescription(todo.description)} >&times;</button>
//             </div>

//             <div class="modal-body">
//               <input 
//                 type="text"
//                 className="form control" 
//                 value={description} 
//                 onChange={e => setDescription(e.target.value)}
//               />
//             </div>

//             <div class="modal-footer">
//               <button 
//                 type="button" 
//                 class="btn btn-warning" 
//                 data-dismiss="modal"
//                 onClick={() => editText(todo.todo_id)}>
//                 Save
//               </button>
//               <button 
//                 type="button" 
//                 class="btn btn-danger" data-dismiss="modal"
//                 onClick={() => setDescription(todo.description)}>
//                   Close
//               </button>
//             </div>

//           </div>
//         </div>
//       </div>
    // </Fragment>
    // );


// export default EditTask;