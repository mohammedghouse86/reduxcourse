import React from 'react';
import Link from "next/link";
import '/app.css';
const page = () => {
  return (
    <div>
      HI THIS IS THE HOME PAGE
      <button className='btn'><Link href="/Produce_Imer">Produce function Example</Link></button>
    </div>
  )
}

export default page
