import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch expenses from the API
export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async () => {try {
    //console.log('running uploadexpense')
    //console.log('this is formData =',formData.get("description"))
    const response = await fetch(
      `http://localhost:3000/api/auth/GetExpensesAPI`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error);
  }
}
);

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: {
    items: [], // Use 'items' consistently
    status: 'idle',
    error: null
  },
  reducers: {
    addExpenseItem: (state, action) => {
      state.items.push(action.payload); // Use 'items' instead of 'expenses'
    },
    deleteExpenseItem: (state, action) => {
      console.log('Deleting item with _id:', action.payload);
      state.items.forEach((item) => console.log('Checking item:', item._id === action.payload));
      
      state.items = state.items.filter(expense => {
        console.log('Comparing:', expense._id, 'with', action.payload);
        return expense._id !== action.payload;
      });
    
      console.log('Updated items:', state.items);
    },
    
    updateExpenseItem: (state, action) => {
      const index = state.items.findIndex(expense => expense._id === action.payload._id); // Use '_id' or whatever unique identifier you have
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { addExpenseItem, deleteExpenseItem, updateExpenseItem } = expenseSlice.actions;

export default expenseSlice.reducer;
