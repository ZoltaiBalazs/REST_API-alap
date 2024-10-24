require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const restaurantRoutes = require("./routes/restaurant");
const { error } = require("console");

mongoose.set("strictQuery", true);
const connString = process.env.DATABASE_URL;

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", (e) => {
  console.log("Connected to database")
});

const app = express();
app.use(express.json())
app.use("/api", restaurantRoutes)

app.listen(8000, () => {
  console.log(`Server started at 8000`);
});

module.exports = app;