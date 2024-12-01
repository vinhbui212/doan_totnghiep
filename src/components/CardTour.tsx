/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDate, formatPrice } from "@/helper/func";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Image, Typography } from "antd";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
	tour: any;
}

const ItemDes = (props: { icon: ReactNode; label?: string }) => {
	return (
		<div className="flex items-center gap-4">
			<Typography.Text>{props.icon}</Typography.Text>
			<Typography.Text>{props.label}</Typography.Text>
		</div>
	);
};
const CardTour = (props: IProps) => {
	const navigate = useNavigate();
	return (
		<div className="max-w-sm overflow-hidden shadow-lg border rounded-lg min-w-[300px]">
			<div className="relative">
				<Image
					className="w-full h-48 object-cover"
					src={
						props.tour?.imgUrl ??
						"https://dulichviet.com.vn/thumbs/0/278x229/images/bandidau/du-lich-chau-au-01.png"
					}
				/>
				<Typography.Text className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 text-sm rounded">
					Từ Hồ Chí Minh
				</Typography.Text>
			</div>

			<div
				className="p-4 cursor-pointer"
				onClick={() => {
					navigate(`/tour/${props.tour.id}`);
				}}
			>
				<Typography.Title level={5}>{props.tour?.title}</Typography.Title>
				<div className="group-[span]:text-3xl flex flex-col gap-3 mt-[18px] text-gray-600 text-sm mb-3 ">
					<ItemDes icon={<ClockCircleOutlined />} label={""} />
					<ItemDes
						icon={<CalendarOutlined />}
						label={formatDate(props.tour?.startDate)}
					/>
				</div>
				<div className="text-right">
					<span className="line-through text-gray-400 text-sm mr-2">
						{formatPrice(props.tour?.price_aldults, props.tour.priceCurrency)}
					</span>
					<span className="text-red-600 text-lg font-bold">
						{formatPrice(props.tour?.price_aldults, props.tour.priceCurrency)}
					</span>
				</div>
			</div>
		</div>
	);
};

export default CardTour;
