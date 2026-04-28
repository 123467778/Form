import React, { useEffect, useState } from "react";
import axios from "axios";
import { process } from "@progress/kendo-data-query";
import { Grid, GridColumn } from "@progress/kendo-react-grid";


import "@progress/kendo-theme-default/dist/all.css";


function ReadUsers() {
  const [users, setUsers] = useState([]);
  const [dataState, setDataState] = useState({
  skip: 0,
  take: 3
});

 const [result, setResult] = useState(process(users, dataState));
   
 const handleDataStateChange = (event) => {
   setDataState(event.dataState); 
  //  setResult(process(users, event.dataState));  
 }; 


  const fetchUsers = async () => {
    const res =  await axios.get("http://localhost:8080/users/getAllUsers");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
  setResult(process(users, dataState));
}, [users, dataState]);





  return (
    // <div>
    //   <h3>All Users</h3>

    //   <ul>
    //     {users.map((u) => (
    //       <li key={u.id}>
    //         {u.name} - {u.email} -{u.password}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
     <Grid
      data={result.data}
      {...dataState}
       total={result.total}
      pageable={true}
      sortable={true}
      onDataStateChange={handleDataStateChange}
    >
      
      <GridColumn field="name" title="Name" />
      <GridColumn field="email" title="Email" />
      <GridColumn field="password" title="Password" />
     
    </Grid>
  );
}

export default ReadUsers; 