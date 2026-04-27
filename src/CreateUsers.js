import React, { useState } from "react";
import axios from "axios";

function CreateUser() {
  const [form, setForm] = useState({ name: "", email: "" ,password:"    "});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!form.name.trim()) {
    alert("Username should not be empty");
    return;
  }

  else if (!form.email.trim()) {
    alert("Email should not be empty");
    return;
  }
   else if(!form.password.trim()) {
      alert("password should not be empty");
      return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
    alert( "Invalid email format");
    return;
  }

  try{
    axios.post("http://localhost:8080/users/create", form);
    alert("User added!");
    setForm({ name: "", email: "",password:"" });
    
  }
  catch(e){
    alert("something went wrong....")
  }

  
  };

  return (
    <div>
      <h3>Create User</h3>

      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateUser;
  // axios.post("http://localhost:8080/users/create", form);
    // alert("User added!");
    // setForm({ name: "", email: "" });