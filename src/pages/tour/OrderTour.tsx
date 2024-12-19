/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITourDetail } from "@/common/types/tour";
import Container from "@/components/layout/components/Container";
import { formatPrice } from "@/helper/func";
import { paymentSubmitOrderService } from "@/services/payment";
import { orderTourService } from "@/services/tour";
import {
	Button,
	DatePicker,
	Form,
	Image,
	Input,
	InputNumber,
	notification,
	Radio,
	Typography,
} from "antd";
import dayjs from "dayjs";
import { useMemo } from "react";

interface IProps {
	tour: ITourDetail;
}

const optionPayment = [
	{ value: 0, label: "Thanh toán trực tiếp" },
	{ value: 1, label: "Thanh toán qua ZaloPay" },
	{ value: 2, label: "Thanh toán qua vis Momo" },
	{ value: 3, label: "Thanh toán chuyển khoản cho ngân hàng" },
	{ value: 4, label: "Thanh toán qua VNPAY" },
	{ value: 5, label: "Thanh toán qua Viettel Money" },
];
const OrderTour = ({ tour }: IProps) => {
	const [form] = Form.useForm();

	const [api, contextHolder] = notification.useNotification();
	const initPrice = useMemo(() => {
		const price = tour?.price_aldults ?? 0;
		return {
			lv1: price,
			lv2: price * 0.5,
			lv3: price * 0.35,
			lv4: price * 0.25,
		};
	}, [tour?.price_aldults]);

	const lv1 = Form.useWatch("lv1", form);
	const lv2 = Form.useWatch("lv2", form);
	const lv3 = Form.useWatch("lv3", form);
	const lv4 = Form.useWatch("lv4", form);

	const totalPrice = useMemo(() => {
		return (
			lv1 * initPrice.lv1 +
			lv2 * initPrice.lv2 +
			lv3 * initPrice.lv3 +
			lv4 * initPrice.lv4
		);
	}, [
		initPrice.lv1,
		initPrice.lv2,
		initPrice.lv3,
		initPrice.lv4,
		lv1,
		lv2,
		lv3,
		lv4,
	]);
	const customerId = localStorage.getItem("customerId");
	const customerName = localStorage.getItem("customerName");
	const onOrderTour = async () => {
		const values = form.getFieldsValue();
		const paymentMethod = values.method;
		try {
			const orderData = {
				customerName: customerName, // Tên khách hàng
				numOfPeople: (lv1).toString(), // Tổng số người tham gia
				numOfChildren: (lv2).toString(), // Số lượng trẻ em, mặc định là 0
				tourId: tour.id.toString(), // ID tour từ props
				tourName: tour.title, // Tên tour từ props
				travelDate: dayjs(values?.travelDate).format("YYYY-MM-DD"), // Ngày đi
				customerId: customerId, // Mặc định ID khách hàng là 1
			};
			const res = await orderTourService(orderData);
			// api.success({
			// 	message: "Đặt tour thành công",
			// });

			console.log(res);
			//  lây id booking từ res (api trả về khi tạo booking)
			if (paymentMethod === 1) {
				const resPayment = await paymentSubmitOrderService(res);
				window.location.href = resPayment;
			}
			api.open({
				message: "Đặt Tour",
				description: "Đặt tour thành công",
				showProgress: true,
				pauseOnHover: true,
			});

		} catch (error) {
			console.error(error);
		}
	};
	return (
		<Container>
			{contextHolder}
			<div className="bg-white shadow-md p-6 rounded-lg">
				<Typography.Title level={3}>{tour?.title}</Typography.Title>
				<div className="grid grid-cols-5">
					<div className="col-span-2">
						<Image src={tour.imgUrl ?? "https://dulichviet.com.vn/images/bandidau/NOI-DIA/Quy-Nhon/du-lich-quy-nhon-eo-gio-du-lich-viet.jpg"} />
					</div>
					<div className="col-span-3 text-gray-700 flex flex-col gap-5 px-10">
						<p>
							<strong>Thời gian:</strong> 5 ngày
						</p>
						<p>
							<strong>Giá:</strong> {formatPrice(tour.price_aldults)}
						</p>
						<p>
							<strong>Ngày khởi hành:</strong> {tour.startDate}
						</p>
						<p>
							<strong>Nơi khởi hành:</strong> {tour.departure}
						</p>
						<p>
							<strong>Số chỗ còn nhận:</strong> 10
						</p>
					</div>
				</div>

				<Typography.Paragraph className="text-[red] mt-10 text-sm">
					Các khoản phí phát sinh (nếu có) như: phụ thu dành cho khách nước
					ngoài, việt kiều; phụ thu phòng đơn; phụ thu chênh lệch giá tour… Nhân
					viên Du Lịch Việt sẽ gọi điện thoại tư vấn cho quý khách ngay sau khi
					có phiếu xác nhận booking. (Trong giờ hành chính) Trường hợp quý khách
					không đồng ý các khoản phát sinh, phiếu xác nhận booking của quý khách
					sẽ không có hiệu lực.
				</Typography.Paragraph>
			</div>

			<div className="mt-8">
				<div className="text-center my-10">
					<Typography.Title level={3}>BẢNG GIÁ TOUR CHI TIẾT</Typography.Title>
				</div>
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white border border-gray-300">
						<thead className="bg-gray-100">
							<tr>
								<th className="px-4 py-2 border">Người lớn (Trên 11 tuổi)</th>
								<th className="px-4 py-2 border">Trẻ em (5 - 11 tuổi)</th>
								<th className="px-4 py-2 border">Trẻ nhỏ (2 - 5 tuổi)</th>
								<th className="px-4 py-2 border">Sơ sinh (&lt; 2 tuổi)</th>
							</tr>
						</thead>
						<tbody>
							<tr className="text-center">
								<td className="px-4 py-2 border">
									{formatPrice(initPrice.lv1)}
								</td>
								<td className="px-4 py-2 border">
									{formatPrice(initPrice.lv2)}
								</td>
								<td className="px-4 py-2 border">
									{formatPrice(initPrice.lv3)}
								</td>
								<td className="px-4 py-2 border">
									{formatPrice(initPrice.lv4)}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<Form
				form={form}
				className="mt-8 bg-white shadow-md p-6 rounded-lg"
				layout="vertical"
				initialValues={{
					lv1: 0,
					lv2: 0,
					lv3: 0,
					lv4: 0,
				}}
			>
				<div>
					<div className="text-center my-10">
						<Typography.Title level={3}>THÔNG TIN LIÊN HỆ</Typography.Title>
					</div>
					<div className="grid grid-cols-2 gap-6">
						
						<Form.Item label="Số điện thoại">
							<Input placeholder="Số điện thoại" />
						</Form.Item>
						<Form.Item label="Địa chỉ">
							<Input placeholder="Địa chỉ" />
						</Form.Item>
						<Form.Item label="Ngày khởi hành" name="bookingDate" required>
							<DatePicker placeholder="Ngày khởi hành" />
						</Form.Item>
						<Form.Item label="Ghi chú" className="col-span-2">
							<Input.TextArea rows={4} placeholder="Ghi chú" />
						</Form.Item>
					</div>
				</div>

				<div className="grid grid-cols-4">
					<Form.Item label="Nguời lớn" name="lv1">
						<InputNumber
							className="!w-[200px]"
							placeholder="Nguời lớn"
							max={10}
						/>
					</Form.Item>
					<Form.Item label="Trẻ em (5 - 11 tuổi)" name="lv2">
						<InputNumber
							className="!w-[200px]"
							placeholder="Trẻ em (5 - 11 tuổi)"
							max={10}
						/>
					</Form.Item>
					<Form.Item label="Trẻ nhỏ (2 - 5 tuổi)" name="lv3">
						<InputNumber
							className="!w-[200px]"
							placeholder="Trẻ nhỏ (2 - 5 tuổi)"
							max={10}
						/>
					</Form.Item>
					<Form.Item label="Sơ sinh (&lt; 2 tuổi)" name="lv4">
						<InputNumber
							className="!w-[200px]"
							placeholder="Sơ sinh (&lt; 2 tuổi)"
							max={10}
						/>
					</Form.Item>
				</div>
				<div>
					<div className="text-center my-10">
						<Typography.Title level={3}>
							PHƯƠNG THỨC THANH TOÁN
						</Typography.Title>
					</div>
					<Form.Item name="method" rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán' }]}>
						<Radio.Group className="grid grid-cols-2">
							{optionPayment?.map((o) => (
								<Radio key={o.value} value={o.value} className="mb-5">
									{o.label}
								</Radio>
							))}
						</Radio.Group>
					</Form.Item>
					<Typography.Text strong className="text-lg font-bold">
						Tổng giá trị: {formatPrice(totalPrice)}
					</Typography.Text>
					<Button
						type="primary"
						className="block mt-6 mx-auto"
						onClick={onOrderTour}
					>
						Đặt Tour
					</Button>
				</div>
			</Form>
		</Container>
	);
};

export default OrderTour;
