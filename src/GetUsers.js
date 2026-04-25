import React, { useEffect, useState } from "react";
import axios from "axios";


function ReadUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res =  await axios.get("http://localhost:8080/users/getAllUsers");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h3>All Users</h3>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} - {u.email} -{u.password}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReadUsers;