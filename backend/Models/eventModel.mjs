import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // The user who created the event
      required: true,
    },
    
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tasks", // Tasks associated with the event
      },
    ],
    vendors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vendors", // Vendors assigned to the event
      },
    ],
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming",
    },
  },
  {
    timestamps: true,
  }
);

export const eventCollection = mongoose.model("events", EventSchema);
