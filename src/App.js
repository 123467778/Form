import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import CreateUser from './CreateUsers';
import UpdateUser from './UpdateUsers';
import DeleteUser from './DeleteUser';
import GetUsers from './GetUsers';


function App() {
  const[view,setView]=useState("");
  return (
   <div>
    <button onClick={()=>setView("create")}>Create</button>
     <button onClick={()=>setView("users")}>users</button>
      <button onClick={()=>setView("update")}>Update</button>
      <button onClick={()=>setView("delete")}>delete</button>
    
    {view==="create" && <CreateUser/>}
    {view==="users" && <GetUsers/>}
    {view==="update" && <UpdateUser/>}
    {view==="delete" && <DeleteUser/>}





   </div>
  );
}

export default App;
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import CreateUser from "./CreateUser";
// import GetUsers from "./GetUsers";
// import UpdateUser from "./UpdateUser";
// import DeleteUser from "./DeleteUser";

// function App() {
//   return (
//     <BrowserRouter>
//       <div>
//         {/* Navigation Buttons */}
//         <Link to="/create"><button>Create</button></Link>
//         <Link to="/users"><button>Users</button></Link>
//         <Link to="/update"><button>Update</button></Link>
//         <Link to="/delete"><button>Delete</button></Link>

//         {/* Routes */}
//         <Routes>
//           <Route path="/create" element={<CreateUser />} />
//           <Route path="/users" element={<GetUsers />} />
//           <Route path="/update" element={<UpdateUser />} />
//           <Route path="/delete" element={<DeleteUser />} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;