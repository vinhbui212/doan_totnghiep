/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosCreatesForme } from "@/api/configApi";

export const getToursService = () => {
	return axiosCreatesForme.get("tours" );
};

export const getTourDetailService = async (tourId: string) => {
	return await axiosCreatesForme.get(`tours/${tourId}`);
};

export const orderTourService = async (data: any) => {
	const customerId = localStorage.getItem("customerId");
	return await axiosCreatesForme.post("bookings", { ...data, customerId });
};

import axios from "axios";

export const getAllBookingService = async () => {
	try {
		const response = await axios.get("http://localhost:8080/api/bookings/all");
		console.log("Response data:", response.data); // Kiểm tra dữ liệu trả về
		return response.data;
	} catch (error) {
		console.error("Error fetching bookings:", error);
		throw error;
	}
};


export const getAllTourService = async () => {
	return (await axiosCreatesForme.get("tours")) as any;
};

export const createTourService = (body: any) => {
	return axiosCreatesForme.post("tours/create", { ...body });
};

export const updateTourService = (body: any) => {
	return axiosCreatesForme.put(`tours/${body.id}`, { ...body });
};

export const deleteTourService = (id?: number) => {
	return axiosCreatesForme.delete(`tours/${id}`);
};

export const getReviewTourService = async (id?: string) => {
	return await axiosCreatesForme.get(`review/${id}`);
};

export const addReviewTourService = async (data: any) => {
	const customerId = localStorage.getItem("customerId");
	return await axiosCreatesForme.post(`review`, {
		...data,
		customerId,
		customerName: "",
		hasReviewed: true,
	});
};


export const getTourByAIService = async () => {
	const customerId = localStorage.getItem("customerId");
	return await axiosCreatesForme.post(`review`, {
		// ...data,
		// customerId,
		// customerName: "",
		// hasReviewed: true,
	});
};


export const favoriteTourService = (tourId: string) => {
	return axiosCreatesForme.post(`/wishlist/add?tourID=${tourId}`, );
}