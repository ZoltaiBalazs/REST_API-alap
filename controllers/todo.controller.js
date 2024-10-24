const restaurantModel = require('../models/restaurant');

exports.createRestaurant = async (req, res, next) => {
    const data = new restaurantModel(req.body);
    try {
        const dataToSave = await data.save();
        res.status(201).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
