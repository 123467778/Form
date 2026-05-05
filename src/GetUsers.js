// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { process } from "@progress/kendo-data-query";
// import { Grid, GridColumn } from "@progress/kendo-react-grid";


// import "@progress/kendo-theme-default/dist/all.css";


// function ReadUsers() {
//   const [users, setUsers] = useState([]); 
//   const [dataState, setDataState] = useState({
//   skip: 0,
//   take: 3
// });

//  const [result, setResult] = useState(process(users, dataState));
   
//  const handleDataStateChange = (event) => {
//    setDataState(event.dataState); 
//   //  setResult(process(users, event.dataState));  
//  }; 


//   const fetchUsers = async () => {
//     const res =  await axios.get("http://localhost:8080/users/getAllUsers");
//     setUsers(res.data);
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//   setResult(process(users, dataState));
// }, [users, dataState]);





//   return (
//     // <div>
//     //   <h3>All Users</h3>

//     //   <ul>
//     //     {users.map((u) => (
//     //       <li key={u.id}>
//     //         {u.name} - {u.email} -{u.password}
//     //       </li>
//     //     ))}
//     //   </ul>
//     // </div>
//      <Grid
//       data={result.data}
//       {...dataState}
//        total={result.total}
//       pageable={true}
//       sortable={true}
//       onDataStateChange={handleDataStateChange}
//     >
      
//       <GridColumn field="name" title="Name" />
//       <GridColumn field="email" title="Email" />
//       <GridColumn field="password" title="Password" />

      
     
//     </Grid>
//   );
// }

// export default ReadUsers; 

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { process } from "@progress/kendo-data-query";
// import { Grid, GridColumn } from "@progress/kendo-react-grid";

// import "@progress/kendo-theme-default/dist/all.css";

// function ReadUsers() {
//   const [users, setUsers] = useState([]);
//   const [editID, setEditID] = useState(null);

//   const [dataState, setDataState] = useState({
//     skip: 0,
//     take: 3
//   });

//   const [result, setResult] = useState(process(users, dataState));

//   const handleDataStateChange = (event) => {
//     setDataState(event.dataState);
//   };

//   const fetchUsers = async () => {
//     const res = await axios.get("http://localhost:8080/users/getAllUsers");
//     setUsers(res.data);
//     console.log(res.data);
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     setResult(process(users, dataState));
//   }, [users, dataState]);

//   // ---- Editing Logic ----
//   const enterEdit = (item) => setEditID(item.id);
//   const save = () => setEditID(null);
//   const cancel = () => setEditID(null);

//   const itemChange = (event) => {
//     const newData = users.map((item) =>
//       item.id === event.dataItem.id
//         ? { ...item, [event.field]: event.value }
//         : item
//     );
//     setUsers(newData);
//   };

//   const Cell = (props) => {
//     const isEditing = props.dataItem.id === editID;
//     const field = props.field;

//     return (
//       <td>
//         {isEditing ? (
//           <input
//             value={props.dataItem[field] || ""}
//             onChange={(e) =>
//               itemChange({
//                 dataItem: props.dataItem,
//                 field,
//                 value: e.target.value
//               })
//             }
//           />
//         ) : (
//           props.dataItem[field]
//         )}
//       </td>
//     );
//   };

//   // ---- Grid ----
//   return (
//     <Grid
//       data={result.data}
//       {...dataState}
//       total={result.total}
//       pageable={true}
//       sortable={true}
//       onDataStateChange={handleDataStateChange}
//       dataItemKey="id"
//     >
//       <GridColumn field="name" title="Name" cells={{ data: Cell }} />
//       <GridColumn field="email" title="Email" cells={{ data: Cell }} />
//       <GridColumn field="password" title="Password" cells={{ data: Cell }} />

//       <GridColumn
//         title="Actions"
//         width="200px"
//         cells={{
//           data: (props) => {
//             const isEditing = props.dataItem.id === editID;

//             return (
//               <td>
//                 {isEditing ? (
//                   <>
//                     <button onClick={save}>Save</button>
//                     <button onClick={cancel}>Cancel</button>
//                   </>
//                 ) : (
//                   <button onClick={() => enterEdit(props.dataItem)}>
//                     Edit
//                   </button>
//                 )}
//               </td>
//             );
//           }
//         }}
//       />
//     </Grid>
//   );
// }

// export default ReadUsers;




import "@progress/kendo-theme-default/dist/all.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { process } from "@progress/kendo-data-query";
import { Grid, GridColumn } from "@progress/kendo-react-grid";

function ReadUsers() {
  const [users, setUsers] = useState([]);
  const [editID, setEditID] = useState(null);

  const [dataState, setDataState] = useState({
    skip: 0,
    take: 5,
  });

  const [result, setResult] = useState(process(users, dataState));

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setResult(process(users, dataState));
  }, [users, dataState]);

  const fetchUsers = async () => {
    const res = await axios.get(
      "http://localhost:8080/users/getAllUsers"
    );
    setUsers(res.data);
  };

  const handleDataStateChange = (e) => {
    setDataState(e.dataState);
  };

  //  EDIT LOGIC 
  const enterEdit = (item) => setEditID(item.id);
  const cancel = () => setEditID(null);

  const itemChange = (event) => {
    const updated = users.map((item) =>
      item.id === event.dataItem.id
        ? { ...item, [event.field]: event.value }
        : item
    );
    setUsers(updated);
  };

  // SAVE TO DB 
  const save = async () => {
    const user = users.find((u) => u.id === editID);

    await axios.put(
      `http://localhost:8080/users/update/${editID}`,
      user
    );

    setEditID(null);
    fetchUsers(); // reload fresh data from DB
  };

  //  CELL 
  const Cell = (props) => {
    const isEditing = props.dataItem.id === editID;
    const field = props.field;

    return (
      <td>
        {isEditing ? (
          <input
            value={props.dataItem[field] || ""}
            onChange={(e) =>
              itemChange({
                dataItem: props.dataItem,
                field,
                value: e.target.value,
              })
            }
          />
        ) : (
          props.dataItem[field]
        )}
      </td>
    );
  };

  return (
    <Grid
      data={result.data}
      {...dataState}
      total={result.total}
      pageable={true}
      sortable={true}
      onDataStateChange={handleDataStateChange}
      dataItemKey="id"
    >
      <GridColumn field="name" title="Name" cells={{ data: Cell }} />
      <GridColumn field="email" title="Email" cells={{ data: Cell }} />
      <GridColumn field="password" title="Password" cells={{ data: Cell }} />

      <GridColumn
        title="Actions"
        width="200px"
        cells={{
          data: (props) => {
            const isEditing = props.dataItem.id === editID;

            return (
              <td>
                {isEditing ? (
                  <>
                    <button onClick={save}>Save</button>
                    <button onClick={cancel}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => enterEdit(props.dataItem)}>
                    Edit
                  </button>
                )}
              </td>
            );
          },
        }}
      />
    </Grid>
  );
}

export default ReadUsers;