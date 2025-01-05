/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITourDetail } from "@/common/types/tour";
import CardTourRecom from "@/components/CardTourRecom"; // Import CardTourRecom component
import Container from "@/components/layout/components/Container";
import { Spin, Row, Col, notification } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

const getToursDetails = async (tourIds: number[]) => {
  try {
    const response = await axios.post("http://localhost:8080/api/tours/tours", tourIds);
    const tours = response.data;

    // Sắp xếp lại các tour theo thứ tự của tourIds
    const sortedTours = tourIds.map((id) => tours.find((tour: any) => tour.id === id));
    return sortedTours;
  } catch (error) {
    console.error("Error fetching tour details:", error);
    throw error;
  }
};


const TourRecommendations = () => {
  const [recommendedTours, setRecommendedTours] = useState<any[]>([]); // State to store recommended tours
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchRecommendedTours = async () => {
      const customerId = localStorage.getItem("customerId"); // Get customerId from localStorage
      if (!customerId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:5000/recommend?customer_id=${customerId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch recommended tours from primary link.");
        }

        const data = await response.json();
        const tourIds = data.recommended_tours; // Extract tour IDs
        console.log("Recommended tour IDs:", tourIds);

        try {
          const tours = await getToursDetails(tourIds);
          setRecommendedTours(tours);
        } catch (detailError) {
          console.error("Error fetching detailed tour information:", detailError);
          // Fallback to top-rated tours if fetching details fails
          const fallbackResponse = await fetch(`http://localhost:8080/api/tours/top-rated`);
          if (!fallbackResponse.ok) {
            throw new Error("Failed to fetch fallback tours.");
          }

          const fallbackData = await fallbackResponse.json();
          setRecommendedTours(fallbackData);
        }
      } catch (primaryError) {
        console.error("Primary API failed. Switching to fallback:", primaryError);
        // Fallback to top-rated tours
        try {
          const fallbackResponse = await fetch(`http://localhost:8080/api/tours/top-rated`);
          if (!fallbackResponse.ok) {
            throw new Error("Failed to fetch fallback tours.");
          }

          const fallbackData = await fallbackResponse.json();
          setRecommendedTours(fallbackData);
        } catch (fallbackError) {
          console.error("Fallback API also failed:", fallbackError);
          setError("Failed to fetch recommended tours.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedTours();
  }, []);

  // Render loading spinner if still loading
  if (loading) return <Spin size="large" style={{ display: "block", margin: "50px auto" }} />;

  // Render error message if an error occurred
  if (error) return <div style={{ textAlign: "center", color: "red", margin: "50px" }}>{error}</div>;

  // Render recommended tours
  return (
    <Container>
    
      <div
        style={{
          display: "flex",
          overflowX: "auto", // Enable horizontal scrolling
          padding: "10px 0",
          gap: "16px", // Add spacing between cards
        }}
      >
        <Row gutter={[16, 16]} wrap={false}>
          {recommendedTours.map((tour: any) => (
            <Col
              key={tour.id}
              style={{ flex: "0 0 auto" }} // Prevent shrinking, ensure consistent spacing
            >
              <CardTourRecom tour={tour} />
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default TourRecommendations;
