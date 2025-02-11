import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { login } from "../Redux/userSlice";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:2020/api/users/login", formData);
      dispatch(login(res.data));
      navigate("/dashboard");
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
        <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
