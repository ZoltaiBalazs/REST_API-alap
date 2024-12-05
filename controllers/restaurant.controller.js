const restaurantModel = require('../models/restaurantModel');

exports.createRestaurant = async (req, res, next) => {
    try {
        const newRestaurant = new restaurantModel(req.body);
        const savedRestaurant = await newRestaurant.save();
        res.status(201).json(savedRestaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.findRestaurantsAll = async (req, res, next) => {
    try {
        const data = await restaurantModel.find({});
        res.status(200).json(data);
      }
      catch (error) {
        next(error)
      }
};

exports.findRestaurantsById = async (req, res, next) => {
    try {
        const data = await restaurantModel.findById(req.params.id);
        if (data) {
          res.status(200).json(data);          
        }
        else {
          res.status(404).send();
        }
      }
      catch (error) {
        next(error);
      }
};