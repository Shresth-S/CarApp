import express from "express";
import { createCar, deleteCar, updateCar, getCar, getCars } from "../controllers/car.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/create', verifyToken, createCar);
router.delete('/delete/:id', verifyToken, deleteCar);
router.post('/update/:id', verifyToken, updateCar);
router.get('/get/:id', getCar);
router.get('/get', getCars);

export default router;