import express from "express";
import {getAllTodos, addTodo, updateTodo, deleteTodo, updateStatus, changeOrder} from './todo-controller'
const todoRouter = express.Router()

todoRouter.get('/', getAllTodos)
todoRouter.post('/add', addTodo)
todoRouter.put('/update/:id', updateTodo)
todoRouter.delete('/delete/:id', deleteTodo)
todoRouter.put('/updateStatus/:id', updateStatus)
todoRouter.put('/changeOrder', changeOrder)
export default todoRouter