import express from "express";
const bookingRouter = express.Router();

import { getBookingsDetails, getUserBookings, createOrder, verifyPayment } from '../controllers/bookingController.js';

import { protect } from "../controllers/authController.js";

bookingRouter.get("/", protect, getUserBookings);
bookingRouter.get("/:bookingId", getBookingsDetails);
bookingRouter.post("/create-order", protect, createOrder);
bookingRouter.post("/verify-payment", protect, verifyPayment);

export { bookingRouter };