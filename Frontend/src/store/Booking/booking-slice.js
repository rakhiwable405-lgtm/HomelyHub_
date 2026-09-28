import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookings: [],
    bookingDetails: null,
    loading: false,
}

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        setBookingsRequest: (state) => {
            state.loading = true;
        },
        setBookings: (state, action) => {
            state.bookings = action.payload;
            state.loading = false;
        },
        addBooking: (state, action) => {
            state.bookings.push(action.payload);
        },
        setBookingDetails: (state, action) => {
            // Handles both response shapes: { bookings: {...} } or the booking object directly
            state.bookingDetails = action.payload?.bookings ?? action.payload;
        }
    }
});

export const { setBookingsRequest, setBookings, addBooking, setBookingDetails } = bookingSlice.actions;
export default bookingSlice.reducer;