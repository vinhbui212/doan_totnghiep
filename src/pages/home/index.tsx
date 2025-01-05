import { useState, useEffect } from "react";
import { Row, Col, Pagination, Input, Button } from "antd";
import { CalendarOutlined, SearchOutlined } from "@ant-design/icons";
import Banner from "../../components/Banner";
import ItemCategory from "@/components/ItemCategory";
import Container from "@/components/layout/components/Container";
import { getToursService } from "@/services/tour";
import { ITour } from "@/common/types/tour";
import CardTour from "@/components/CardTour";
import { getToursService1, getToursService2 } from "./gettour";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

    const [isAbroad, setIsAbroad] = useState(false); 
    const [departureLocation, setDepartureLocation] = useState("");
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleSearch = async () => {
        setIsLoading(true);
    
        // Kiểm tra và xây dựng URL với giá trị hợp lệ
        const params = new URLSearchParams();
        if (departureLocation) params.append("departureLocation", departureLocation);
        if (destination) params.append("destination", destination);
        if (startDate) params.append("startDate", startDate);
        if (maxPrice) params.append("maxPrice", maxPrice);
    
        const searchUrl = `http://localhost:8080/api/search?${params.toString()}`;
    
        try {
            const response = await axios.get(searchUrl);
            setTours(response.data);
            console.log("Search URL:", searchUrl); // Log URL để kiểm tra
        } catch (error) {
            console.error("Error fetching tours:", error);
        } finally {
            setIsLoading(false);
        }
    };
    

    useEffect(() => {
        if (!departureLocation && !destination && !startDate && !maxPrice) {
            fetchTours(isAbroad, currentPage);
        }
    }, [isAbroad, currentPage]);

    const fetchTours = async (isAbroad: boolean, page: number) => {
        try {
            const response = isAbroad
                ? await getToursService2(page, pageSize) 
                : await getToursService1(page, pageSize); 

            setTours(response.data); 
            setTotalTours(response.total); 
        } catch (error) {
            console.error("Failed to fetch tours", error);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        navigate(`/page/${page}`); // Cập nhật URL khi chuyển trang
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

            {/* Search Bar */}
            <div className="search-bar mt-5 mb-5">
                <Row gutter={16} justify="center">
                    <Col span={6}>
                        <Input
                            placeholder="Điểm khởi hành"
                            value={departureLocation}
                            onChange={(e) => setDepartureLocation(e.target.value)}
                        />
                    </Col>
                    <Col span={6}>
                        <Input
                            placeholder="Điểm đến"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                        />
                    </Col>
                    <Col span={6}>
                        <Input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Col>
                    <Col span={6}>
                        <Input
                            type="number"
                            placeholder="Giá"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row justify="center" className="mt-4">
                    <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
                        Tìm kiếm
                    </Button>
                </Row>
            </div>

            {/* Category Section */}
            <Row gutter={12} justify="center" className="m-0 mt-10">
                <Col onClick={() => handleClick2()}> {/* Thêm onClick */}
                    <ItemCategory icon={<CalendarOutlined />} label={"Đặt khách sạn trong nước"} />
                </Col>
                <Col onClick={() => handleClick1()}> {/* Thêm onClick */}
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
