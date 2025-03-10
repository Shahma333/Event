import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { api } from "../axios";
import mongoose from "mongoose";

const CreateEvent = () => {
    const navigate = useNavigate();
    const location = useLocation(); // ✅ Get passed state
    const eventName = location.state?.eventName || "";
    const { eventId } = useParams(); //  Get event ID from URL params
 

    const [eventData, setEventData] = useState({
        name: eventName,
        date: "",
        location: "",
        tasks: "",
    });

    useEffect(() => {
        if (eventId) {
            fetchEventName(eventId);
        }
    }, [eventId]);

    // 🔹 Fetch the event name based on the clicked ID
    const fetchEventName = async (id) => {
        try {
            const response = await api.get(`/events/${id}`);
            setEventData((prev) => ({ ...prev, name: response.data.name }));
        } catch (error) {
            console.error("Error fetching event name:", error);
        }
    };

    const handleChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

 // ✅ Import to check valid ObjectId

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem("token"); // Get the token

        // ✅ Convert tasks from a string to an array
        const taskArray = eventData.tasks.split(",").map(task => task.trim());

        // ✅ Ensure tasks contain only valid MongoDB ObjectIds
        const validTasks = taskArray.filter(task => mongoose.Types.ObjectId.isValid(task));

        // ✅ Update eventData with valid tasks
        const updatedEventData = { ...eventData, tasks: validTasks };

        await api.post("/events/create", updatedEventData, {
            headers: { Authorization: `Bearer ${token}` },
        });

        alert("Event created successfully!");
        navigate("/events/get");
    } catch (error) {
        console.error(error);
        alert("Error creating event! " + (error.response?.data?.message || "Unknown error"));
    }
};

    

    return (
        <div className="create-event-container">
            <h2>Create Event</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={eventData.name} onChange={handleChange} required />
                <input type="date" name="date" onChange={handleChange} required />
                <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

// 🔹 Inline CSS
const styles = `
.create-event-container {
    max-width: 400px;
    margin: 100px auto;
    padding: 20px;
    text-align: center;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.create-event-container h2 {
    margin-bottom: 15px;
}
.create-event-container input,
.create-event-container textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
.create-event-container textarea {
    height: 80px;
    resize: none;
}
.create-event-container button {
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    cursor: pointer;
    transition: background 0.3s;
    border-radius: 5px;
}
.create-event-container button:hover {
    background-color: #218838;
}
`;
document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);

export default CreateEvent;
