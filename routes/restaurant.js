const express = require("express");
const router = express.Router();
const restaurantModel = require('../models/restaurantModel.js');
const { createRestaurant, findRestaurantsById, findRestaurantsAll } = require("../controllers/restaurant.controller.js");

router.post('/', createRestaurant);

router.get('/restaurants', findRestaurantsAll);

router.get('/restaurants/:id', findRestaurantsById);

router.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    const result = await restaurantModel.findByIdAndUpdate(
      id, updatedData, options
    )
    res.send(result)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})


router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await restaurantModel.findByIdAndDelete(id)
    res.send(`User with ${data.name} name has been deleted.`)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
