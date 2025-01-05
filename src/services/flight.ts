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
			currency_code: params.currency_code || "VND", // Dùng giá trị từ params hoặc mặc định là VND
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
	currency_code?: string;
}

export const getLitFlightService = async (params: IParamsSearchFlight) => {
	params = filterParams({
		...params,
		currency_code: params.currency_code || "VND", // Đảm bảo currency_code luôn tồn tại
	});

	try {
		return await apiHttp.get<TResListFlight>("/flights/searchFlights", {
			params,
		});
	} catch (error) {
		console.error("Error fetching flight list:", error);
		throw error; // Ném lỗi để hàm gọi bên trên xử lý
	}
};


export const bookingSlightService = (body: any) => {
	const customerId = localStorage.getItem("customerId");
	return axiosCreatesForme.post(`/flights`, { ...body, customerId });
};

export const getListBookingsFlightService = () => {
	return axiosCreatesForme.get(`/flights/bookings`) as any;
};
