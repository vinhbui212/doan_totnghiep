import { useState, useEffect } from "react";
import { Row, Col, Pagination } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import Banner from "../../components/Banner";
import ItemCategory from "@/components/ItemCategory";
import Container from "@/components/layout/components/Container";
import { getToursService } from "@/services/tour";
import { ITour } from "@/common/types/tour";
import CardTour from "@/components/CardTour";
import { getToursService1, getToursService2 } from "./gettour";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const initCategory = [
        { icon: <CalendarOutlined />, label: "Đặt khách sạn trong nước" },
        { icon: <CalendarOutlined />, label: "Đặt khách sạn toàn cầu" },
        
    ];
	const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(12); // Số lượng mục mỗi trang
    const [tours, setTours] = useState<ITour[]>([]);
    const [totalTours, setTotalTours] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

	const [isAbroad, setIsAbroad] = useState(false);  // New state for isAbroad
    
    // Fetch tours based on `isAbroad` state
    const fetchTours = async (isAbroad: boolean, page: number) => {
        try {
            const response = isAbroad 
                ? await getToursService2(page, pageSize)  // Call service for abroad tours
                : await getToursService1(page, pageSize);  // Call service for domestic tours
            
            setTours(response.data);  // Assuming the response has a 'data' field
            setTotalTours(response.total);  // Assuming the response has a 'total' field
        } catch (error) {
            console.error("Failed to fetch tours", error);
        }
    };

    // Effect to load tours when `isAbroad` or `currentPage` changes
    useEffect(() => {
        fetchTours(isAbroad, currentPage);
    }, [isAbroad, currentPage]); 

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        navigate(`/page/${page}`);  // Cập nhật URL khi chuyển trang
    };
	const handleClick1 = () => {
        setIsAbroad(true); // Cập nhật giá trị của isAbroad khi click
    };
	const handleClick2 = () => {
        setIsAbroad(false); // Cập nhật giá trị của isAbroad khi click
    };
    return (
        <Container isLoading={isLoading}>
            <Banner />
            <Row gutter={12} justify="center" className="m-0 mt-10">
               
                <Col  onClick={() => handleClick2()}> {/* Thêm onClick */}
                        <ItemCategory icon={<CalendarOutlined />} label={"Đặt khách sạn trong nước"} />
                    </Col>
					<Col  onClick={() => handleClick1()}> {/* Thêm onClick */}
                        <ItemCategory icon={<CalendarOutlined />} label={"Đặt khách sạn toàn cầu"} />
                    </Col>
            </Row>

            <div className="tour-list mt-3">
                <Row gutter={16}>
                    {tours.map((tour) => (
                        <Col key={tour.id} span={8}>
                            <CardTour tour={tour} />
                        </Col>
                    ))}
                </Row>

                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={totalTours}
                    onChange={handlePageChange}
                    showSizeChanger={false} // Ẩn chức năng thay đổi số lượng bản ghi mỗi trang
                    className="mt-10"
                />
            </div>
        </Container>
    );
};

export default HomePage;
