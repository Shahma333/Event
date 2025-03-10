import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../axios";

const CreateTask = () => {
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(false); // 🆕 Loading state

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    console.log("Token in Request:", token); // Debugging

    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

    try {
      setLoading(true); // Start loading
      const response = await api.post("/tasks/create", taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Task created successfully!");
      navigate("/tasks"); // 🆕 Redirect to tasks page after success
    } catch (error) {
      console.error("Error creating task:", error.response?.data);
      alert(error.response?.data?.message || "Unknown error occurred");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Task Name"
          value={taskData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="description"
          placeholder="Task Description"
          value={taskData.description}
          onChange={handleChange}
          required
          style={{ ...styles.input, height: "100px", resize: "vertical" }} // 🆕 Larger, resizable textarea
        />
        <input
          type="date"
          name="deadline"
          value={taskData.deadline}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={{ ...styles.button, opacity: loading ? 0.7 : 1 }} disabled={loading}>
          {loading ? "Creating..." : "Create Task"} {/* 🆕 Show loading text */}
        </button>
      </form>
    </div>
  );
};

// 🔹 Styled Components
const styles = {
  container: {
    maxWidth: "400px",
    margin: "100px auto",
    padding: "20px",
    textAlign: "center",
    background: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "background 0.3s",
  },
};

export default CreateTask;
