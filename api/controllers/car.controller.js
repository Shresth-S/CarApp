import Car from "../models/car.model.js";
import errorHandler from "../utils/error.js";

export const createCar = async (req, res, next) => {
    try {
        console.log("yahanannannan tk aa gye!!");
        const car = await Car.create(req.body);
        console.log("car created successfully!!");
        return res.status(201).json(car);
    } catch (error) {
        next(error);
    }
}

export const deleteCar = async (req, res, next) => {
    const car = await Car.findById(req.params.id);
    if (!car) {
        return next(errorHandler(404, 'Car not found!'));
    }

    if (req.user.id !== car.userRef) {
        return next(errorHandler(401, 'You can only delete your own cars!'));
    }

    try {
        await Car.findByIdAndDelete(req.params.id);
        res.status(200).json('Car has been deleted!');
    } catch (error) {
        next(error);
    }
}

export const updateCar = async (req, res, next) => {
    const car = await Car.findById(req.params.id);
    if (!car) {
        return next(errorHandler(404, 'Car not found!'));
    }

    if (req.user.id !== car.userRef) {
        return next(errorHandler(401, 'You can only update your own cars!'));
    }

    try {
        const updatedCar = await Car.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // if we dont do this we will get previous one only not new one
        );
        res.status(200).json(updatedCar);
    } catch (error) {
        next(error);
    }
}

export const getCar = async (req, res, next) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return next(errorHandler(404, 'Car not found!'));
        }
        res.status(200).json(car);
    }
    catch (error) {
        next(error);
    }
}

export const getCars = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;

        let offer = req.query.offer;
        if (offer === undefined || offer === 'false') {
            offer = { $in: [false, true] }; //show car with and without offers
        }

        let ev = req.query.ev;
        if (ev === undefined || ev === 'false') {
            ev = { $in: [false, true] };
        }

        let type = req.query.type;
        if (type === undefined || type === 'all') {
            type = { $in: ['hatchback', 'suv','sedan'] };
        }

        const searchTerm = req.query.searchTerm || '';

        const sort = req.query.sort || 'createdAt';

        const order = req.query.order || 'desc';

        const cars = await Car.find({
            name: { $regex: searchTerm, $options: 'i' }, //regex searches in words and part of words  and $options:'i' means dont care about lowercase and uppercase
            ev,
            type,
            offer,
        })
            .sort({ [sort]: order })
            .limit(limit)
            .skip(startIndex);

        return res.status(200).json(cars);
    } catch (error) {
        next(error);
    }
}