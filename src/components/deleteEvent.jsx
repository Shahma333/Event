import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../axios";
import toast from "react-hot-toast";


const DeleteEvent = () => {
    const { eventId } = useParams();  // ✅ Get eventId from the URL
    const navigate = useNavigate();

    useEffect(() => {
        if (eventId) {
            const handleDelete = async () => {
                try {
                    console.log("Event ID before deleting:", eventId);
                    await api.delete(`/events/${eventId}`,);
                    
                    toast.success("event deleted successfully")
                    navigate("/events/get");  // ✅ Redirect after deletion
                } catch (error) {
                    console.error("Error deleting event:", error);
                   
                }
            };
    
            handleDelete();
        }
    }, [eventId, navigate]); // ✅ Added navigate as a dependency
    

    return (
        <div style={styles.container}>
            <h2>Deleting Event...</h2>
        </div>
    );
};

// 🔹 Simple Styles
const styles = {
    container: {
        textAlign: "center",
        marginTop: "150px",
    },
};

export default DeleteEvent;
