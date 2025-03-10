import React from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate for programmatic navigation
import "../styles/hero.css";
import bg from "../assets/bg.png";

const HeroSection = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        const isAuthenticated = localStorage.getItem("access_token"); // Check if the user is logged in
        if (isAuthenticated) {
            navigate("/events"); // Redirect to Events page if logged in
        } else {
            navigate("/login"); // Redirect to Login page if not logged in
        }
    };

    return (
        <section className="hero">
            <img src={bg} alt="Event Banner" />
            <div className="item">
                <h3>Plan Your Event</h3>
                <div>
                    <h1>Make Every Event Special</h1>
                    <p>Manage, organize, and enjoy stress-free events with ease!</p>
                    <button onClick={handleGetStarted} className="hero-button">GET STARTED</button>
                </div>
            </div>
            <div className="hero-paragraph">
                <p>
                    <b>Welcome to <strong>Smart Event Organizer</strong>, where planning your dream event becomes a breeze.
                    Whether it's a wedding, corporate event, or private gathering, we make every occasion memorable.</b>
                </p>
            </div>
        </section>
    );
};

export default HeroSection;
