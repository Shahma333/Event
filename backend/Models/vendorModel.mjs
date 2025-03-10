import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
      enum: ["catering", "photography", "decorations", "music", "venue", "transportation", "other"],
    },
    phone: {
      type: String,
      required: true, // ✅ Ensure this is required
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    assignedTasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tasks",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const vendorCollection = mongoose.model("vendors", VendorSchema);
