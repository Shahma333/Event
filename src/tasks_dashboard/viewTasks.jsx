import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Use react-router-dom for Link
import { api } from "../axios";

const ViewTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks/get");
        setTasks(response.data.tasks);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div style={styles.container}>
      <h2>All Tasks</h2>
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul style={styles.list}>
          {tasks.map((task) => (
            <li key={task._id} style={styles.item}>
              <h3>{task.name}</h3>
              <p><strong>Description:</strong> {task.description}</p>
              <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <div>
                <Link to={`/tasks/update/${task._id}`} style={styles.updateButton}>
                  ✏️ Update
                </Link>
                <Link to={`/tasks/delete/${task._id}`} style={styles.deleteButton}>
                  🗑️ Delete
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "150px auto",
    padding: "20px",
    textAlign: "center",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  item: {
    background: "#f8f9fa",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  updateButton: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "8px 12px",
    textDecoration: "none",
    borderRadius: "5px",
    marginRight: "5px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "white",
    padding: "8px 12px",
    textDecoration: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

export default ViewTasks;
