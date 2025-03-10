import express from "express";
import { addGuest, confirmGuest, declineGuest, deleteGuest, getGuestsByEvent, updateGuestStatus } from "../Controllers/guestController.mjs";
import { protect } from "../Middleware/Auth.mjs";


const guestRouter = express.Router();
guestRouter.post("/add", protect, addGuest);
guestRouter.get("/event/:eventId", protect, getGuestsByEvent)

guestRouter.get("/confirm/:guestId", confirmGuest);
guestRouter.get("/decline/:guestId", declineGuest);

// Update guest RSVP status and notify the event host
guestRouter.put("/:guestId", protect, updateGuestStatus);

// Remove a guest and send notification
guestRouter.delete("/:guestId", protect, deleteGuest);

export default guestRouter;
