/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITourDetail } from "@/common/types/tour";
import CardTour from "@/components/CardTour";
import Container from "@/components/layout/components/Container";
import ListScrollHorizontal from "@/components/ListScrollHorizontal";
import ReviewTour from "@/components/RevewTour";
import ScheduleTour from "@/components/ScheduleTour";
import { formatPrice } from "@/helper/func";
import useCallApi from "@/hooks/useCallApi";
import { getTourDetailService } from "@/services/tour";
import { CheckCircleOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Col, Image, Rate, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderTour from "./OrderTour";

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
	const [showOrderTour, setShowOrderTour] = useState(false);

	const { data, callApi } = useCallApi({
		func: async () => {
			if (!id) return;
			return (await getTourDetailService(id)) as any;
		},
	});

	useEffect(() => {
		callApi();
	}, [id]);

	if (showOrderTour) {
		return <OrderTour tour={data as ITourDetail} />;
	}

	return (
		<Container>
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
			<Row>
				<Col xl={18}>
					<Image
						className="rounded-lg"
						preview={false}
						src="https://dulichviet.com.vn/images/bandidau/NOI-DIA/Quy-Nhon/du-lich-quy-nhon-eo-gio-du-lich-viet.jpg"
					/>
					<div className="mt-6">
						<Typography.Title level={3}>Điểm nhấn hành trình</Typography.Title>
						<div className="flex flex-col gap-y-4 border-b-2 border-solid border-primary_color pb-4">
							<span className="space-x-3">
								<Typography.Text strong>Hành trình:</Typography.Text>
								<Typography.Text>
									Quy Nhơn-Phú Yên-Mũi Điện-Gành Đá Dĩa-Kỳ Co-Eo Gió
								</Typography.Text>
							</span>
							<span className="space-x-3">
								<Typography.Text strong>Lịch trình:</Typography.Text>
								<Typography.Text>4 ngày 3 đêm</Typography.Text>
							</span>
							<span className="space-x-3">
								<Typography.Text strong>Ngày khởi hành:</Typography.Text>
								<Typography.Text>
									05,12,19,26/10; 02,09,16,23,30/11; 07,14,21/12/2024
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
							<strong>Du lịch Quy Nhơn</strong> là một địa điểm du lịch nổi
							tiếng ở miền Trung, du lịch Quy Nhơn thành phố ven biển thuộc tỉnh
							Bình Định với cảnh sắc tuyệt đẹp, được bao quanh bởi nhiều bãi cát
							trắng hoang sơ, những ngọn núi xanh tươi bát ngát và những hòn đảo
							yên bình. Không giống như những bãi biển nhộn nhịp khác ở Vũng Tàu
							hay Nha Trang, Quy Nhơn lại là một bãi biển thiên đường du lịch
							mang vẻ đẹp yên bình với làn nước trong vắt. Hãy cùng Du Lịch Việt
							khám phá vẻ đẹp cùng những trải nghiệm thú vị tại Quy Nhơn mà du
							khách sẽ được trải nghiệm khi đến với thiên đường du lịch mùa Thu
							trong nước tại đây. Đón bình minh trên Eo Gió Nằm trên địa bàn
							thuộc xã Nhơn Lý, cách thành phố Quy Nhơn khoảng 20km, Eo Gió là
							địa danh mà bất cứ ai khi đến du lịch Quy Nhơn cũng đều muốn đến
							thăm, đừng trước khung cảnh tuyệt đẹp tại Eo gió du khách sẽ chỉ
							muốn thả dáng và check-in. Từ mỏm đá trên cao khung cảnh nhìn
							xuống, bạn thu vào tầm mắt một eo biển nhỏ thật bình yên được ôm
							ấp trong dãy núi, như một vòng tay ôm đang ôm gọn bờ biển. Ghé
							thăm Eo Gió trong tiết trời se se lạnh của một buổi sáng sớm tinh
							mơ mùa Thu săn ánh bình minh là một trải nghiệm đi tour mùa Thu
							Quy Nhơn nhất định bạn phải lưu giữ. Lắng nghe tiếng sóng biển xô,
							cùng tiếng gió vi vu nhẹ nhàng như khúc tình ca, ngắm nhìn ánh mặt
							trời ló dạng, vén dần màn sương mờ ảo huyền diệu trên biển thì
							thật tuyệt vời biết bao.
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
								Du lịch mùa Thu - Tour Du lịch Quy Nhơn - Phú Yên từ Sài Gòn
								2024
							</span>
							<ul className="mt-5">
								{dataTour.map((i, index) => (
									<li
										key={index}
										className="flex gap-x-3 py-3 px-1 border-t border-solid border-gray-800"
									>
										<strong>{i.label}: </strong>
										<p className="flex-1">{i.value}</p>
									</li>
								))}
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
			<div className="mt-5">
				<ListScrollHorizontal>
					<div className="flex gap-5">
						{dataInit.map((i) => (
							<CardTour tour={i} />
						))}
					</div>
				</ListScrollHorizontal>
			</div>

			<div className="mt-16">
				<Typography.Title level={3}>Đánh giá</Typography.Title>
				<ReviewTour idTour="1" />
			</div>
		</Container>
	);
};

export default TourDetail;
