import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { api } from "../axios";

const UpdateEvent = () => {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const user = useSelector((state) => state.auth?.user); // ✅ Ensure correct access
    const [eventData, setEventData] = useState({ name: "", date: "", location: "", budget: "" });

    // Debugging logs
    // console.log("User from Redux:", user);
    console.log("User Role:", user?.role);

    if (!user?.role || (user.role !== "admin" && user.role !== "coordinator" && user.role !== "user")) {
        return <h2 style={styles.accessDenied}>Access Denied</h2>;
    }
    
    useEffect(() => {
        if (!eventId) return;

        const fetchEvent = async () => {
            try {
                console.log("Fetching event with ID:", eventId);
                const response = await api.get(`/events/${eventId}`);
                console.log("API Response:", response.data);
                setEventData(response.data.event);
            } catch (error) {
                console.error("Error fetching event details:", error);
                alert("Error fetching event details!");
                navigate("/events/get");
            }
        };
        
        fetchEvent();
    }, [eventId, navigate]);

    const handleChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/events/${eventId}`, eventData);
            alert("Event updated successfully!");
            navigate("/events/get");
        } catch (error) {
            alert("Error updating event!");
        }
    };

    return (
        <div style={styles.container}>
            <h2>Update Event</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={eventData.name || ""} onChange={handleChange} required style={styles.input} />
                <input type="date" name="date" value={eventData.date || ""} onChange={handleChange} required style={styles.input} />
                <input type="text" name="location" value={eventData.location || ""} onChange={handleChange} required style={styles.input} />
                <button type="submit" style={styles.button}>Update Event</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "400px",
        margin: "150px auto",
        padding: "20px",
        textAlign: "center"
    },
    input: {
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px"
    },
    button: {
        width: "100%",
        padding: "10px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px"
    },
    accessDenied: {
        color: "red",
        textAlign: "center",
        marginTop: "20px"
    }
};

export default UpdateEvent;
