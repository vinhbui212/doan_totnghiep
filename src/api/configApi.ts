/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/common/api";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosCreates = axios.create({
	baseURL: "https://booking-com15.p.rapidapi.com/api/v1/",
	params: { languagecode: "vi" },
	headers: {
		"x-rapidapi-host": "booking-com15.p.rapidapi.com",
		"x-rapidapi-key": "b0b8b540d2msh39100a94580eaa3p116a5fjsn542064396a75",
	},
});

const axiosCreatesForme = axios.create({
	baseURL: "https://backendptit.azurewebsites.net/api/",
});

axiosCreatesForme.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

axiosCreatesForme.interceptors.response.use((response: AxiosResponse) => {
	return response.data ?? response;
});
const apiHttp = {
	get: async <T>(
		url: string,
		params?: AxiosRequestConfig
	): Promise<ApiResponse<T>> => {
		const response: AxiosResponse<ApiResponse<T>> = await axiosCreates.get(
			url,
			{ ...params }
		);
		if (response.status === 200) {
			return response.data;
		} else {
			throw new Error(response.data?.message || "Đã xảy ra lỗi!");
		}
	},
	post: async <T>(
		url: string,
		body?: Record<string, any>,
		config?: AxiosRequestConfig
	): Promise<ApiResponse<T>> => {
		try {
			const response: AxiosResponse<ApiResponse<T>> = await axiosCreates.post(
				url,
				body,
				config
			);
			if (response.status === 200) {
				return response.data;
			}
			throw new Error(response.data?.message || "Đã xảy ra lỗi!");
		} catch (error: any) {
			throw new Error(error.response?.data?.message || "Lỗi kết nối!");
		}
	},
};

export { apiHttp, axiosCreatesForme };
