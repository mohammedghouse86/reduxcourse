'use client';
import React from 'react';
import Link from "next/link";
import './app.css';

const page = () => {
  return (
    <>
    
    <div style={{display:'flex', flexDirection:'column'}}>
      
      <button style={{margin:'10px', width:'300px'}} className='btn'><Link href="/Produce_Imer">Produce function Example</Link></button>
      <button style={{margin:'10px', width:'300px'}} className='btn'><Link href="/ExpenseProject">Expense Project</Link></button>
    </div>
    
    </>
  )
}

export default page
