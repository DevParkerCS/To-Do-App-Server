const express = require("express");
const mongoose = require("mongoose");
const { Todo } = require("./Todo");
require('dotenv').config()
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    // Expect-CT is deprecated and should be removed
    res.removeHeader("Expect-CT");
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/todo/create", async (req, res) => {
    try {
        const todo = await Todo.create({ title: req.body.title })

        return res.json({ newTodo: { ...todo.toJSON(), id: todo.id } }).end();
    } catch (err) {
        return res.status(500).json({ msg: err }).end()
    }
})

app.put("/todo/update", async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.body.id, { $set: { isCompleted: req.body.isCompleted } })

        // console.log(todo)
        if (!updatedTodo) {
            return res.status(404).json({ msg: "Unable to find user" }).end();
        }

        return res.json({}).end()
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: err }).end()
    }
})

app.get("/todo/all", async (req, res) => {
    try {
        const todos = (await Todo.find()).map(t => ({ ...t.toJSON(), id: t.id }));

        return res.json({ todos }).end();
    } catch (err) {
        return res.json({ msg: err }).status(500).end();
    }
})

mongoose.connect(process.env.MONGO_DB_URI, {})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
