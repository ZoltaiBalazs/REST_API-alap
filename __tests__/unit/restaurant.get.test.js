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
    restaurantModel.findById = jest.fn();
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
    it('Should call restaurantModel.findById with route params', async () => {
        req.params.id = '1';
        await restaurantController.findRestaurantsById(req, res, next);
        expect(restaurantModel.findById).toBeCalledWith('1');
    });
    it('Should return status code 200 with restaurant', async () => {
        restaurantModel.findById.mockReturnValue(allRestaurants[0]);
        await restaurantController.findRestaurantsAll(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allRestaurants[0]);
    });
    it('should handel errors', async () => {
        const errorMsg = { messgae: "Error finding" };
        const rejectedPromise = Promise.reject(errorMsg);
        restaurantModel.findById.mockReturnValue(rejectedPromise);
        await restaurantController.findRestaurantsById(req, res, next);
        expect(next).toBeCalledWith(errorMsg)
    });
});