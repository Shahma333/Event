import { taskCollection } from "../Models/taskModel.mjs";
import { userCollection } from "../Models/userModel.mjs";
import { vendorCollection } from "../Models/vendorModel.mjs";


export const createTask = async (req, res) => {
    try {
        const { eventId, name, description, deadline } = req.body;
        const userId = req.user._id; // User creating the task

        const task = await taskCollection.create({
            eventId,
            name,
            description,
            deadline,
            createdBy: userId, // Store user ID who created it
            status: "pending",
            assignedTo: null // Not assigned initially
        });

        return res.status(201).json({ message: "Task created successfully", task });
    } catch (err) {
        return res.status(500).json({ message: err.message || "Internal Server Error" });
    }
};


/** 🔍 Assign a vendor to a task 
 *  - Only coordinators can assign a vendor to a task.
 */
export const assignVendorToTask = async (req, res) => {
    try {
        if (req.user.role !== "coordinator") {
            return res.status(403).json({ message: "Only coordinators can assign vendors to tasks" });
        }

        const { taskId, vendorId } = req.body;

        const task = await taskCollection.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const vendor = await vendorCollection.findById(vendorId);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        task.vendor = vendorId;
        await task.save();

        return res.status(200).json({ message: "Vendor assigned to task successfully", task });
    } catch (err) {
        return res.status(500).json({ message: err.message || "Internal Server Error" });
    }
};

/** 🔍 Get all tasks for an event */
export const getTasksByEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const tasks = await taskCollection.find({ eventId })
            .populate("assignedTo")
            .populate("vendor");

        if (!tasks.length) {
            return res.status(404).json({ message: "No tasks found for this event" });
        }

        return res.status(200).json({ message: "Tasks fetched successfully", tasks });
    } catch (err) {
        return res.status(500).json({ message: err.message || "Internal Server Error" });
    }
};

/** ✏️ Update task status 
 *  - Only the user assigned to the task or a coordinator can update its status.
 */
export const updateTaskStatus = async (req, res) => {
    try {
        const { taskId, status } = req.body;
        const userId = req.user._id;

        const task = await taskCollection.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Allow update if the user is either the one assigned or a coordinator
        if (task.assignedTo && task.assignedTo.toString() !== userId.toString() && req.user.role !== "coordinator") {
            return res.status(403).json({ message: "Not authorized to update this task" });
        }

        task.status = status;
        await task.save();

        return res.status(200).json({ message: "Task status updated successfully", task });
    } catch (err) {
        return res.status(500).json({ message: err.message || "Internal Server Error" });
    }
};

/** ❌ Delete a task 
 *  - Only coordinators can delete tasks.
 */
export const deleteTask = async (req, res) => {
    try {
        // Restrict deletion to coordinators
        if (req.user.role !== "coordinator") {
            return res.status(403).json({ message: "Only coordinators can delete tasks" });
        }

        const { taskId } = req.params;

        const task = await taskCollection.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        await taskCollection.findByIdAndDelete(taskId);

        return res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message || "Internal Server Error" });
    }
};

export default {
    createTask,
    assignVendorToTask,
    getTasksByEvent,
    updateTaskStatus,
    deleteTask,
};
