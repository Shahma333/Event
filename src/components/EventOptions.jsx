import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/eventOptions.css";

const EventOptions = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="event-options-container">
            <h2>Event Management</h2>

            {/* Only users can create events */}
            {user?.role === "user" && (
                <button onClick={() => navigate("/services")}>
                    Create Event
                </button>
            )}

            <button onClick={() => navigate("/events/get")}>
                View All Events
            </button>
        </div>
    );
};

export default EventOptions;
