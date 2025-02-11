import React, { useEffect } from "react";
import api from 'axios'
import { useDispatch, useSelector } from "react-redux";

import EventCard from "../components/EventCard";
import { setEvents } from "../Redux/eventSlice";

const Home = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);

  useEffect(() => {
    api.get("/events")
      .then(response => dispatch(setEvents(response.data)))
      .catch(error => console.error(error));
  }, [dispatch]);

  return (
    <div className="home-container">
      <h1>Upcoming Events</h1>
      <div className="event-list">
        {events.map(event => <EventCard key={event._id} event={event} />)}
      </div>
    </div>
  );
};

export default Home;
