//state manger
//alll list of property
//count
//search property
//loading flag
//error

import { createSlice } from "@reduxjs/toolkit";

const propertySlice = createSlice({
    name: "property",
    initialState: {
        properties: [],
        totalPrperties: 0,
        searchParams: {},
        error: null,
        loading: false
    },
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getProperties(state, action) {
            state.properties = action.payload.data;
            state.totalPrperties = action.payload.all_properties;
            state.loading = false;
        },
        updateSearchParams(state, action) {
            state.searchParams = Object.keys(action.payload).length===0?{}:{
                ...state.searchParams, 
                ...action.payload
            }
        },

        getError(state, action) {
            state.error = action.payload;
            state.loading = false;
        }
    }
})

export const propertyaction = propertySlice.actions;
export default propertySlice;