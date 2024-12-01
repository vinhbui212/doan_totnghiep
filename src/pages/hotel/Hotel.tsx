/* eslint-disable react-hooks/exhaustive-deps */
import { ApiResponse } from "@/common/api";
import { THotelItem } from "@/common/types/hotel";
import Banner from "@/components/Banner";
import CardHotel from "@/components/CardHotel";
import Container from "@/components/layout/components/Container";
import ListScrollHorizontal from "@/components/ListScrollHorizontal";
import useCallApi from "@/hooks/useCallApi";
import { getHotelsService } from "@/services/hotel";
import { EyeOutlined } from "@ant-design/icons";
import { Rate, Typography } from "antd";
import { useEffect } from "react";

const Hotel = () => {
	const { data, callApi, isLoading } = useCallApi<
		ApiResponse<{ hotels: THotelItem[] }>
	>({
		func: getHotelsService,
	});

	useEffect(() => {
		callApi();
	}, []);

	return (
		<Container isLoading={isLoading}>
			<Banner />
			<div className="mt-10 border-b border-solid border-primary_color">
				<Typography.Title level={3}>Khách sạn</Typography.Title>
				<div className="flex space-x-2 items-center">
					<Typography.Text strong>Đánh giá: </Typography.Text>
					<Rate allowHalf defaultValue={2.5} />
					<Typography.Text strong>4.72/5</Typography.Text>
					<Typography.Text>trong</Typography.Text>
					<Typography.Text strong>720</Typography.Text>
					<EyeOutlined />
					<Typography.Text>24,128</Typography.Text>
				</div>

				<div className="mt-3">
					<Typography.Text strong>Đặt phòng khách sạn: </Typography.Text>
					<Typography.Paragraph>
						Tổng hợp hơn 200,000 khách sạn trong nước và quốc tế đang có khuyến
						mãi giá tốt, quý khách có thể dễ dàng tìm kiếm phòng khách sạn cần
						đặt ngay tại website công ty Du Lịch Việt. Bên cạnh việc có thể đặt
						mua được phòng khách sạn giá rẻ trực tuyến đơn giản, an toàn, tiết
						kiệm...quý khách còn có thể tham khảo, so sánh giá phòng khách sạn
						được cập nhật liên tục tại thời điểm quý khách muốn đặt mua.
					</Typography.Paragraph>
				</div>
			</div>

			<div className="mt-10">
				<Typography.Title level={2}>Khách sạn khuyến mãi</Typography.Title>
				<ListScrollHorizontal>
					<div className="flex gap-x-10 h-[245px]">
						{data?.data?.hotels?.map((h) => (
							<CardHotel key={h.hotel_id} hotel={h} />
						))}
					</div>
				</ListScrollHorizontal>
			</div>
		</Container>
	);
};

export default Hotel;
