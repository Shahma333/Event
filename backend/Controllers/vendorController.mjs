import { vendorCollection } from "../Models/vendorModel.mjs";
import { taskCollection } from "../Models/taskModel.mjs";

// ✅ Add a new vendor (Only Coordinators)
export const addVendor = async (req, res) => {
    try {
        if (req.user.role !== "coordinator") {
            return res.status(403).send({ message: "Only coordinators can add vendors" });
        }

        const { name, serviceType, email ,phone} = req.body;

        // ✅ Fix: Ensure createdBy is included
        const vendor = await vendorCollection.create({
            name,
            serviceType,  // ✅ Fix: Corrected field name
            phone,
            email,
            createdBy: req.user.id,  // ✅ Fix: Set createdBy from authenticated user
        });

        return res.status(201).send({ message: "Vendor added successfully", vendor });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal Server Error" });
    }
};
// ✅ Get all vendors
export const getAllVendors = async (req, res) => {
    try {
        const vendors = await vendorCollection.find();
        return res.status(200).send({ message: "Vendors fetched successfully", vendors });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal Server Error" });
    }
};

// ✅ Assign a vendor to a task (Only Coordinators)
export const assignVendorToTask = async (req, res) => {
    try {
        if (req.user.role !== "coordinator") {
            return res.status(403).send({ message: "Only coordinators can assign vendors to tasks" });
        }

        const { taskId, vendorId } = req.body;

        const task = await taskCollection.findById(taskId);
        if (!task) {
            return res.status(404).send({ message: "Task not found" });
        }

        const vendor = await vendorCollection.findById(vendorId);
        if (!vendor) {
            return res.status(404).send({ message: "Vendor not found" });
        }

        task.vendor = vendorId;
        await task.save();

        return res.status(200).send({ message: "Vendor assigned to task successfully", task });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal Server Error" });
    }
};

// ✅ Delete a vendor (Only Coordinators)
export const deleteVendor = async (req, res) => {
    try {
        if (req.user.role !== "coordinator") {
            return res.status(403).send({ message: "Only coordinators can delete vendors" });
        }

        const { vendorId } = req.params;

        const deletedVendor = await vendorCollection.findByIdAndDelete(vendorId);
        if (!deletedVendor) {
            return res.status(404).send({ message: "Vendor not found" });
        }

        return res.status(200).send({ message: "Vendor deleted successfully" });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal Server Error" });
    }
};
