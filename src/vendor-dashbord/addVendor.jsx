import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../axios";

const AddVendor = () => {
  const navigate = useNavigate();
  const [vendorData, setVendorData] = useState({
    name: "",
    serviceType: "", // Changed field name to match backend expectation
    contact: { phone: "" }, // contact is now an object with phone
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "phone") {
      setVendorData((prev) => ({
        ...prev,
        contact: { ...prev.contact, phone: value }, // ✅ Correctly updating the nested object
      }));
    } else {
      setVendorData((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("user_id"); // Assuming user ID is stored in localStorage
  
      const vendorPayload = {
        ...vendorData,
        createdBy: userId,  // ✅ Ensure backend gets createdBy
      };
  
      await api.post("/vendors/add", vendorPayload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });
  
      alert("Vendor added successfully!");
      navigate("/vendors");
    } catch (error) {
      console.error("Error adding vendor:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to add vendor");
    }
  };
  
  return (
    <div style={styles.container}>
      <h2>Add Vendor</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Vendor Name"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="serviceType"
          placeholder="Service Type"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="phone"
          placeholder="Contact Number"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Add Vendor</button>
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

export default AddVendor;
