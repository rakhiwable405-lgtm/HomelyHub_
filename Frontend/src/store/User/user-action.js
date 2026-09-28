import { userActions } from './user-slice';
import { axiosInstance } from '../../utils/axios';

// ==================== SIGNUP ====================
export const getSignup = (user) => async (dispatch) => {
    try {
        dispatch(userActions.getSignupRequest());
        const { data } = await axiosInstance.post('/v1/user/signup', user);
        dispatch(userActions.getSignupDetails(data.user));
    } catch (error) {
        dispatch(userActions.getError(error.response?.data?.message || 'Signup failed'));
    }
};

// ==================== LOGIN ====================
export const getLogin = (user) => async (dispatch) => {
    try {
        dispatch(userActions.getLoginRequest());
        const { data } = await axiosInstance.post('/v1/user/login', user);
        dispatch(userActions.getLoginDetails(data.user));
    } catch (error) {
        dispatch(userActions.getError(error.response?.data?.message || 'Login failed'));
    }
};

// ==================== CURRENT USER ====================
export const getCurrentUser = () => async (dispatch) => {
    try {
        dispatch(userActions.getCurrentRequest());
        const { data } = await axiosInstance.get('/v1/user/me');
        dispatch(userActions.getCurrentUser(data.user));
    } catch (error) {
        dispatch(userActions.getLogout(null));
    }
};

// ==================== UPDATE USER ====================
export const updateUser = (updateUser) => async (dispatch) => {
    try {
        dispatch(userActions.getUpdateUserRequest());
        await axiosInstance.patch('/v1/user/updateMe', updateUser);
        const { data } = await axiosInstance.get('/v1/user/me');
        dispatch(userActions.getCurrentUser(data.user));
    } catch (error) {
        dispatch(userActions.getError(error.response?.data?.message || 'Update user failed'));
    }
};

// ==================== FORGOT PASSWORD ====================
export const forgotPassword = (email) => async (dispatch) => {
    try {
        await axiosInstance.post('/v1/user/forgotPassword', email);
    } catch (error) {
        dispatch(userActions.getError(error.response?.data?.message || 'Forgot password failed'));
    }
};

// ==================== RESET PASSWORD ====================
export const resetPassword = (token, password) => async (dispatch) => {
    try {
        await axiosInstance.patch(`/v1/user/resetPassword/${token}`, password);
    } catch (error) {
        dispatch(userActions.getError(error.response?.data?.message || 'Reset password failed'));
    }
};

// ==================== UPDATE PASSWORD ====================
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch(userActions.getPasswordRequest());
        await axiosInstance.patch('/v1/user/updateMyPassword', passwords);
        dispatch(userActions.getPasswordSuccess(true));
    } catch (error) {
        dispatch(userActions.getError(error.response?.data?.message || 'Update password failed'));
    }
};

// ==================== LOGOUT ====================
export const logout = () => async (dispatch) => {
    try {
        await axiosInstance.get('/v1/user/logout');
        dispatch(userActions.getLogout(null));
    } catch (error) {
        dispatch(userActions.getError(error.response?.data?.message || 'Logout failed'));
    }
};