import { axiosCreatesForme } from "@/api/configApi";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const updateCustomerService = (body: any) => {
	const customerId = localStorage.getItem("customerId");
	return axiosCreatesForme.put(`/customers/update-info?email=${body.email}`, {
		...body,
		customerId,
	});
};

export const getInfoService = async () => {
	// const customerId = 1;
	return (await axiosCreatesForme.get(
		`/customers/info`
	)) as any;
};

export const getOrderService = async () => {
	const customerId = localStorage.getItem("customerId");
	// const customerId = 1;
	return (await axiosCreatesForme.get(
		`/bookings/customer/${customerId}`
	)) as any;
};

export const getFavoriteService = async () => {
	return (await axiosCreatesForme.get(`/wishlist/get`)) as any;
};

export const getAllCustomerService = () => {
	return axiosCreatesForme.get(`/customers/all`) as any;
};
