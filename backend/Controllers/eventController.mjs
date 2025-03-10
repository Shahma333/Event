import { eventCollection } from "../Models/eventModel.mjs";

/** ✅ Create a new event (Only Users) */
export const createEvent = async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({ message: "Only users can create events" });
    }

    const { name, date, location} = req.body; // ❌ Removed budget
    const createdBy = req.user._id;

    const event = await eventCollection.create({ name, date, location, createdBy });

    return res.status(201).json({ message: "Event created successfully", event });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Internal server error" });
  }
};


/** 🔍 Get all events */
export const getAllEvents = async (req, res) => {
  try {
    let events;
    if (req.user.role === "user") {
      // Users can only get their own events
      events = await eventCollection.find({ createdBy: req.user._id });
    } else {
      // Admins & Coordinators can get all events
      events = await eventCollection.find();
    }

    if (!events.length) {
      return res.status(404).json({ message: "No events found" });
    }

    return res.status(200).json({ message: "Events retrieved successfully", events });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Internal server error" });
  }
};

/** 🔍 Get a single event by ID */
export const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;
    let event;

    if (req.user.role === "user") {
      event = await eventCollection.findOne({ _id: eventId, createdBy: req.user._id });
    } else {
      event = await eventCollection.findById(eventId); // Admins & Coordinators can view any event
    }

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json({ message: "Event retrieved successfully", event });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Internal server error" });
  }
};

/** ✏️ Update an event (Only Event Creator) */
export const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const updateFields = req.body;

    const event = await eventCollection.findOneAndUpdate(
      { _id: eventId, createdBy: req.user._id }, // Only event creator can update
      { $set: updateFields },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found or unauthorized" });
    }

    return res.status(200).json({ message: "Event updated successfully", event });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Internal server error" });
  }
};

/** ❌ Delete an event (Only Event Creator) */
export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await eventCollection.findOneAndDelete({ _id: eventId, createdBy: req.user._id });

    if (!event) {
      return res.status(404).json({ message: "Event not found or unauthorized" });
    }

    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Internal server error" });
  }
};
