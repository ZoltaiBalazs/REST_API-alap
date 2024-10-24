const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    "address": {
      "building": {
        "type": "String"
      },
      "coord": {
        "type": [Number]
      },
      "street": {
        "type": "String"
      },
      "zipcode": {
        "type": "String"
      }
    },
    "borough": {
      "type": "String"
    },
    "cuisine": {
      "type": "String"
    },
    "grades": {
      "type": [
        "Mixed"
      ]
    },
    "name": {
      "type": "String"
    },
    "restaurant_id": {
      "type": "String"
    }

});
module.exports = mongoose.model("Restaurant", restaurantSchema);