import { budgetCollection } from "../Models/budgetModel.mjs";
import { eventCollection } from "../Models/eventModel.mjs";

// Add an expense to an event
export const addExpense = async (req, res) => {
    try {
        const { eventId, category, amount, description } = req.body;
        const userId = req.user._id; // User who adds the expense

        // Check if the event exists
        const event = await eventCollection.findById(eventId);
        if (!event) {
            return res.status(404).send({ message: "Event not found" });
        }

        // Create a new expense entry
        const expense = await budgetCollection.create({
            eventId,
            category,
            amount,
            description,
            createdBy: userId
        });

        return res.status(201).send({ message: "Expense added successfully", expense });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal Server Error" });
    }
};

// Get all expenses for an event
export const getExpensesByEvent = async (req, res) => {
    try {
        const { eventId } = req.params;

        const expenses = await budgetCollection.find({ eventId });
        if (!expenses.length) {
            return res.status(404).send({ message: "No expenses found for this event" });
        }

        return res.status(200).send({ message: "Expenses fetched successfully", expenses });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal Server Error" });
    }
};

// Update an expense
export const updateExpense = async (req, res) => {
    try {
        const { expenseId } = req.params;
        const { category, amount, description } = req.body;

        const updatedExpense = await budgetCollection.findByIdAndUpdate(
            expenseId,
            { category, amount, description },
            { new: true }
        );

        if (!updatedExpense) {
            return res.status(404).send({ message: "Expense not found" });
        }

        return res.status(200).send({ message: "Expense updated successfully", updatedExpense });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal Server Error" });
    }
};

// Delete an expense
export const deleteExpense = async (req, res) => {
    try {
        const { expenseId } = req.params;

        const deletedExpense = await budgetCollection.findByIdAndDelete(expenseId);
        if (!deletedExpense) {
            return res.status(404).send({ message: "Expense not found" });
        }

        return res.status(200).send({ message: "Expense deleted successfully" });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal Server Error" });
    }
};

// Get total spent and remaining budget for an event
export const getBudgetSummary = async (req, res) => {
    try {
        const { eventId } = req.params;

        const event = await eventCollection.findById(eventId);
        if (!event) {
            return res.status(404).send({ message: "Event not found" });
        }

        const expenses = await budgetCollection.find({ eventId });
        const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const remainingBudget = event.budget - totalSpent;

        return res.status(200).send({ 
            message: "Budget summary fetched successfully", 
            totalSpent, 
            remainingBudget 
        });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal Server Error" });
    }
};
