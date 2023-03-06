import React, {useState} from 'react'
import TodoList from './components/TodoList'
import './App.css'
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import { GrAdd } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import CreateTodo from './components/CreateTodo'

export default function App() {
	const [showCreate, setShowCreate] = useState(false)
  return (
    <div className='container'>
      <div className='main-container'>
        <div className='header-container'>
          <h2>Todo List</h2>
          <div className='create-container' onClick={() => setShowCreate(true)}>
				<IoMdAdd style={{ color: "white", fontSize: "1.5em", cursor: "pointer"}}/>
		  </div>
        </div>
        <TodoList />
      </div>
	  {
          showCreate ? 
          <CreateTodo showCreate={showCreate} setShowCreate={setShowCreate} />
          : null
        }
    </div>
  )
}
