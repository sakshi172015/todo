import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import todoRouter from './todo-router'

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api', todoRouter)

mongoose
    .connect(
        'mongodb+srv://admin:admin@cluster0.hvmww9j.mongodb.net/?retryWrites=true&w=majority'
    )
    .then(() => app.listen(5000))
    .then(() => console.log("Connected!!"))
    .catch((err) => console.log(err))