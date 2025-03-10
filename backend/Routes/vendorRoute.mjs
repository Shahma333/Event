import express from "express";
import { addVendor, deleteVendor, getAllVendors } from "../Controllers/vendorController.mjs";
import { assignVendorToTask } from "../Controllers/taskController.mjs";
import { coordinatorOnly, protect } from "../Middleware/Auth.mjs";
const vendorRouter = express.Router();

vendorRouter.post("/add", protect, coordinatorOnly, addVendor);
vendorRouter.get("/get", protect, getAllVendors);
vendorRouter.put("/assign", protect, coordinatorOnly, assignVendorToTask);
vendorRouter.delete("/:vendorId", protect, coordinatorOnly, deleteVendor);

export default vendorRouter;
