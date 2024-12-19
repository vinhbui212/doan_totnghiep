/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiHttp, axiosCreatesForme } from "@/api/configApi";
import { IImagesHotel, THotelDetail, THotelItem } from "@/common/types/hotel";

export const getHotelsService = () => {
	return apiHttp.get<{ hotels: THotelItem[] }>("/hotels/searchHotels", {
		params: {
			dest_id: "-3714993",
			search_type: "CITY",
			arrival_date: "2024-12-30",
			departure_date: "2024-12-31",
			currency_code: "VND",
		},
	});
};

export const getHotelDetailService = (params: { id: number }) => {
	return apiHttp.get<THotelDetail>("/hotels/getHotelDetails", {
		params: {
			hotel_id: params.id,
			arrival_date: "2024-12-30",
			departure_date: "2024-12-31",
		},
	});
};

export const getImageHotelService = (params: { id: number }) => {
	return apiHttp.get<IImagesHotel[]>("/hotels/getHotelPhotos", {
		params: {
			hotel_id: params.id,
		},
	});
};

export const bookingHotelService = (body: any) => {
	const customerId = localStorage.getItem("customerId");
	return axiosCreatesForme.post(`/hotels`, { ...body, customerId });
};

export const getListBookingsHotelService = () => {
	return axiosCreatesForme.get(`/hotels/bookings`) as any;
};
