import React, {useState, useEffect} from 'react'
import {getAllTodos} from '../requests'
import TodoListItem from './TodoListItem'
import { Divider } from '@mui/material'
export default function TodoList() {
    const [todos, setTodos] = useState([])
    useEffect(() => {
      getData()
      setTodos([todos])
    }, [])
    
    const getData = async() => {
        const data = await getAllTodos()
        setTodos(data.data)
    }
    return (
        <div>
            {
                todos.map((todo, index) => {
                    return(
                        <><TodoListItem todo={todo} key={index}/>
                        <Divider sx={{marginLeft: '5%', marginRight: '5%'}}/>
                        </>
                    )
                })
            }
        </div>
  )
}
