import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        property: {
            type: mongoose.Schema.ObjectId,
            ref: "Property",
            required: [true, "Booking must belong to a Property"]
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: [true, "Booking must belong to a user"]
        },
        price: {
            type: Number,
            required: [true, "Booking must have price"]
        },
        paid: {
            type: Boolean,
            default: true
        },
        fromDate: {
            type: Date,
        },
        toDate: {
            type: Date,
        },
        guests: {
            type: Number
        },
        numberOfnights: {
            type: Number
        }
    },
    { timestamps: true }
);

bookingSchema.pre(/^find/, function (next) {
    this.populate([
        { path: "user", select: "name email phoneNumber avatar" },
        { path: "property", select: "maximumGuest images propertyName address" }
    ]);
    next();
});

const Booking = mongoose.model("Booking", bookingSchema);
export { Booking };