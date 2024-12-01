/* eslint-disable react-hooks/exhaustive-deps */
import Container from "@/components/layout/components/Container";
import TicketItem from "@/components/TicketItem";
import useCallApi from "@/hooks/useCallApi";
import useQueryParams from "@/hooks/useQueryParams";
import { getLitFlightService } from "@/services/flight";
import { Button, Col, Empty, Rate, Row, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import Banner from "../../components/Banner";
import FilterFlight from "./FilterFlight";
import { useEffect } from "react";
const TicketAirline = () => {
	const [form] = useForm();
	const { valuesQuery } = useQueryParams();

	const handleGetFlight = async () => {
		return getLitFlightService(valuesQuery(form.getFieldsValue()));
	};
	const { data, isLoading, callApi } = useCallApi({ func: handleGetFlight });

	useEffect(() => {
		callApi();
	}, []);

	return (
		<Container isLoading={isLoading}>
			<Banner />
			<div className="my-10">
				<Typography.Text strong className="!mb-10 block">
					Tìm kiếm chuyến bay
				</Typography.Text>
				<FilterFlight form={form} handleFilter={callApi} />
			</div>

			{data?.data ? (
				<>
					<div className="mt-20">
						<Typography.Title level={3} className="!mb-0">
							Chuyến bay ưu đãi
						</Typography.Title>
						<Row gutter={[20, 20]} className=" px-5">
							{data?.data?.flightOffers?.map((item) => {
								return item.segments?.map((segment, index) => (
									<Col xs={12} xl={8} key={index}>
										<TicketItem
											from={segment.departureAirport.cityName}
											to={segment.arrivalAirport.cityName}
											token={item.token}
											logo={segment.legs?.[0].carriersData?.[0]?.logo}
											price={
												item.travellerPrices?.[0]?.travellerPriceBreakdown
													?.total?.units +
												item.travellerPrices?.[0]?.travellerPriceBreakdown
													?.total?.nanos /
													1000000000
											}
											currencyCode={
												item.travellerPrices?.[0]?.travellerPriceBreakdown
													?.total?.currencyCode
											}
										/>
									</Col>
								));
							})}
						</Row>
					</div>

					<div className="mt-10">
						<Typography.Title level={3}>Vé máy bay</Typography.Title>
						<div className="flex items-center space-x-3 mb-5">
							<em>Cập nhật ngày: 22/10/2024</em>
							<strong>Đánh giá</strong>
							<Rate allowHalf defaultValue={2.5} />
						</div>
						<Typography.Paragraph>
							<strong>Phòng Vé máy bay công ty Du Lịch Việt</strong> là một
							trong những đại lý được ủy quyền của nhiều hãng hàng không trong
							nước và quốc tế. Quý khách có thể đặt vé máy bay giá rẻ trực tuyến
							đơn giản, an toàn, tiết kiệm ngay tại Website Du Lịch Việt. Đồng
							thời cũng có thể so sánh vé máy bay nội địa, quốc tế trực tiếp từ
							các hãng hàng không đồng thời thường xuyên cập nhật khuyến mãi, ưu
							đãi lớn - Dịch vụ tin cậy, hỗ trợ 24/7.Bạn có thể inbox trực tiếp
							cho chúng tôi qua Fanpage Vé máy bay giá rẻ,hoặc gửi Mail qua địa
							chỉ phongve@dulichviet.com.vn{" "}
						</Typography.Paragraph>

						<div className="flex justify-center mt-10">
							<Button type="primary" className="h-10">
								Liên hệ đặt vé máy bay
							</Button>
						</div>
					</div>
				</>
			) : (
				<Empty />
			)}
		</Container>
	);
};

export default TicketAirline;
