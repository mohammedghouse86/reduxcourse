'use client';
import React, {useState, useEffect} from 'react';
import { FaTrash } from 'react-icons/fa';
import '/app.css';
import {produce} from 'immer';
const page = () => {
    const [state, setState] = useState({
        todos: [
          { id: 1, text: 'Learn JavaScript', completed: "true" },
          { id: 2, text: 'Learn React', completed: "false" },
        ],
      });
    const [html, setHtml] = useState()
    const [arraylength, setArraylength] = useState(0)
    useEffect(()=>{
      const a1 = Object.entries(state.todos);
      setHtml( a1.map((e,i)=>{
        console.log('this is e[1].id', e[1].id);
        return(
          <tr key={e[0]}>
        <td>{e[1].id}</td>
        <td>{e[1].text}</td>
        <td>{e[1].completed}</td>
        <td><FaTrash color="red" onClick={()=>{handleDelete(e[1].text)}} /></td>
        </tr>
      )}))
      setArraylength(state.todos.length+1);
    },[state])
    const handleDelete = (id) => {
      setState(produce(draft => {
        const index = draft.todos.findIndex(todo => todo.text === id);
        if (index !== -1) {
          draft.todos.splice(index, 1);
        }
      }));
    }
    const submitForm = (e) =>{
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const newTodo = {
        id: arraylength,
        text: data.get('Task'),
        completed: data.get('Status'),
      };
      setState(
        produce(draft => {
          draft.todos.push(newTodo);
        })
      );
    }
  return (
    <>
    <form onSubmit={submitForm} style={{display:'flex', flexDirection:'column', width:'50vw', backgroundColor:'black', color:'yellowgreen'}}>
      <label htmlFor="srNo">Sr.No</label>
      <input type="number" name="SrNo" id="srNo" value={arraylength} readOnly/>

      <label htmlFor="task">Task</label>
      <input type="text" name="Task" id="task" />

      <label htmlFor="status">Status</label>
      <input type="text" name="Status" id="status" />
      <button className='btn' type='submit' style={{width:'150px', display:'flex', justifyContent:'center', alignItems:'center', position: 'relative', left: '35%'}}>Submit</button>
    </form>
    <table>
      <thead>
        <tr>
          <th>Sr.No</th>
          <th>Task</th>
          <th>Status</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
            {html}
      </tbody>    
    </table>      
    </>
  )
}

export default page
