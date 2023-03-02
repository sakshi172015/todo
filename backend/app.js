import express from 'express'
import mongoose from 'mongoose'
import todoRouter from './todo-router'

const app = express()

app.use(express.json())

app.use('/api', todoRouter)

mongoose
    .connect(
        'mongodb+srv://admin:admin@cluster0.hvmww9j.mongodb.net/?retryWrites=true&w=majority'
    )
    .then(() => app.listen(5000))
    .then(() => console.log("Connected!!"))
    .catch((err) => console.log(err))