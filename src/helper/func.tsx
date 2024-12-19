/* eslint-disable @typescript-eslint/no-explicit-any */
import { IndexObject } from "@/common/types/common";
import dayjs from "dayjs";

export const formatPrice = (price?: number, currency?: string) => {
	return new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: currency ?? "VND",
	}).format(price ?? 0);
};

export const formatDate = (value?: string, type?: string) => {
	return dayjs(value).format(type ?? "DD/MM/YYYY");
};

export const filterParams = (params: IndexObject) => {
	return Object.fromEntries(Object.entries(params).filter((ob) => !!ob[1]));
};

export const handleAuthSuccess = (res: any) => {
	localStorage.setItem("token", res.token);
	localStorage.setItem("customerId", res.customerId);
	localStorage.setItem("customerName", res.customerName);
};
