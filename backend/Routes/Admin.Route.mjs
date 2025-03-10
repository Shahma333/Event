import express from "express";
import { getUsers, getEvents, deleteUser } from "../Controllers/adminController.mjs";
import { adminMiddleware } from "../Middleware/adminAuth.mjs";

const adminRoutes = express.Router();

// Admin routes (Protected by adminMiddleware)
adminRoutes.use(adminMiddleware); // Protect all routes below with admin middleware

adminRoutes.get("/users", getUsers); // Get all users
adminRoutes.get("/events", getEvents); // Get all events
adminRoutes.delete("/users/:userId", deleteUser); // Delete user

export default adminRoutes;
