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

    restaurantModel.findByIdAndUpdate = jest.fn();
});

describe('RestaurantController.patchRestaurant', () => {
    it('should have a patchRestaurant function', () => {
        expect(typeof restaurantController.patchRestaurant).toBe('function');
    });
    it('should call restaurantModel.findByIdAndUpdate with id param', async () => {
        req.params.id = '1';
        req.body = newRestaurant;
        await restaurantController.patchRestaurant(req, res, next);
        expect(restaurantModel.findByIdAndUpdate).toHaveBeenCalledWith('1', newRestaurant, {
            new: true,
            useFindAndModify: false
        });
    });
    it('should return res with json and status 200', async () => {
        req.params.id = '1';
        req.body = newRestaurant;
        restaurantModel.findByIdAndUpdate.mockReturnValue(newRestaurant);
        await restaurantController.patchRestaurant(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
        expect(res.body).toStrictEqual(newRestaurant);
    });
    it('should handel errors', async () => {
        const errorMsg = { messgae: "Error finding" };
        const rejectedPromise = Promise.reject(errorMsg);
        restaurantModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
        await restaurantController.patchRestaurant(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMsg)
    });
    it('should return 404 when item doesnt exist', async () => {
        restaurantModel.findByIdAndUpdate.mockReturnValue(null);
        await restaurantController.patchRestaurant(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });
})