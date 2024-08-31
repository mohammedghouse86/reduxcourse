import Expense from '../../../models/expense'; // Your model
import { connectToDB } from '../../../../utils/database'; // Database connection utility
import { NextResponse } from 'next/server';

// Define and export the async POST function
export async function POST(req) {
    try {
        // Parse request body
        const { category, description, unit, qty, unitcost, date, id } = await req.json();
        
        // Calculate total cost
        const totalcost = Number(unitcost) * Number(qty);
        console.log('this is req body =', { category, description, unit, qty, unitcost, date, id });

        // Connect to the database
        await connectToDB();
        console.log('Connected to DB');

        // Update expense in the database
        const updatedExpense = await Expense.findByIdAndUpdate(id, {
            date,
            category,
            description,
            unit,
            qty,
            unitcost,
            totalcost
        }, { new: true });

        if (!updatedExpense) {
            // If no expense found
            return NextResponse.json({ success: false, message: 'Expense not found' }, { status: 404 });
        }

        // Send the updated expense as JSON response
        return NextResponse.json({ success: true, updatedExpense }, { status: 201 });
    } catch (error) {
        console.error("Error handling request:", error.message);

        // Send an error response
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}

//http://localhost:3000/api/auth/EditExpenseAPI