import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventCard from "../components/EventCard";
import { setEvents } from "../Redux/eventSlice";
import  api  from "axios";



const Home = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
   useEffect(() => {
     api.get("/events")
      .then(response => {
       
        dispatch(setEvents(Array.isArray(response.data) ? response.data : []));
      })
      .catch(error => {
        console.error("API Error:", error);
        dispatch(setEvents([])); // ✅ Prevents crashes
      });
  }, [dispatch]);
  

  return (
    <div className="home-container">
      <h1>Upcoming Events</h1>
      <div className="event-list">
      {events?.length > 0 ? (
  events.map(event => <EventCard key={event._id} event={event} />)
) : (
  <p>No events available</p>
)}

      </div>
    </div>
  );
};

export default Home;
