const express = require("express");
const router = express.Router();
const { createRestaurant, findRestaurantsById, findRestaurantsAll, patchRestaurant, deleteRestaurant } = require("../controllers/restaurant.controller.js");

router.post('/', createRestaurant);

router.get('/restaurants', findRestaurantsAll);

router.get('/restaurants/:id', findRestaurantsById);

router.patch('/:id', patchRestaurant);

router.delete("/:id", deleteRestaurant);

module.exports = router;
