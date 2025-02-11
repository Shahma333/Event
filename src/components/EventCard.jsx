import React from "react";


const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h2>{event.name}</h2>
      <p>{new Date(event.date).toLocaleDateString()}</p>
      <p>Location: {event.location}</p>
    </div>
  );
};

export default EventCard;
