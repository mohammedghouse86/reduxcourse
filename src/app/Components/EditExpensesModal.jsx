// components/Modal.js
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { editExpense } from "../actions/index";
import { useDispatch, useSelector } from 'react-redux';
import { updateExpenseItem  } from '../Redux/Slice/expenseSlice'; 

const Modal = ({ isOpen, onClose, children, item }) => {
  const dispatch = useDispatch();
  if (!isOpen) return null;
  //console.log("this is the expense to be edited =", item);
  const [placeholders,setPlaceholders] = useState({
                                                date:new Date(item.date).toISOString().split('T')[0],
                                                category:item.category,
                                                description:item.description,
                                                unit:item.unit,
                                                qty:item.qty,
                                                unitcost:item.unitcost,
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData(e.currentTarget);
      const response = editExpense(formdata,item._id);
      //dispatch(updateExpenseItem(formdata));
      const payload_object = {
        category:formdata.get("category"),
        date:formdata.get("date"),
        qty:formdata.get("qty"),
        totalcost:Number(formdata.get("qty"))*Number(formdata.get("unitcost")),
        unitcost:formdata.get("unitcost"),
        _id:item._id,
        description:formdata.get("description"),
        unit:formdata.get("unit")
      }
      dispatch(updateExpenseItem(payload_object));
      console.log('this is formdata to be edited =', 
        'date = ',formdata.get("date"),
        'category= ',formdata.get("category"),
        'description= ',formdata.get("description"),
        'unit= ',formdata.get("unit"),
        'qty= ',formdata.get("qty"),
        'unitcost= ',formdata.get("unitcost"),
    )
      //if (!!response.error) {
      //}
    } catch (error) {
      console.error(error);
    }
  };

// Handle input changes
const handelChange = (e) => {
    const { name, value } = e.target;
    setPlaceholders((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" ></div>
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-sm w-full" style={{backgroundColor:'black'}}>
          <div className="flex justify-between items-center p-4 border-b" >
            <h3 className="text-lg font-semibold" >Edit Expense</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="p-4" style={{backgroundColor:'black'}}>
            {/*This is the form in the MODAL*/}
            <form onSubmit={handleSubmit} >
          <div className="sm:col-span-3">
            <label
              htmlFor="date"
              className="block text-sm font-medium leading-6 text-white"
            >Date
            </label>
            <div className="mt-2">
            <input
                value={placeholders.date}
                onChange={handelChange}
                type="date"
                name="date"
                id="date"
                autoComplete="date"
                className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={{backgroundColor:'gray'}}/>
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-white"
            >
              Category
            </label>
            <div className="mt-2">
              <select
              onChange={handelChange}
              value={placeholders.category}
                id="category"
                name="category"
                autoComplete="category-name"
                className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                style={{backgroundColor:'gray'}}>
                <option>Groceries</option>
                <option>Fruits</option>
                <option>Vegetables</option>
                <option>School Fee</option>
                <option>Petrol</option>
                <option>Electric Bill</option>
                <option>Internet Bill</option>
                <option>Phone Recharge</option>
                <option>Miscellaneous Expenses</option>
              </select>
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-white"
            >
              Description
            </label>
            <div className="mt-2">
              <input
              onChange={handelChange}
              value={placeholders.description}
                type="text"
                name="description"
                id="description"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={{backgroundColor:'gray'}}/>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-white"
            >
              Unit
            </label>
            <div className="mt-2">
              <select
              onChange={handelChange}
              value={placeholders.unit}
                id="unit"
                name="unit"
                autoComplete="unit-name"
                className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                style={{backgroundColor:'gray'}}>
                <option>Pieces</option>
                <option>KiloGrams</option>
                <option>Grams</option>
                <option>Meters</option>
              </select>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="qty"
              className="block text-sm font-medium leading-6 text-white"
            >
              Quantity
            </label>
            <div className="mt-2">
              <input
              onChange={handelChange}
              value={placeholders.qty}
                type="number"
                name="qty"
                id="qty"
                autoComplete="qty"
                className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={{backgroundColor:'gray'}}/>
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="unit cost"
              className="block text-sm font-medium leading-6 text-white"
            >
              Unit Cost
            </label>
            <div className="mt-2">
              <input
              onChange={handelChange}
              value={placeholders.unitcost}
                type="number"
                name="unitcost"
                id="unitcost"
                autoComplete="unitcost"
                className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={{backgroundColor:'gray'}}/>
            </div>
          </div>

          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </form>




          </div>
          <div className="flex justify-end p-4 border-t">
            <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Close</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
