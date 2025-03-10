import React, { useEffect, useState } from "react";
import { api } from "../axios";
import { Link } from "react-router-dom"; // ✅ Corrected import

const ViewEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get("/events/get");
                setEvents(response.data.events);
            } catch (error) {
                console.log(error);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div style={styles.container}>
            <h2>All Events</h2>
            <ul style={styles.list}>
                {events.length === 0 ? <p>No events found.</p> : events.map((event) => (
                    <li key={event._id} style={styles.item}>
                        <h3>{event.name}</h3>
                        <p><strong>Date:</strong> {event.date}</p>
                        <p><strong>Location:</strong> {event.location}</p>
                       
                        <div>
                            <Link to={`/events/update/${event._id}`} style={styles.updateButton}>✏️ Update</Link>
                            <Link to={`/events/delete/${event._id}`} style={styles.deleteButton}>🗑️ Delete</Link>
                            <Link to={`/events/${event._id}/guests`} style={styles.guestButton}>👥 Manage Guests</Link>
                            <Link to={`/events/${event._id}/tasks`} style={styles.taskButton}>📝 Tasks</Link> 
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "600px",
        margin: "150px auto",
        padding: "20px",
        textAlign: "center"
    },
    list: {
        listStyleType: "none",
        padding: 0
    },
    item: {
        background: "#f8f9fa",
        padding: "15px",
        marginBottom: "10px",
        borderRadius: "5px",
        border: "1px solid #ddd"
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
    guestButton: {
        backgroundColor: "#28a745",
        color: "white",
        padding: "8px 12px",
        textDecoration: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background 0.3s",
        marginLeft: "5px",
    },
    taskButton: {
        backgroundColor: "#ffc107", // Yellow color for distinction
        color: "black",
        padding: "8px 12px",
        textDecoration: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background 0.3s",
        marginLeft: "5px",
    },
    
};

export default ViewEvents;
