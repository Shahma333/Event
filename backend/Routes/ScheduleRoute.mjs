import express from "express";


import { createSchedule, deleteSchedule, getScheduleByEvent, updateSchedule } from "../Controllers/scheduleController.mjs";
import { coordinatorOnly, protect } from "../Middleware/Auth.mjs";

const scheduleRouter = express.Router();

scheduleRouter.post("/", protect, createSchedule);
scheduleRouter.get("/:eventId", protect, getScheduleByEvent);
scheduleRouter.put("/", protect, coordinatorOnly, updateSchedule);
scheduleRouter.delete("/:scheduleId", protect, coordinatorOnly, deleteSchedule);

export default scheduleRouter;
