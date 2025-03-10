import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../axios";

const AssignVendorToTask = () => {
  const navigate = useNavigate();
  const [assignmentData, setAssignmentData] = useState({
    taskId: "",
    vendorId: "",
  });

  const handleChange = (e) => {
    setAssignmentData({ ...assignmentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/tasks/assign-vendor", assignmentData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });
      alert("Vendor assigned to task successfully!");
      navigate("/tasks");
    } catch (error) {
      console.error("Error assigning vendor:", error);
      alert("Error assigning vendor! " + (error.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <div style={styles.container}>
      <h2>Assign Vendor to Task</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="taskId"
          placeholder="Task ID"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="vendorId"
          placeholder="Vendor ID"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Assign Vendor
        </button>
      </form>
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
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "background 0.3s",
  },
};

export default AssignVendorToTask;
