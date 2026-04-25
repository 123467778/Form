import React, { useState } from "react";
import axios from "axios";


function DeleteUser() {
  const [id, setId] = useState("");

  const handleDelete = async () => {
    axios.delete(`http://localhost:8080/users/delete/${id}`);
    alert("User deleted!");
  };

  return (
    <div>
      <h3>Delete User</h3>

      <input
        placeholder="User ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DeleteUser;