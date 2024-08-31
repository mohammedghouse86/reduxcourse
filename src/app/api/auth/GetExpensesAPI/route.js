import Expense from '../../../models/expense'; // Your model
import { connectToDB } from '../../../../utils/database'; // Database connection utility

// Define and export the async POST function
export async function GET() {
    try {
        // Connect to the database
        await connectToDB();
        console.log('Connected to DB to get all expenses');

        // Fetch all expenses from the database
        const expenses = await Expense.find();

        // Send the expenses as JSON response
        return new Response(JSON.stringify(expenses), { success: true,status: 201 });
    } catch (error) {
        console.error("Error handling request:", error.message);

        // Send an error response
        return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), { status: 500 });
    }
}


//http://localhost:3000/api/auth/GetExpensesAPI