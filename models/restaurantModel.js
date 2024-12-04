const mongoose = require("mongoose");

const restSchema = new mongoose.Schema({
  borough: String,
  cuisine: String,  
  name: String,
  restaurant_id: String  
});
module.exports = mongoose.model("Restaurant", restSchema);
