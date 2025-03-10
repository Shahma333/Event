import express from "express";


import {  assignVendorToTask, createTask, deleteTask, getTasksByEvent, updateTaskStatus } from "../Controllers/taskController.mjs";
import { coordinatorOnly, protect } from "../Middleware/Auth.mjs";

const taskRouter = express.Router();

// User creates tasks
taskRouter.post("/create", coordinatorOnly,createTask);



taskRouter.put("/assignvendor/:taskId", protect, coordinatorOnly, assignVendorToTask);

// Manager updates task status
taskRouter.put("/update/:taskId", protect, coordinatorOnly, updateTaskStatus);

// Get all tasks for an event
taskRouter.get("/event/:eventId", protect, getTasksByEvent);


// Delete a task (Only manager)
taskRouter.delete("/:taskId", protect, coordinatorOnly,deleteTask);

export default taskRouter;
