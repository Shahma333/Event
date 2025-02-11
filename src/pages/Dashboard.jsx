import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setEvents } from "../Redux/eventSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const events = useSelector((state) => state.events.events);
  const { user, token, isAuthenticated } = useSelector((state) => state.users);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", location: "" });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      fetchEvents();
    }
  }, [isAuthenticated, navigate]);
  console.log("isAuthenticated:", isAuthenticated);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:2020/api/events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setEvents(res.data));
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:2020/api/events",
        newEvent,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(setEvents([...events, res.data]));
      setNewEvent({ title: "", date: "", location: "" });
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:2020/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setEvents(events.filter((event) => event._id !== eventId)));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user?.name}!</h2>
      <h3>Manage Your Events</h3>

      {/* Create Event Form */}
      <form onSubmit={handleCreateEvent} className="event-form">
        <input
          type="text"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          required
        />
        <input
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={newEvent.location}
          onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
          required
        />
        <button type="submit">Create Event</button>
      </form>

      {/* Events List */}
      <div className="event-list">
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          events.map((event) => (
            <div key={event._id} className="event-card">
              <h4>{event.title}</h4>
              <p>Date: {new Date(event.date).toDateString()}</p>
              <p>Location: {event.location}</p>
              <button onClick={() => handleDeleteEvent(event._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
