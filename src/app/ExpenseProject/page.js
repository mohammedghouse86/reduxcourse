'use client'
import React from 'react';
import ExpenseForm from '../Components/ExpenseForm';
import Link from "next/link";

const page = () => {
  return (
    <div>
      <button style={{margin:'10px', width:'300px'}} className='btn'><Link href="/">Home</Link></button>
      <ExpenseForm/>
    </div>
  )
}

export default page
