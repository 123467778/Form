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
