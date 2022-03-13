const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user-routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(router);

//SL2ILzqvQkS6VTnt

mongoose
  .connect(
    "mongodb+srv://admin:SL2ILzqvQkS6VTnt@cluster0.usysm.mongodb.net/mernLogin?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
    console.log("Database Connected! Listening to PORT 5000");
  })
  .catch((err) => console.log(err));
