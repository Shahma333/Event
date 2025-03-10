import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  spent: { type: Number, default: 0 },
});

export const budgetCollection = mongoose.model("budgets", BudgetSchema);
