import Expense from '../../../models/expense'; // Your model
import { connectToDB } from '../../../../utils/database'; // Database connection utility
import { NextResponse } from 'next/server';

// Define and export the async POST function
export async function DELETE(req) {
    try {
        console.log('this is req body =',req);
        const { id } = await req.json();
        // Connect to the database
        await connectToDB();
        console.log('Connected to DB to get all expenses');

        // Fetch all expenses from the database
        const expenses = await Expense.findByIdAndDelete(id);

        if (!expenses) {
            // If no expense found
            return NextResponse.json({ success: false, message: 'Expense not found' }, { status: 404 });
        }

        // Send the expenses as JSON response
        return NextResponse.json({ success: true, status:201,expenses });
    } catch (error) {
        console.error("Error handling request:", error.message);

        // Send an error response
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}


//http://localhost:3000/api/auth/DeleteExpenseAPI