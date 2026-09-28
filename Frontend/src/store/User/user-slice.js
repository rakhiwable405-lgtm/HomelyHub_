import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',

    initialState: {
        isAuthenticated: false,
        loading: false,
        user: null,
        error: null,
        success: false,
    },

    reducers: {

        // ==================== SIGNUP ====================

        getSignupRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        getSignupDetails: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },


        // ==================== LOGIN ====================

        getLoginRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        getLoginDetails: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },


        // ==================== ERROR ====================

        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        // ==================== CURRENT USER ====================

        getCurrentRequest: (state) => {
            state.loading = true;
        },

        getCurrentUser: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.isAuthenticated = true;
        },


        // ==================== UPDATE USER ====================

        getUpdateUserRequest: (state) => {
            state.loading = true;
            state.error = null;
        },


        // ==================== LOGOUT ====================

        getLogoutRequest: (state) => {
            state.loading = true;
        },

        getLogoutSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = false;
            state.loading = false;
        },

        getLogout: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = false;
            state.loading = false;
        },


        // ==================== PASSWORD ====================

        getPasswordRequest: (state) => {
            state.loading = true;
            state.success = false;
        },

        getPasswordSuccess: (state, action) => {
            state.loading = false;
            state.success = action.payload;
        },


        // ==================== CLEAR ERROR ====================

        clearError: (state) => {
            state.error = null;
        },
    },
});


// Export actions
export const userActions = userSlice.actions;


// Export reducer
export default userSlice.reducer;