import axios from "axios";
import { ITour } from "@/common/types/tour"; // Giả sử bạn có kiểu dữ liệu ITour

interface GetToursResponse {
    data: ITour[]; // Danh sách các tour
    total: number;  // Tổng số tour (dùng để phân trang)
}

export const getToursService1 = async (page: number, size: number): Promise<GetToursResponse> => {
    try {
        // Thay đổi URL này thành URL API thực tế của bạn
        const response = await axios.get("http://localhost:8080/api/tours", {
            params: {
                page: page,
                size: size
            }
        });

        // Trả về dữ liệu tour và tổng số tour (để tính toán phân trang)
        return {
            data: response.data.content, // Danh sách các tour
            total: response.data.totalElements // Tổng số tour
        };
    } catch (error) {
        console.error("Error fetching tours:", error);
        throw new Error("Failed to fetch tours");
    }
};

export const getToursService2 = async (page: number, size: number): Promise<GetToursResponse> => {
    try {
        // Thay đổi URL này thành URL API thực tế của bạn
        const response = await axios.get("http://localhost:8080/api/tours/abroad", {
            params: {
                page: page,
                size: size
            }
        });

        // Trả về dữ liệu tour và tổng số tour (để tính toán phân trang)
        return {
            data: response.data.content, // Danh sách các tour
            total: response.data.totalElements // Tổng số tour
        };
    } catch (error) {
        console.error("Error fetching tours:", error);
        throw new Error("Failed to fetch tours");
    }
};
