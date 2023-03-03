import mongoose from "mongoose";

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: false
    },
    icon: {
        type: String,
        required: false
    },
    note: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: false
    }
})

export default mongoose.model("Todo", todoSchema)