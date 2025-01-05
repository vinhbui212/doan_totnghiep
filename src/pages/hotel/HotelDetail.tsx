/* eslint-disable react-hooks/exhaustive-deps */
import { ApiResponse } from "@/common/api";
import { IImagesHotel, THotelDetail } from "@/common/types/hotel";
import GridImages from "@/components/GridImages";
import ListItemService from "@/components/ListItemService";
import Container from "@/components/layout/components/Container";
import { formatPrice } from "@/helper/func";
import useCallApi from "@/hooks/useCallApi";
import {
	bookingHotelService,
	getHotelDetailService,
	getImageHotelService,
} from "@/services/hotel";
import { AimOutlined } from "@ant-design/icons";
import { Button, notification, Rate, Typography } from "antd";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

const DetailHotel = () => {
	const { id } = useParams();
	const [api, contextHolder] = notification.useNotification();

	const onGetDetailHotel = async () => {
		if (!id) return;
		return Promise.all([
			getHotelDetailService({ id: Number(id) }),
			getImageHotelService({ id: Number(id) }),
		]);
	};
	const { data, isLoading, callApi } = useCallApi<
		[ApiResponse<THotelDetail>, ApiResponse<IImagesHotel[]>]
	>({
		func: onGetDetailHotel,
	});

	const { detailHotel, imagesHotel } = useMemo(() => {
		if (!data) return { detailHotel: undefined, imagesHotel: [] };
		return {
			detailHotel: data[0].data,
			imagesHotel: data[1].data,
		};
	}, [data?.[0]?.data?.hotel_id]);

	const onBookingHotel = async () => {
		const customerId = localStorage.getItem("customerId");
		if (!customerId) {
			api.warning({
				message: "Hãy đăng nhập",
				description: "Bạn cần đăng nhập để thực hiện chức năng này.",
			});
			return; // Kết thúc hàm nếu không có customerId
		}
	
		try {
			await bookingHotelService({
				pricePerNight:
					detailHotel?.product_price_breakdown
						?.all_inclusive_amount_hotel_currency?.value,
				name: detailHotel?.hotel_name,
				address: `${detailHotel?.address}, ${detailHotel?.district}, ${detailHotel?.city_trans},
					${detailHotel?.country_trans}`,
				status: "available",
			});
			api.success({ message: "Đặt phòng thành công" });
		} catch (error) {
			console.error("Booking hotel error:", error);
			api.error({ message: "Lỗi", description: "Có lỗi xảy ra khi đặt phòng." });
		}
	};
	

	useEffect(() => {
		callApi();
	}, [id]);
	return (
		<>
			{contextHolder}
			<Container isLoading={isLoading} className="relative">
				<span className="flex space-x-2 items-center">
					<Typography.Text strong>Đánh giá: </Typography.Text>
					<Rate
						allowHalf
						defaultValue={detailHotel?.breakfast_review_score?.rating}
					/>
				</span>
				<div className="flex items-center justify-between">
					<Typography.Title level={3}>
						{detailHotel?.hotel_name}
					</Typography.Title>
					<Button onClick={onBookingHotel} type="primary" className="h-[40px]">
						Liên hệ đặt phòng
					</Button>
				</div>

				<span className="flex gap-5 my-5">
					<AimOutlined className="text-primary_color text-2xl" />
					<Typography.Text strong>
						{detailHotel
							? `${detailHotel?.address}, ${detailHotel?.district}, ${detailHotel?.city_trans},
				${detailHotel?.country_trans}`
							: ""}
					</Typography.Text>
				</span>

				<span className="flex gap-2 items-center mb-5">
					<Typography.Text className="text-2xl" strong>
						Giá từ:
					</Typography.Text>
					<Typography.Text
						strong
						className="text-2xl text-primary_color items-center font-bold"
					>
						{formatPrice(
							detailHotel?.product_price_breakdown
								?.all_inclusive_amount_hotel_currency?.value,
							detailHotel?.product_price_breakdown
								?.all_inclusive_amount_hotel_currency?.currency
						)}
					</Typography.Text>
				</span>

				<GridImages images={imagesHotel?.map((image) => image?.url ?? "")} />

				<Typography.Paragraph className="block mt-5">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus,
					officiis nisi. Harum dolorum voluptas dicta cum quo. Harum, rerum
					architecto nam blanditiis animi unde fugiat dolor nisi vel? Magni,
					amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
					eligendi quae voluptatum fugit ut perferendis quibusdam magnam
					doloribus earum quo. Voluptatum aut fugiat quisquam quos obcaecati
					deleniti nisi, libero molestiae. Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Temporibus pariatur adipisci dolorem
					eveniet voluptatem harum, cum, consectetur ab sit voluptas delectus
					quas praesentium veritatis fugiat tempore sapiente dolore animi?
					Quasi. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
					Minus, officiis nisi. Harum dolorum voluptas dicta cum quo. Harum,
					rerum architecto nam blanditiis animi unde fugiat dolor nisi vel?
					Magni, amet. Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Dolores eligendi quae voluptatum fugit ut perferendis quibusdam magnam
					doloribus earum quo. Voluptatum aut fugiat quisquam quos obcaecati
					deleniti nisi, libero molestiae. Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Temporibus pariatur adipisci dolorem
					eveniet voluptatem harum, cum, consectetur ab sit voluptas delectus
					quas praesentium veritatis fugiat tempore sapiente dolore animi?
					Quasi. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
					Minus, officiis nisi. Harum dolorum voluptas dicta cum quo. Harum,
					rerum architecto nam blanditiis animi unde fugiat dolor nisi vel?
					Magni, amet. Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Dolores eligendi quae voluptatum fugit ut perferendis quibusdam magnam
					doloribus earum quo. Voluptatum aut fugiat quisquam quos obcaecati
					deleniti nisi, libero molestiae. Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Temporibus pariatur adipisci dolorem
					eveniet voluptatem harum, cum, consectetur ab sit voluptas delectus
					quas praesentium veritatis fugiat tempore sapiente dolore animi?
					Quasi.
				</Typography.Paragraph>
				<div className="mt-10">
					<Typography.Title level={4} className="!text-primary_color !mb-5">
						Dịch vụ nổi bật
					</Typography.Title>
					<ListItemService
						names={detailHotel?.property_highlight_strip
							?.map((item) => item.name)
							.concat(
								detailHotel?.facilities_block?.facilities?.map(
									(item) => item.name
								)
							)}
					/>
				</div>
			</Container>
		</>
	);
};

export default DetailHotel;
