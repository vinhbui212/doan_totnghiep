/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiHttp, axiosCreatesForme } from "@/api/configApi";
import { TFlightDetail, TResListFlight } from "@/common/types/flight";
import { filterParams } from "@/helper/func";

export const getFlightDetailService = (params: {
	currency_code?: string;
	token?: string;
}) => {
	return apiHttp.get<TFlightDetail>("/flights/getFlightDetails", {
		params: {
			currency_code: "VND",
			token: params.token,
		},
	});
};

export interface IParamsSearchFlight {
	fromId?: string;
	toId?: string;
	departDate?: string;
	returnDate?: string;
	pageNo?: number;
}

export const getLitFlightService = (params: IParamsSearchFlight) => {
	params = filterParams(params);
	return apiHttp.get<TResListFlight>("/flights/searchFlights", {
		params,
	});
};

export const bookingSlightService = (body: any) => {
	const customerId = localStorage.getItem("customerId");
	return axiosCreatesForme.post(`/flights`, { ...body, customerId });
};

export const getListBookingsFlightService = () => {
	return axiosCreatesForme.get(`/flights/bookings`) as any;
};
