const express = require("express");
const router = express.Router();
const restaurantModel = require('../models/restaurant.js');

router.post('/', async (req, res) => {
  const data = new restaurantModel(req.body);
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.get('/restaurants', async (req, res) => {
  try {
    const data = await restaurantModel.find();
    console.log(res.json(data));
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.get('/restaurants/:id', async (req, res) => {
  try {
    const data = await restaurantModel.findById(req.params.id);
    console.log(res.json(data));
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

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
