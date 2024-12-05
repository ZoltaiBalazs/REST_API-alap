const restaurantModel = require('../../models/restaurantModel');
const httpMocks = require('node-mocks-http');
const newRestaurant = require('../mock-data/new-restaurant.json');
const restaurantController = require('../../controllers/restaurant.controller'); 

restaurantModel.prototype.save = jest.fn();

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();

    restaurantModel.findByIdAndDelete = jest.fn();
});

describe('RestaurantController.createRestaurant', () => {


    it('should have a deleteRestaurant function', () => {
        expect(typeof restaurantController.deleteRestaurant).toBe('function');
    });

    it('should call restaurantModel.findByIdAndDelete', async () => {
        await restaurantController.deleteRestaurant(req, res, next);
        expect(restaurantModel.findByIdAndDelete).toHaveBeenCalled();
    });

    // it('should return 201 response code', async () => {
    //     restaurantModel.prototype.save.mockReturnValue(newRestaurant);
    //     await restaurantController.createRestaurant(req, res, next);
    //     expect(res.statusCode).toBe(201);
    //     expect(res._isEndCalled()).toBeTruthy();
    // });

    // it('should return json body in response', async () => {
    //     restaurantModel.prototype.save.mockReturnValue(newRestaurant);
    //     await restaurantController.createRestaurant(req, res, next);
    //     expect(res._getJSONData()).toStrictEqual(newRestaurant);
    // });

    it('should handle errors', async () => {
        const errorMessage = { message: 'Error deleting restaurant' };
        const rejectedPromise = Promise.reject(errorMessage);
        restaurantModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
        await restaurantController.deleteRestaurant(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);     
    });
    it('should return 404 when item doesnt exist', async () => {
        restaurantModel.findByIdAndDelete.mockReturnValue(null);
        await restaurantController.deleteRestaurant(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });
});