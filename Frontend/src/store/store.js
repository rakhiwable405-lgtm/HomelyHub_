import { configureStore } from "@reduxjs/toolkit";

import propertySlice from "./property/property-slice";
import propertyDetailsSlice from "./PropertyDetails/propertyDetails-slice";
import userReducer from "./User/user-slice";
import bookingReducer from "./Booking/booking-slice"; // Changed to import default reducer
import paymentSlice from "./Payment/payment-slice";
import accomodationSlice from "./Accomodation/Accomodation-slice";

const store = configureStore({
    reducer: {
        properties: propertySlice.reducer,
        propertyDetails: propertyDetailsSlice.reducer,
        user: userReducer,
        booking: bookingReducer, // Passed directly (matches userReducer pattern)
        accomodation: accomodationSlice.reducer,
        payment: paymentSlice.reducer,
    },
});

export default store;