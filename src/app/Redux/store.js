'use client';
import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './Slice/expenseSlice';

const store = configureStore({
  reducer: {
    expenses: expenseReducer,
  },
});

export default store;


// import productsReducer from './slices/productsSlice'
// import cartReducer from './slices/cartSlice'
// import wishListReducer from './slices/wishListSlice'
// import { configureStore } from '@reduxjs/toolkit'

// export const store = configureStore({
//   reducer: {
//     products: productsReducer,
//     cartItems: cartReducer,
//     wishList: wishListReducer,
//   },
// })