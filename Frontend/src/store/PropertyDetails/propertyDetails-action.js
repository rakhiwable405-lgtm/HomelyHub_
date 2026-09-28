import { propertyDetailsAction } from "./propertyDetails-slice";
import { axiosInstance } from "../../utils/axios";

export const getPropertyDetails = (id) => async (dispatch) => {
    try {
        dispatch(propertyDetailsAction.getPropertyDetailsRequest());

        const response = await axiosInstance.get(`/v1/rent/listing/${id}`);

        dispatch(propertyDetailsAction.getPropertyDetailsSuccess(response.data.data));
    } catch (error) {
        dispatch(propertyDetailsAction.getError(error.message));
        console.log(error);
    }
};