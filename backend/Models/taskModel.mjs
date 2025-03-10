import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events", // Reference to the events collection
      required: true,
    },
    name: {
      type: String,
      required: [true, "Task name is required"],
    },
    description: {
      type: String,
    },
    deadline: {
      type: Date,
      required: [true, "Deadline is required"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Reference to the user who created the task
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Reference to the team member assigned (or null if unassigned)
      default: null,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendors", // Reference to the vendor assigned to the task (or null if unassigned)
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const taskCollection = mongoose.model("tasks", TaskSchema);
