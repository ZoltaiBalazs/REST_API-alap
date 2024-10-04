const mongoose = require("mongoose");
const { type } = require("os");

const userSchema = new mongoose.Schema({
  borough: String,
  cuisine: String,  
  name: String,
  restaurant_id: String  
});
module.exports = mongoose.model("Restaurant", userSchema);
