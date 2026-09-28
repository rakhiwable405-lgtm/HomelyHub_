import { propertyaction } from "./property-slice";
import { axiosInstance } from "../../utils/axios";

export const getAllProperties = () => async (dispatchEvent, getState) => {
    try {
        console.log("API call started");

        dispatchEvent(propertyaction.getRequest());

        const { searchParams } = getState().properties;

        console.log(searchParams);

        const response = await axiosInstance.get("/v1/rent/listing", {
            params: { ...searchParams }
        });

        if (!response) {
            throw new Error("No response from server");
        }

        const { data } = response;
        console.log(data);

        dispatchEvent(propertyaction.getProperties({
            data: data.data,
            all_properties: data.no_of_responses
        }));

    } catch (error) {
        dispatchEvent(propertyaction.getError(error.message));
    }
}