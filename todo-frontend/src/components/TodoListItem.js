import React, {useState} from 'react'
import '../styling/TodoList.css'
import {Checkbox} from '@mui/material'
import {FiEdit2} from 'react-icons/fi'
import {MdDelete} from 'react-icons/md'
import DeleteTodo from './DeleteTodo'
import {changeStatus} from '../requests'
import EditTodo from './EditTodo'


export default function TodoList({todo}) {
  const [checked, setChecked] = useState(todo.status)
  const [showDelete, setShowDelete] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const handleChange = async(e) => {
      const response = await changeStatus(!checked, todo._id)
      if(response.status === 200) {
         setChecked(!checked)
      }
  }
  return (
    <div className='todo-list'>
        <div className='todo-subcontainer' style={{justifyContent: "space-between"}}>
            <div className='todo-subcontainer'>
              <Checkbox
                  checked={checked}
                  onChange={(e) => handleChange(e)}
              />
              <img 
                  alt={"icon"}
                  className="todo-icon"
                  src={todo.icon} 
              />
            <h4 style={{textDecoration: checked ? "line-through" : "none"}}>{todo.title}</h4>
            </div>
          <div className='icon-container'>
            <FiEdit2 style={{margin: '5px'}} onClick={() => setShowEdit(true)}/>
            <MdDelete style={{margin: '5px'}} onClick={() => setShowDelete(true)}/>
          </div>
        </div>
        <div className='todo-subcontainer-2' style={{fontSize: "small", marginTop: "-30px", marginBottom: "-5px"}}>
            <span>{todo.date.toString().substring(0,25)}</span>
        </div>
        <div className='todo-subcontainer-2'>
            <span>{todo.note}</span>
        </div>
        {
          showDelete ? 
          <DeleteTodo showDelete={showDelete} setShowDelete={setShowDelete} id={todo._id}/>
          : null
        }
        {
          showEdit ? 
          <EditTodo showEdit={showEdit} setShowEdit={setShowEdit} todo={todo}/>
          : null
        }
    </div>
  )
}
