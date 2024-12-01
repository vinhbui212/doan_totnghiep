/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosCreatesForme } from "@/api/configApi";

export const paymentSubmitOrderService = (id?: string) => {
	return axiosCreatesForme.get(`/payment/submitOrder?id=${id}`) as any;
};

export const paymentGetAllService = () => {
	return axiosCreatesForme.get(`/payment/all`) as any;
};
