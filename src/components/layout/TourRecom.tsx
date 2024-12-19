/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITourDetail } from "@/common/types/tour";
import CardTour from "@/components/CardTour";
import Container from "@/components/layout/components/Container";
import ListScrollHorizontal from "@/components/ListScrollHorizontal";
import ReviewTour from "@/components/RevewTour";
import ScheduleTour from "@/components/ScheduleTour";
import { formatPrice } from "@/helper/func";
import useCallApi from "@/hooks/useCallApi";
import { favoriteTourService, getTourByAIService, getTourDetailService } from "@/services/tour";
import { CheckCircleOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Col, Image, notification, Rate, Row, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderTour from "./OrderTour";
import CardTourRecom from "@/components/CardTourRecom"; // Import CardTourRecom component
import axios from "axios";

// Hàm lấy chi tiết các tour từ API
const getToursDetails = async (tourIds: number[]) => {
  try {
    const response = await axios.post("http://localhost:8080/api/tours/tours", tourIds);
    return response.data; // Trả về dữ liệu các tour
  } catch (error) {
    console.error("Error fetching tour details:", error);
    throw error;
  }
};

const TourRecommendations = () => {
  const [recommendedTours, setRecommendedTours] = useState<any[]>([]); // State để lưu trữ danh sách tour
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const customerId = localStorage.getItem("customerId"); // Lấy customerId từ localStorage
    if (!customerId) {
      setError("Customer ID not found in localStorage.");
      setLoading(false);
      return;
    }

    // Bước 1: Gọi API để lấy danh sách tourId
    fetch(`http://127.0.0.1:5000/recommend?customer_id=${customerId}`)
      .then((response) => response.json())
      .then(async (data) => {
        const tourIds = data.recommended_tours; // Lấy danh sách tourId từ phản hồi
        console.log("Recommended tour IDs:", tourIds);

        // Bước 2: Gửi danh sách tourIds đến API backend trong một request duy nhất
        try {
          const tours = await getToursDetails(tourIds);
          setRecommendedTours(tours); // Cập nhật dữ liệu tour vào state
          setLoading(false);
        } catch (error) {
          setError("Failed to fetch tour details.");
          setLoading(false);
        }
      })
      .catch((err) => {
        setError("Failed to fetch recommended tours.");
        setLoading(false);
      });
  }, []);

  if (loading) return <Spin size="large" />; // Hiển thị loading nếu đang tải
  if (error) return <div>{error}</div>; // Hiển thị lỗi nếu có

  return (
    <Container>
    {/* Hiển thị các tour đề xuất dưới dạng scrollable list */}
    <div
      style={{
        display: "flex",
        overflowX: "auto", // Kích hoạt cuộn ngang
        padding: "10px 0",
      }}
    >
      <Row gutter={[16, 16]} style={{ flex: "0 0 auto" }}>
        {recommendedTours.map((tour: any) => (
          <Col
            span={8}
            key={tour.id}
            style={{ flex: "0 0 auto", marginRight: "16px" }} // Tạo không gian giữa các item
          >
            <CardTourRecom tour={tour} /> {/* Hiển thị CardTourRecom cho mỗi tour */}
          </Col>
        ))}
      </Row>
    </div>
  </Container>
  );
};

export default TourRecommendations;
