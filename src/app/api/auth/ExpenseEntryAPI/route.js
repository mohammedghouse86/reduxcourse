import Expense from '../../../models/expense'; // API FOR UPLOADING THE EXPENSES
import { connectToDB } from '../../../../utils/database';

export const POST = async (req, res) => {
    const { category, description, unit, qty, unitcost, totalcost, date } = await req.json();

    try {
        await connectToDB();
        console.log('Connected to DB');
        const newUser = await Expense.create({
            date,
            category,
            description,
            unit,
            qty,
            unitcost,
            totalcost
        });
        console.log(newUser)
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.log("Error handling signup:", error.message);
        return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), { status: 500 });
    }
};

//http://localhost:3000/api/auth/ExpenseEntryAPI