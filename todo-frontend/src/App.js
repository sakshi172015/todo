import React, {useState} from 'react'
import TodoList from './components/TodoList'
import './App.css'
import Button from '@mui/material/Button';
import { IoMdAdd } from "react-icons/io";
import CreateTodo from './components/CreateTodo'
import BarChart from './components/BarChart';


export default function App() {
	const [showCreate, setShowCreate] = useState(false)
  const [showChart, setShowChart] = useState(false)
  return (
    <div className='container' style={{display: "flex", flexDirection: "column"}}>
      {
        showChart ? <BarChart /> : null
      }
      <div className='main-container'>
      <Button style={{backgroundColor: "brown", cursor: "pointer", margin: "10px"}} variant="contained" onClick={() => setShowChart(!showChart)}>Show/ Hide Chart</Button>
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
