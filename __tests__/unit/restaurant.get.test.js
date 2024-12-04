const restaurantModel = require('../../models/restaurantModel');
const httpMocks = require('node-mocks-http');
const newRestaurant = require('../mock-data/new-restaurant.json');
const allRestaurants = require('../mock-data/all-restaurants.json');
const restaurantController = require('../../controllers/restaurant.controller'); 
const request = require('supertest');
const app = require('../../index');
const { default: mongoose } = require('mongoose');

restaurantModel.prototype.save = jest.fn();

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();

    restaurantModel.create = jest.fn();
    restaurantModel.find = jest.fn();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('RestaurantController.findRestaurantsAll', () => {
    it('should have findRestaurantsAll function', async () => {
        expect(typeof restaurantController.findRestaurantsAll).toBe('function');
    });
    it('should call restaurantModel.find({})', async () => {
        await restaurantController.findRestaurantsAll(req, res, next);
        expect(restaurantModel.find).toHaveBeenCalledWith({});
    });
    it('should return status code 200 with a list of all restaurants', async () => {
        restaurantModel.find.mockReturnValue(allRestaurants);
        await restaurantController.findRestaurantsAll(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allRestaurants);
    });
    it('should handel errors', async () => {
        const errorMsg = { messgae: "Error finding" };
        const rejectedPromise = Promise.reject(errorMsg);
        restaurantModel.find.mockReturnValue(rejectedPromise);
        await restaurantController.findRestaurantsAll(req, res, next);
        expect(next).toBeCalledWith(errorMsg)
    });
});

describe('RestaurantController.findRestaurantsById', () => {
    it('should have a findRestaurantsById function', async () => {
        expect(typeof restaurantController.findRestaurantsById).toBe('function');
    });
});