const express = require("express");
const router = express.Router("");
const userModel = require("../models/user");

router.get("/", (req, res, next) => {
  res.send("Get All users");
});

router.post('/', async (req, res) => {
  const data = new userModel(req.body);

  try{
    const dataToSave = await data.save();
    res.status(201).json(dataToSave)
  }
  catch(error){
    res.status(400).json({message: error.message})
  }
});

router.get('/', async (req, res) => {
  try{
    const data = await userModel.find();
    res.json(data)
  }
  catch(error){
    res.status(500).json({message: error.message})
  }
});

router.get('/:id', async (req, res) => {
  try{
    const data = await userModel.findById(req.params.id);
    res.json(data)
  }
    catch(error){
    res.status(500).json({message: error.message})
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    
    const result = await userModel.findByIdAndUpdate(
      id, updatedData, options
    )
    res.send(result)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await userModel.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted..`)
  }
    catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router;
