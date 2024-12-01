import { ISegment } from "@/common/types/flight";
import { formatDate, formatPrice } from "@/helper/func";
import { bookingSlightService } from "@/services/flight";
import { DingtalkOutlined } from "@ant-design/icons";
import { Button, Image, notification } from "antd";

interface IProps {
	segment: ISegment;
	price?: number;
	currencyCode?: string;
}
const ItemTicketAirlineDetail = ({ segment, currencyCode, price }: IProps) => {
	const [api, contextHolder] = notification.useNotification();
	const onBookingFlight = async () => {
		try {
			await bookingSlightService({
				startPoint:
					segment?.departureAirport?.cityName +
					", " +
					segment?.departureAirport?.countryName,
				endPoint:
					segment?.arrivalAirport?.cityName +
					", " +
					segment?.arrivalAirport?.countryName,
				startTime: segment?.legs[0]?.departureTime,
				endTime: segment?.legs[0]?.arrivalTime,
				classOfService: segment?.legs[0]?.cabinClass,
				fltPrice: price,
				fltPriceCurrency: "VND",
				status: "Scheduled",
			});

			api.success({ message: "Đặt vé thành công" });
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="grid grid-cols-5">
			{contextHolder}
			<div className="flex items-center space-x-2 flex-col gap-2">
				<Image
					src={segment.legs[0]?.carriersData[0]?.logo}
					className="!w-10 !h-10"
				/>
				<div className="text-sm font-normal">
					{segment.legs[0]?.carriersData[0]?.name}
				</div>
			</div>

			<div className="flex flex-col items-center space-y-3">
				<div className="text-xl font-semibold">
					{segment?.legs?.[0]?.departureAirport?.cityName}
				</div>
				<div className="text-sm text-gray-500">
					{formatDate(segment?.legs[0]?.departureTime)}
				</div>
			</div>

			<div className="flex items-center justify-center gap-4">
				<DingtalkOutlined className="text-green-500 text-2xl" />
				<div className="text-green-500 font-medium">1 điểm dừng</div>
			</div>

			<div className="flex flex-col items-center space-y-3">
				<div className="text-xl font-semibold">
					{segment?.legs[0]?.arrivalAirport?.cityName}
				</div>
				<div className="text-sm text-gray-500">
					{formatDate(segment?.legs[0]?.arrivalTime)}
				</div>
			</div>

			<div className="flex items-center gap-5">
				<div className="text-xl font-bold text-orange-500">
					{formatPrice(price, currencyCode)}
				</div>
				<Button type="primary" className="h-[40px]" onClick={onBookingFlight}>
					Đặt vé
				</Button>
			</div>
		</div>
	);
};

export default ItemTicketAirlineDetail;
