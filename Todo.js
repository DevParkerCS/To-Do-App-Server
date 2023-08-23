const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
    {
        title: {
            type: String
        },
        isCompleted: {
            type: Boolean,
            default: false
        }
    }
)

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = { Todo }