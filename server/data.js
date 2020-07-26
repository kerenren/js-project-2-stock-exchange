const mongoose = require("mongoose");
require("dotenv/config");

//Import app
const router = require("./index");

//connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to DB!")
);
