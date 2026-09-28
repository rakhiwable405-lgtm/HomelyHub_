import { Property } from "../models/propertyModel.js";
import { Booking } from "../models/bookingModels.js";

// create order
const createOrder = async (req, res) => {
    const { amount, propertyId, fromDate, toDate, guests } = req.body;
    const orderId = "order_" + Date.now();
    res.json({
        success: true,
        message: "Order created Successfully",
        orderId,
        amount,
        propertyId,
        fromDate,
        toDate,
        guests
    });
};

// verify payment
const verifyPayment = async (req, res) => {
    try {
        const { orderId, bookingDetails, forceStatus } = req.body;
        if (forceStatus === "success") {
            const paymentId = "pay_" + Date.now();
            const newBooking = await Booking.create({
                user: req.user._id,
                property: bookingDetails.propertyId,
                price: bookingDetails.price,
                fromDate: bookingDetails.fromDate,
                toDate: bookingDetails.toDate,
                guests: bookingDetails.guests,
                numberOfnights: bookingDetails.numberOfnights,
                paid: true
            });
            await Property.findByIdAndUpdate(
                bookingDetails.propertyId,
                {
                    $push: {
                        currentBooking: {
                            bookingId: newBooking._id,
                            fromDate: bookingDetails.fromDate,
                            toDate: bookingDetails.toDate,
                            userId: req.user._id
                        }
                    }
                },
                { new: true }
            );
            res.json({
                success: true,
                message: "Payment successful, booking confirmed!!",
                paymentId,
                orderId,
                booking: newBooking
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Payment failed!",
                orderId
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};

// get my bookings
const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id });
        res.status(200).json({
            status: "success",
            data: { bookings }
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};

// get one booking details
const getBookingsDetails = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.bookingId);
        res.status(200).json({
            status: "success",
            data: { booking }
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};

export { getBookingsDetails, getUserBookings, verifyPayment, createOrder };