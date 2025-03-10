import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  tasks: [
    {
      name: String,
      startTime: String,
      endTime: String,
      status: {
        type: String,
        enum: ["pending", "ongoing", "completed"],
        default: "pending",
      },
    },
  ],
});

export const scheduleCollection = mongoose.model("schedules", ScheduleSchema);
