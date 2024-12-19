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

const CardTourRecom = (props: IProps) => {
	const navigate = useNavigate();

	return (
		<div className="max-w-sm overflow-hidden shadow-lg border rounded-lg min-w-[300px] flex flex-col h-full">
			{/* Thẻ ảnh */}
			<div className="relative flex-grow">
				<Image
					className="w-full"
					style={{
						maxHeight: "200px",
						objectFit: "cover",
						minHeight: "200px", // Đảm bảo chiều cao ảnh cố định
					}}
					src={props.tour?.imgUrl ?? "https://dulichviet.com.vn/thumbs/0/278x229/images/bandidau/du-lich-chau-au-01.png"}
				/>
				<Typography.Text className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 text-sm rounded">
					Từ {props.tour?.departure}
				</Typography.Text>
			</div>
			

			{/* Nội dung */}
			<div className="p-4 flex flex-col justify-between flex-grow">
				<Typography.Title level={4} className="mb-2" >
					<a href={`/tour/${props.tour.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
					{props.tour?.title}
					</a>
				</Typography.Title>
				<Typography.Text className="text-sm mb-2">{props.tour?.description}</Typography.Text>

				{/* Các thông tin chi tiết tour */}
				<ItemDes icon={<CalendarOutlined />} label={formatDate(props.tour?.startDate)} />
				<ItemDes icon={<ClockCircleOutlined />} label={formatDate(props.tour?.endDate)} />

				{/* <button
					className="mt-4 p-2 bg-blue-500 text-white rounded"
					onClick={() => navigate(`/tour/${props.tour.id}`)}
				>
					Xem chi tiết
				</button> */}
			</div>
		</div>
	);
};

export default CardTourRecom;
