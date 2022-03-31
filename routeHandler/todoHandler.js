const express = require("express");
const todoSchema = require("../schemas/todoSchema");
const mongoose = require("mongoose");
const checkLogin = require("../middlewares/checkLogin");
const router = express.Router();
const Todo = mongoose.model("Todo", todoSchema);

//Get all todo
router.get("/",checkLogin, async (req, res) => {
  try {
    const data = await Todo.find({ status: "active" });
    res.status(200).json({
      result: data,
      message: "Get all Todo ",
    });
  } catch (error) {
    res.status(500).json({ error: "There is an server error" });
  }
});

//Get todo by id
router.get("/:id", async (req, res) => {
  try {
    const data = await Todo.find({ _id: req.params.id });
    res.status(200).json({
      result: data,
      message: `Success`,
    });
  } catch (error) {
    res.status(500).json({ error: "There is an server error" });
  }
});

//Post todo
router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(200).json({ message: "Todo inserted successfully" });
  } catch (error) {
    res.status(500).json({ error: "There is an server error" });
  }
});

//Post multiple todo
router.post("/all", async (req, res) => {
  try {
    await Todo.insertMany(req.body);
    res.status(200).json({ message: "Todos inserted successfully" });
  } catch (error) {
    res.status(500).json({ error: "There is an server error" });
  }
});

//put todo
router.put("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: "inactive",
        },
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: `Todo updated successfully ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ error: "There is an server error" });
  }
});

//Delete todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: `Todo delete successfully`,
    });
  } catch (error) {
    res.status(500).json({ error: "There is an server error" });
  }
});

module.exports = router;
