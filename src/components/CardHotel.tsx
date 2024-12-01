import { THotelItem } from "@/common/types/hotel";
import { formatPrice } from "@/helper/func";
import { paths } from "@/router/path";
import { Rate, Typography } from "antd";
import { useNavigate } from "react-router-dom";

interface IProps {
	hotel?: THotelItem;
}
const CardHotel = ({ hotel }: IProps) => {
	const navigate = useNavigate();
	const onNavigateHotelDetail = () => {
		navigate(`${paths.hotel}/${hotel?.hotel_id}`);
	};
	return (
		<div
			style={{
				backgroundImage: `url(${hotel?.property?.photoUrls?.[0]})`,
			}}
			className={`relative w-[350px] max-w-[90%] h-full bg-no-repeat bg-cover bg-center cursor-pointer rounded-lg`}
		>
			<div
				onClick={onNavigateHotelDetail}
				className="flex flex-col gap-y-2 absolute w-full items-center bottom-0 bg-black bg-opacity-50 py-3"
			>
				<Rate allowHalf defaultValue={hotel?.property?.qualityClass} />
				<Typography.Title
					level={5}
					className="text-ellipsis text-nowrap truncate !text-white"
				>
					{hotel?.property?.name}
				</Typography.Title>
				<span className="flex gap-x-3">
					<Typography.Text className="!text-white">Giá từ: </Typography.Text>
					<Typography.Text strong className="text-yellow-400">
						{formatPrice(hotel?.property?.priceBreakdown?.grossPrice?.value)}
					</Typography.Text>
				</span>
			</div>
		</div>
	);
};

export default CardHotel;
