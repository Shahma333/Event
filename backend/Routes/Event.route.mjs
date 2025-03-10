import express from "express";
import { createEvent, deleteEvent, getAllEvents, getEventById, updateEvent } from "../Controllers/eventController.mjs";
import { protect, authorize } from "../Middleware/Auth.mjs";  // ✅ Import authorize middleware

const eventRouter = express.Router();

eventRouter.post("/create", protect, authorize(["user"]), createEvent);
eventRouter.put("/:eventId", protect, authorize(["user"]), updateEvent);
eventRouter.delete("/:eventId", protect, authorize(["user"]), deleteEvent);

// ✅ Users get only their events, but Admins/Coordinators get all
eventRouter.get("/get", protect, getAllEvents);
eventRouter.get("/:eventId", protect, getEventById);

export default eventRouter;
