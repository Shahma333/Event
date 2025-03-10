import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../axios";

const DeleteTask = () => {
  const navigate = useNavigate();
  const [taskId, setTaskId] = useState("");

  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });
      alert("Task deleted successfully!");
      navigate("/tasks");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Error deleting task!");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Delete Task</h2>
      <input
        type="text"
        placeholder="Enter Task ID"
        value={taskId}
        onChange={(e) => setTaskId(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleDelete} style={styles.button}>
        Delete Task
      </button>
    </div>
  );
};

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
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "background 0.3s",
  },
};

export default DeleteTask;
