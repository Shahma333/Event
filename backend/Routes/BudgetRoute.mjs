import express from "express";

import { addExpense, deleteExpense, getBudgetSummary, getExpensesByEvent, updateExpense } from "../Controllers/budgetController.mjs";
import { protect } from "../Middleware/Auth.mjs";


const budgetRouter = express.Router();

// Add an expense to an event
budgetRouter.post("/", protect, addExpense);

// Get all expenses for a specific event
budgetRouter.get("/:eventId", protect, getExpensesByEvent);

// Update an expense
budgetRouter.put("/:expenseId", protect, updateExpense);

// Delete an expense
budgetRouter.delete("/:expenseId", protect, deleteExpense);

// Get total spent and remaining budget for an event
budgetRouter.get("/summary/:eventId", protect, getBudgetSummary);

export default budgetRouter;
