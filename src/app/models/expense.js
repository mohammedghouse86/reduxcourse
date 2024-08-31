import { Schema, model, models } from 'mongoose';

const ExpenseSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  unitcost: {
    type: Number,
    required: true
  },
  totalcost: {
    type: Number,
    required: true
  }
});
const Expense = models.Expense || model("Expense", ExpenseSchema);

export default Expense;