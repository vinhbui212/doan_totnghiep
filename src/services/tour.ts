/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosCreatesForme } from "@/api/configApi";

export const getToursService = () => {
	return axiosCreatesForme.get("tours", { params: { page: 0, size: 100 } });
};

export const getTourDetailService = async (tourId: string) => {
	return await axiosCreatesForme.get(`tours/${tourId}`);
};

export const orderTourService = async (data: any) => {
	const customerId = localStorage.getItem("customerId");
	return await axiosCreatesForme.post("bookings", { ...data, customerId });
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
