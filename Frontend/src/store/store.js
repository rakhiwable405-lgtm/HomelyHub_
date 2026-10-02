import { configureStore } from "@reduxjs/toolkit";

import propertySlice from "./property/propertySlice";
import propertyDetailsSlice from "./PropertyDetails/propertyDetails-slice";
import userReducer from "./User/user-slice";
import bookingReducer from "./Booking/booking-slice";
import paymentSlice from "./Payment/payment-slice";
import accomodationSlice from "./Accomodation/Accomodation-slice";

const store = configureStore({
    reducer: {
        properties: propertySlice.reducer,
        propertyDetails: propertyDetailsSlice.reducer,
        user: userReducer,
        booking: bookingReducer,
        accomodation: accomodationSlice.reducer,
        payment: paymentSlice.reducer,
    },
});

export default store;