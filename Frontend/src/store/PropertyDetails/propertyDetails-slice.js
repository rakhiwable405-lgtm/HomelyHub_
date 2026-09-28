import {createSlice} from "@reduxjs/toolkit";

const propertyDetailsSlice = createSlice({
    name: "propertyDetails",
    initialState: {
        propertyDetails: null,
        loading: false,
        error: null
    },
    reducers: {
        getPropertyDetailsRequest: (state) => {
            state.loading = true;
        },
        getPropertyDetailsSuccess: (state, action) => {
            state.propertyDetails = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const propertyDetailsAction = propertyDetailsSlice.actions;
export default propertyDetailsSlice;