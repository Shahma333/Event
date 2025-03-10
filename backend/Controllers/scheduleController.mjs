import { scheduleCollection } from "../Models/scheduleModel.mjs";
import { eventCollection } from "../Models/eventModel.mjs";

// Create a schedule for an event
export const createSchedule = async (req, res) => {
    try {
        const { eventId, date, time, task, description } = req.body;
        const userId = req.user._id; 

        // Check if event exists
        const event = await eventCollection.findById(eventId);
        if (!event) {
            return res.status(404).send({ message: "Event not found" });
        }

        // Create schedule entry
        const schedule = await scheduleCollection.create({
            eventId,
            date,
            time,
            task,
            description,
            createdBy: userId
        });

        return res.status(201).send({ message: "Schedule created successfully", schedule });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal Server Error" });
    }
};

// Get schedule for an event
export const getScheduleByEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const schedule = await scheduleCollection.find({ eventId });

        if (!schedule.length) {
            return res.status(404).send({ message: "No schedule found for this event" });
        }

        return res.status(200).send({ message: "Schedule fetched successfully", schedule });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal Server Error" });
    }
};

// Update schedule (Only managers or creators can edit)
export const updateSchedule = async (req, res) => {
    try {
        const { scheduleId, date, time, task, description } = req.body;

        const schedule = await scheduleCollection.findById(scheduleId);
        if (!schedule) {
            return res.status(404).send({ message: "Schedule not found" });
        }

        schedule.date = date || schedule.date;
        schedule.time = time || schedule.time;
        schedule.task = task || schedule.task;
        schedule.description = description || schedule.description;

        await schedule.save();
        return res.status(200).send({ message: "Schedule updated successfully", schedule });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal Server Error" });
    }
};

// Delete schedule (Only managers can delete)
export const deleteSchedule = async (req, res) => {
    try {
        const { scheduleId } = req.params;

        const schedule = await scheduleCollection.findById(scheduleId);
        if (!schedule) {
            return res.status(404).send({ message: "Schedule not found" });
        }

        await scheduleCollection.findByIdAndDelete(scheduleId);
        return res.status(200).send({ message: "Schedule deleted successfully" });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal Server Error" });
    }
};
