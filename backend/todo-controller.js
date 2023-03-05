import TodoModel from './TodoModel'

export const getAllTodos = async(req, res, next) => {
    let todos
    try {
        todos = await TodoModel.find()
    } catch(err) {
        return res.status(400).json({
            message: "There was an error",
            data: err
        })
    }
    if(!todos) {
        return res.status(400).json({
            message: "No blogs found",
            data: err
        })
    }
    return res.status(200).json({
        message: "Todos found",
        data: todos
    })
}
export const addTodo = async(req, res, next) => {
    const {title, link, icon, note} = req.body
    let existingTodo
    try {
        existingTodo = await TodoModel.findOne({title})
    } catch(err) {
        return res.status(400).json({
            message: "Error occurred",
            data: err
        })
    }
    if(existingTodo) {
        return res.status(400).json({
            message: "Cannot create todo with same name",
            data: existingTodo
        })
    }
    let todos
    try {
        todos = await TodoModel.find()
    } catch(err) {
        return res.status(400).json({
            message: "Error occurred",
            data: err
        })
    }
    const todo = new TodoModel({
        title, link, icon, note, date: new Date(), status: false, order: todos.length + 1
    })
    try {
        await todo.save()
    } catch(err) {
        return res.status(400).json({
            message: "Error occurred",
            data: err
        })
    }
    return res.status(200).json({
        message: "Todo created",
        data: todo
    })
}
export const updateTodo = async(req, res, next) => {
    const {title, link, icon, note, status} = req.body
    const todoId = req.params.id
    let todo;
    try {
        todo = await TodoModel.findByIdAndUpdate(todoId, {
            title, link, icon, note, date: new Date(), status
        })
    } catch(err) {
        return res.status(400).json({
            message: "Error occurred",
            data: err
        })
    }
    if(!todo) {
        return res.status(400).json({
            message: "Error occurred",
            data: null
        })
    }
    return res.status(200).json({
        message: "Todo updated",
        data: todo
    })
}
export const deleteTodo = async(req, res, next) => {
    const todoId = req.params.id
    let todo;
    try {
        todo = await TodoModel.findByIdAndDelete(todoId)
    } catch(err) {
        return res.status(400).json({
            message: "Error occurred",
            data: err
        })
    }
    if(!todo) {
        return res.status(400).json({
            message: "Error occurred",
            data: null
        })
    }
    return res.status(200).json({
        message: "Todo deleted",
        data: todo
    })
}

export const updateStatus = async(req, res, next) => {
    const {status} = req.body
    const todoId = req.params.id
    let todo;
    try {
        todo = await TodoModel.findByIdAndUpdate(todoId, {
            status
        })
    } catch(err) {
        return res.status(400).json({
            message: "Error occurred",
            data: err
        })
    }
    if(!todo) {
        return res.status(400).json({
            message: "Error occurred",
            data: null
        })
    }
    return res.status(200).json({
        message: "Todo updated",
        data: todo
    })
}

export const changeOrder = async(req, res, next) => {
    const {data} = req.body
    let todo;
    for(let i=0;i<data.length;i++) {
        try {
            todo = await TodoModel.findByIdAndUpdate(data[i]._id, {
                title: data[i].title, 
                link: data[i].link,
                icon: data[i].icon,
                note: data[i].note, 
                date: data[i].date, 
                status: data[i].status,
                order: i
            })
        } catch(err) {
            return res.status(400).json({
                message: "Error occurred",
                data: err
            })
        }
    }
    return res.status(200).json({
        message: "Done",
        data: "Done"
    })
    
}