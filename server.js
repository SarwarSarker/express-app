const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routeHandler/todoHandler");

const app = express();
app.use(express.json());

//database connection with mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/todos")
  .then(() => console.log("Connected successfully"))
  .catch((err) => console.log(err));

//application route
app.use("/todo", todoHandler);
//default error handler
function errHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

app.listen(3000, () => {
  console.log("Server Started");
});
