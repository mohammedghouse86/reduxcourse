'use client'
import React, {useEffect, useState} from 'react';
//import {getexpense} from '../actions/index';
import {deleteExpense} from '../actions/index';
import Image from 'next/image';
import Trash from '../../../public/Trash.png'
import Edit from '../../../public/edit.png'
import Modal from '../components/EditExpensesModal';
// These are the imports I am using to call the async function
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses } from '../Redux/Slice/expenseSlice'; 
import { addExpenseItem, deleteExpenseItem, updateExpenseItem  } from '../Redux/Slice/expenseSlice'; 

const ExpenseTable = () => {

// Code to call the asyncThunk function
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.items);
  const status = useSelector((state) => state.expenses.status);
  const error = useSelector((state) => state.expenses.error);
  const [data, setData]= useState(null); //data will be stored over here
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchExpenses());
    }
    setData(expenses)
    
  }, [status, dispatch, expenses]);
  //console.log("these are the expenses from the asyncThunk function ==>>", expenses) //success working

  
  
  



  const [isModalOpen, setIsModalOpen] = useState(false);
  const [E_item, setE_item] = useState([]);
  const openModal = (item) => {
    setE_item(item);
    setIsModalOpen(true);
  }
  const closeModal = () => setIsModalOpen(false);
    
    // useEffect( ()=>{
    //     const someFunc = async() =>{
    //         const json = await getexpense(); // dont need this useEffect I'm using AsyncThunk
    //         setData(json);
    //     }
    //     someFunc();        
    // },[])
    //console.log('this is the data ==>>',data);
    const handelDelete = (id) => {
      console.log(id)
      deleteExpense(id);
      dispatch(deleteExpenseItem(id));
      
    }
  return (
    <>
        <table className="min-w-full divide-y divide-gray-200" style={{paddingTop:'70px'}}>
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Cost</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Cost</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        {data && data.map((item, index) => (
            <tr key={index} >
              <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-gray-900">{item.date}</td>
              <td className="px-6 py-4 whitespace-wrap text-sm text-gray-500">{item.category}</td>
              <td className="px-6 py-4 whitespace-wrap text-sm text-gray-500">{item.description}</td>
              <td className="px-6 py-4 whitespace-wrap text-sm text-gray-500">{item.unit}</td>
              <td className="px-6 py-4 whitespace-wrap text-sm text-gray-500">{item.qty}</td>
              <td className="px-6 py-4 whitespace-wrap text-sm text-gray-500">{item.unitcost}</td>
              <td className="px-6 py-4 whitespace-wrap text-sm text-gray-500">{item.totalcost}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                <button onClick={() => openModal(item)} className="flex items-center">
                  <Image src={Edit} width={40} height={30} alt="Edit" style={{ width: '100%', height: 'auto' }} />
                </button>
                <button onClick={() => handelDelete(item._id)} className="flex items-center">
                  <Image src={Trash} width={40} height={30} alt="Delete" style={{ width: '100%', height: 'auto' }} />
                </button>
              </td>
            </tr>))}          
        </tbody>
      </table>
      <Modal isOpen={isModalOpen} onClose={closeModal} item={E_item}>
        <p className="text-gray-700">This is the content inside the modal.</p>
      </Modal>
    </>
  )
}

export default ExpenseTable
