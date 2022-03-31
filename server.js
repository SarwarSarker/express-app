const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const todoHandler = require("./routeHandler/todoHandler");
const userHandler = require("./routeHandler/userHandler");

const app = express();
dotenv.config();
app.use(express.json());

//database connection with mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/todos")
  .then(() => console.log("Connected successfully"))
  .catch((err) => console.log(err));

//application route
app.use("/todo", todoHandler);
app.use("/user", userHandler);

//default error handler
const errHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

app.use(errHandler);

app.listen(3000, () => {
  console.log("Server Started");
});
