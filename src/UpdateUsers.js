import React, { useState } from "react";
import axios from "axios";


function UpdateUser() {
  const [id, setId] = useState("");
  const [form, setForm] = useState({ name: "", email: "" ,password:""});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
      if (!form.name.trim()) {
    alert("Name is required");
    return;
  }

  if (!form.email.trim()) {
    alert("Email is required");
    return;
  }
  if (!form.password.trim()) {
    alert("password is required");
    return;
  }

    try{
        await axios.put(`http://localhost:8080/users/update/${id}`, form);
    alert("User updated!");
    }
    catch(e){
        alert(e.response?.data || "Something went wrong")
    }
  };

  return (
    <div>
      <h3>Update User</h3>

      <input
        placeholder="User ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <form onSubmit={handleUpdate}>
        <input name="name" placeholder="New Name" onChange={handleChange} />
        <input name="email" placeholder="New Email" onChange={handleChange} />
           <input name="password" placeholder="password" onChange={handleChange} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateUser;