import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api'

export const getAllTodos = async() => {
    const todos = await axios.get(BASE_URL + '/')
    return todos.data
}

export const createTodo = async(title, link, icon, note) => {
    const response = await axios.post(BASE_URL + '/add', {
        title,
        link,
        icon,
        note
    })
    return response
}

export const editTodo = async(id, title, link, icon, note, status) => {
    const response = await axios.put(BASE_URL + '/update/' + id, {
        title, 
        link, 
        icon, 
        note, 
        status
    })
    return response
}

export const deleteTodo = async(id) => {
    const response = await axios.delete(BASE_URL + '/delete/' + id)
    console.log(response)
    return response 
}

export const changeStatus = async(status, id) => {
    const response = await axios.put(BASE_URL + '/updateStatus/' + id, {
        status
    })
    return response
}

export const changeOrder = async(data) => {
    const response = await axios.put(BASE_URL + '/changeOrder', {
        data
    })
    return response
}