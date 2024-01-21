const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();

// use express.json() to get data into json format
app.use(express.json());

// PORT
const PORT = process.env.PORT_NO || 5500;

//use cors

app.use(cors());

// lets import routes
const TodoItemRoute = require("./routes/todoitemroute");

// Lets connect to mongodb database...
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", TodoItemRoute);

// Add port and connect to server
app.listen(PORT, () => {
  console.log(`server is running at port no ${PORT}`);
});
