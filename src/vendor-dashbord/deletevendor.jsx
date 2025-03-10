import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../axios";

const DeleteVendor = () => {
  const navigate = useNavigate();
  const [vendorId, setVendorId] = useState("");

  const handleDelete = async (vendorId) => {
    if (!window.confirm("Are you sure you want to delete this vendor?")) return;
  
    try {
      await api.delete(`/vendors/${vendorId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });
      setVendors(vendors.filter((vendor) => vendor._id !== vendorId));
      alert("Vendor deleted successfully!");
    } catch (error) {
      console.error("Error deleting vendor:", error);
      alert("Failed to delete vendor");
    }
  };
  

  return (
    <div style={styles.container}>
      <h2>Delete Vendor</h2>
      <input
        type="text"
        placeholder="Enter Vendor ID"
        value={vendorId}
        onChange={(e) => setVendorId(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleDelete} style={styles.button}>
        Delete Vendor
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

export default DeleteVendor;
