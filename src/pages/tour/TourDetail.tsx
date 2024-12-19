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
import { Button, Col, Image, notification, Rate, Row, Tour, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderTour from "./OrderTour";
import CardTourRecom from "@/components/CardTourRecom";
import TourRecommendations from "@/components/layout/TourRecom";

const dataInit: any[] = [
	{
		id: 1,
		title: "Summer Vacation Package",
		description:
			"Enjoy a luxurious vacation with a wide range of activities and services.",
		priceCurrency: "USD",
		startDate: "2024-12-01",
		endDate: "2024-12-14",
		schedule:
			"Day 1: Arrival and Welcome Dinner; Day 2-7: Daily tours and activities; Day 8: Departure",
		imgUrl: null,
		price_aldults: 100000,
		price_children: 50000,
		departure: null,
		destination: null,
		abroad: false,
	},
	{
		id: 2,
		title: "Summer Vacation Package",
		description:
			"Enjoy a luxurious vacation with a wide range of activities and services.",
		priceCurrency: "USD",
		startDate: "2024-12-01",
		endDate: "2024-12-14",
		schedule:
			"Day 1: Arrival and Welcome Dinner; Day 2-7: Daily tours and activities; Day 8: Departure",
		imgUrl: null,
		price_aldults: 100000,
		price_children: 50000,
		departure: null,
		destination: null,
		abroad: false,
	},
	{
		id: 3,
		title: "Summer Vacation Package",
		description:
			"Enjoy a luxurious vacation with a wide range of activities and services.",
		priceCurrency: "USD",
		startDate: "2024-12-01",
		endDate: "2024-12-14",
		schedule:
			"Day 1: Arrival and Welcome Dinner; Day 2-7: Daily tours and activities; Day 8: Departure",
		imgUrl: null,
		price_aldults: 100000,
		price_children: 50000,
		departure: null,
		destination: null,
		abroad: false,
	},
	{
		id: 3,
		title: "Summer Vacation Package",
		description:
			"Enjoy a luxurious vacation with a wide range of activities and services.",
		priceCurrency: "USD",
		startDate: "2024-12-01",
		endDate: "2024-12-14",
		schedule:
			"Day 1: Arrival and Welcome Dinner; Day 2-7: Daily tours and activities; Day 8: Departure",
		imgUrl: null,
		price_aldults: 100000,
		price_children: 50000,
		departure: null,
		destination: null,
		abroad: false,
	},
	{
		id: 3,
		title: "Summer Vacation Package",
		description:
			"Enjoy a luxurious vacation with a wide range of activities and services.",
		priceCurrency: "USD",
		startDate: "2024-12-01",
		endDate: "2024-12-14",
		schedule:
			"Day 1: Arrival and Welcome Dinner; Day 2-7: Daily tours and activities; Day 8: Departure",
		imgUrl: null,
		price_aldults: 100000,
		price_children: 50000,
		departure: null,
		destination: null,
		abroad: false,
	},
	{
		id: 3,
		title: "Summer Vacation Package",
		description:
			"Enjoy a luxurious vacation with a wide range of activities and services.",
		priceCurrency: "USD",
		startDate: "2024-12-01",
		endDate: "2024-12-14",
		schedule:
			"Day 1: Arrival and Welcome Dinner; Day 2-7: Daily tours and activities; Day 8: Departure",
		imgUrl: null,
		price_aldults: 100000,
		price_children: 50000,
		departure: null,
		destination: null,
		abroad: false,
	},
	{
		id: 3,
		title: "Summer Vacation Package",
		description:
			"Enjoy a luxurious vacation with a wide range of activities and services.",
		priceCurrency: "USD",
		startDate: "2024-12-01",
		endDate: "2024-12-14",
		schedule:
			"Day 1: Arrival and Welcome Dinner; Day 2-7: Daily tours and activities; Day 8: Departure",
		imgUrl: null,
		price_aldults: 100000,
		price_children: 50000,
		departure: null,
		destination: null,
		abroad: false,
	},
];

const dataTour = [
	{ label: "Mã tour", value: "17507" },
	{ label: "Thời gian", value: "4 ngày 3 đêm" },
	{
		label: "Khởi hành",
		value: "05,12,19,26/10",
	},
	{ label: "Vận Chuyển", value: "Xe du lịch, Máy bay" },
	{ label: "Xuất phát", value: "Từ Hồ Chí Minh  " },
];

const dataExperience = [
	"Trải nghiệm Kỳ Co – Eo gió với danh xưng “Maldives Việt Nam”.",
	"Hệ thống tháp Chăm độc đáo",
	" Ghềnh Đá Đĩa – tuyệt tác kiến tạo địa chất được thiên nhiên ban tặng.",
	"Thưởng thức nền ẩm thực hương vị biển đặc biệt: Mắt cá ngừ đại dương, bánh canh hẹ, bánh xèo hải sản,",
];
const TourDetail = () => {
	const { id } = useParams();
	const [api, contextHolder] = notification.useNotification();
	const [showOrderTour, setShowOrderTour] = useState(false);
	const { data, callApi } = useCallApi({
		func: async () => {
			if (!id) return;
			return (await getTourDetailService(id)) as any;
		},
	});

	const handleFavorite = async () => {
		try {
			await favoriteTourService(id ?? '');
			api.success({ message: 'Đã thêm vào danh sách yêu thích' })
		} catch (error) {
			console.log({ error })
		}
	}

	const { data: tourByAI, callApi: callApiGetTourByAI } = useCallApi({
		func: getTourByAIService,
	});
	useEffect(() => {
		callApi();
		callApiGetTourByAI()
	}, [id]);

	if (showOrderTour) {
		return <OrderTour tour={data as ITourDetail} />;
	}

	return (
		<Container>
			{contextHolder}
			<div className="flex justify-between items-center">
				<div>
					<Typography.Title level={3}>
						{(data as ITourDetail)?.title}
					</Typography.Title>
					<div className="flex items-center gap-5 mb-5">
						<Rate allowHalf defaultValue={2.5} />
						<p>
							<strong>4.9/5</strong> trong <strong>40</strong> ĐÁNH GIÁ
							<EyeOutlined className="ml-2" /> 1,794
						</p>
					</div>


				</div>
				<Button type="primary" onClick={handleFavorite}>Thêm vào danh sách yêu thích</Button>
			</div>
			<Row>
				<Col xl={18}>
					<Image
						className="rounded-lg"
						preview={false}
						src={(data as ITourDetail)?.imgUrl}
					/>
					<div className="mt-6">
						<Typography.Title level={3}>Điểm nhấn hành trình</Typography.Title>
						<div className="flex flex-col gap-y-4 border-b-2 border-solid border-primary_color pb-4">
							<span className="space-x-3">
								<Typography.Text strong>Hành trình:</Typography.Text>
								<Typography.Text>
									{(data as ITourDetail)?.schedule}
								</Typography.Text>
							</span>
							<span className="space-x-3">
								<Typography.Text strong>Lịch trình:</Typography.Text>
								<Typography.Text>4 ngày 3 đêm</Typography.Text>
							</span>
							<span className="space-x-3">
								<Typography.Text strong>Ngày khởi hành:</Typography.Text>
								<Typography.Text>
									{(data as ITourDetail)?.startDate}
								</Typography.Text>
							</span>
							<span className="space-x-3">
								<Typography.Text strong>Vận chuyển:</Typography.Text>
								<Typography.Text>
									Máy bay khứ hồi & xe du lịch đời mới
								</Typography.Text>
							</span>
						</div>

						<Typography.Paragraph className="mt-8">
							{(data as ITourDetail)?.description}
						</Typography.Paragraph>
					</div>

					<div className="mt-10 p-4">
						<ScheduleTour tour={data as ITourDetail} />
					</div>
				</Col>

				<Col xl={6}>
					<div className="pl-5 flex flex-col gap-y-5">
						<div className="px-6 py-4 border border-solid border-gray-900 rounded-lg">
							<span className="text-sm font-bold text-primary_color leading-6">
								{(data as ITourDetail)?.schedule}
							</span>
							<ul className="mt-5">
								<li className="flex gap-x-3 py-3 px-1 border-t border-solid border-gray-800">
									<strong>Mã tour: </strong>
									<p className="flex-1">{(data as ITourDetail)?.id}</p>
								</li>
								<li className="flex gap-x-3 py-3 px-1 border-t border-solid border-gray-800">
									<strong>Thời gian: </strong>
									<p className="flex-1">4 ngày 3 đêm</p> {/* Bạn có thể thay đổi theo logic nếu cần */}
								</li>
								<li className="flex gap-x-3 py-3 px-1 border-t border-solid border-gray-800">
									<strong>Khởi hành: </strong>
									<p className="flex-1">{(data as ITourDetail)?.startDate}</p>
								</li>
								<li className="flex gap-x-3 py-3 px-1 border-t border-solid border-gray-800">
									<strong>Vận Chuyển: </strong>
									<p className="flex-1">Xe du lịch, Máy bay</p> {/* Cập nhật thêm nếu cần */}
								</li>
								<li className="flex gap-x-3 py-3 px-1 border-t border-solid border-gray-800">
									<strong>Xuất phát: </strong>
									<p className="flex-1">{(data as ITourDetail)?.departure}</p>
								</li>
							</ul>
						</div>


						<div className="bg-primary_color px-1 rounded-md ">
							<div className="text-white space-x-1 px-2 py-4">
								<span className="text-sm">Giá từ: </span>
								<span className="text-xl font-bold">
									{formatPrice(
										(data as ITourDetail)?.price_aldults,
										(data as ITourDetail)?.priceCurrency
									)}
								</span>
							</div>
							<div className="bg-white p-3 flex flex-col gap-y-3 rounded-sm">
								<span>Trải nghiêm: </span>
								<ul className="space-y-2">
									{dataExperience.map((i) => (
										<li key={i} className="flex gap-2">
											<CheckCircleOutlined className="text-green-700" />
											<Typography.Text>{i}</Typography.Text>
										</li>
									))}
								</ul>
							</div>
							<div className="py-5 px-2 space-y-5">
								<Button
									className="w-full h-10"
									type="default"
									onClick={() => setShowOrderTour(true)}
								>
									Đặt tour
								</Button>
							</div>
						</div>
					</div>
				</Col>
			</Row>
			{/* AI tour */}
			<Typography.Title className="mt-3" level={3}>
						Có thể bạn sẽ thích
					</Typography.Title>
			<div className="mt-5">
				<TourRecommendations />
			</div>

			<div className="mt-16">
				<Typography.Title level={3}>Đánh giá</Typography.Title>
				<ReviewTour idTour={id} />
			</div>
		</Container>
	);
};

export default TourDetail;
