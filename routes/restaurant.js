const express = require("express");
const restaurantRouter = express.Router("");
const restaurantModel = require("../models/restaurantModel");

restaurantRouter.post('/', async (req, res) => {
  const data = new restaurantModel(req.body);

  try{
    const dataToSave = await data.save();
    res.status(201).json(dataToSave)
  }
  catch(error){
    res.status(400).json({message: error.message})
  }
});

restaurantRouter.get('/', async (req, res) => {
  try{
    const data = await restaurantModel.find();
    res.json(data)
  }
  catch(error){
    res.status(500).json({message: error.message})
  }
});

restaurantRouter.get('/:id', async (req, res) => {
  try{
    const data = await restaurantModel.findById(req.params.id);
    res.json(data)
  }
    catch(error){
    res.status(500).json({message: error.message})
  }
});

restaurantRouter.patch('/:id', async (req, res) => {
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

restaurantRouter.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await restaurantModel.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted..`)
  }
    catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = restaurantRouter;