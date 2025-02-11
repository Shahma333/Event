import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../axios";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res =await api.post("/register", formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res.data);
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data?.message || "Server error");
    }
  };


  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
        <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
