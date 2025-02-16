import { IFavorite, ITourOrder } from "@/common/types/tour";
import Container from "@/components/layout/components/Container";
import useCallApi from "@/hooks/useCallApi";
import { paths } from "@/router/path";
import {
	getFavoriteService,
	getInfoService,
	getOrderService,
	updateCustomerService,
} from "@/services/customer";
import {
	ContainerOutlined,
	HeartOutlined,
	LogoutOutlined,
	UserOutlined,
} from "@ant-design/icons";
import {
	Button,
	Form,
	Input,
	notification,
	Table,
	TableColumnsType,
	Typography,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Information = () => {
	const [api, contextHolder] = notification.useNotification();
	const navigate = useNavigate();
	const [currentTab, setCurrentTab] = useState(0);
	const [form] = Form.useForm();

	const { data: dataOrder, callApi } = useCallApi({ func: getOrderService });
	const { data: dataFavorite, callApi: callApiGetFavorite } = useCallApi({
		func: getFavoriteService,
	});

	const getInfoService = async () => {
		try {
			const token = localStorage.getItem("token"); // Hoặc lấy từ cookies tùy theo cách lưu trữ token
			const response = await axios.get("http://localhost:8080/api/customers/info", {
				headers: {
					Authorization: `Bearer ${token}`,  // Đảm bảo token được truyền trong header
				},
			});
			return response.data;  // Dữ liệu trả về là thông tin khách hàng
		} catch (error) {
			console.error("Error fetching customer info", error);
			throw error;  // Thông báo lỗi nếu có
		}
	};


	useEffect(() => {
		const fetchCustomerInfo = async () => {
			try {
				const data = await getInfoService();  // Gọi API để lấy thông tin
				form.setFieldsValue(data);  // Điền dữ liệu vào form
			} catch (error) {
				notification.error({
					message: "Lỗi khi lấy thông tin khách hàng",
					description: "Không thể lấy thông tin khách hàng từ server.",
				});
			}
		};

		fetchCustomerInfo();
	}, [form]);

	const initTab = [
		{ label: "Hồ sơ cá nhân", icon: <UserOutlined />, key: 0 },
		{ label: "Đơn hàng của tôi", icon: <ContainerOutlined />, key: 1 },
		{ label: "Danh sách yêu thích", icon: <HeartOutlined />, key: 2 },
		{
			label: "Thoát",
			icon: <LogoutOutlined />,
			key: 3,
			onClick: () => {
				localStorage.clear();
				navigate(paths.home);
				window.location.reload();
			},
		},
	];

	const onUpdateCustomer = async () => {
		const values = form.getFieldsValue();
		try {
			await updateCustomerService({
				...values,
			});
			api.success({ message: "Cập nhật thông tin thành công" });
		} catch (error) {
			console.log(error);
		}
	};
	const cancelTourOrderService = async (bookingId: number, userId: number) => {
		const token = localStorage.getItem("token"); // Đảm bảo token đã được lưu trữ
		const response = await axios.post(
			"http://localhost:8080/api/bookings/cancel", // URL API
			null, // Body không cần dữ liệu
			{
				params: {
					bookingId,
					userId,
				},
				headers: {
					Authorization: `Bearer ${token}`, // Thêm token vào header
				},
			}
		);
		return response.data; // Trả về phản hồi từ API
	};
	
	const onCancelTour = async (bookingId: number) => {
		const userId = localStorage.getItem("customerId"); // Lấy userId từ localStorage
	
		if (!userId) {
			api.warning({
				message: "Chưa đăng nhập",
				description: "Vui lòng đăng nhập để thực hiện thao tác này.",
			});
			return;
		}
	
		try {
			await cancelTourOrderService(bookingId, parseInt(userId));
			api.success({
				message: "Hủy tour thành công",
				description: `Đơn hàng với ID ${bookingId} đã được hủy.`,
			});
			callApi(); // Làm mới danh sách đơn hàng
		} catch (error) {
			api.error({
				message: "Hủy tour thất bại",
				description: error.response?.data || "Đã xảy ra lỗi khi hủy tour. Vui lòng thử lại.",
			});
		}
	};
	
	const onRemoveFavorite = async (tourID: number) => {
		try {
			// Gọi API để xóa tour khỏi danh sách yêu thích
			await removeFavoriteService(tourID);
	
			// Hiển thị thông báo thành công
			api.success({
				message: "Xóa thành công",
				description: "Tour đã được xóa khỏi danh sách yêu thích.",
			});
	
			// Làm mới danh sách yêu thích
			callApiGetFavorite();
		} catch (error) {
			// Hiển thị thông báo lỗi nếu xóa thất bại
			api.error({
				message: "Xóa thất bại",
				description: error.response?.data || "Đã xảy ra lỗi khi xóa khỏi danh sách yêu thích.",
			});
		}
	};
	
	

	const removeFavoriteService = async (tourID: number) => {
		const token = localStorage.getItem("token"); // Lấy token từ localStorage
		if (!token) {
			throw new Error("Người dùng chưa đăng nhập");
		}
	
		const response = await axios.delete("http://localhost:8080/api/wishlist/delete", {
			params: {
				tourID, // Truyền tourID làm tham số
			},
			headers: {
				Authorization: `Bearer ${token}`, // Gửi token trong header
			},
		});
		return response.data; // Trả về phản hồi từ API
	};
	
	
	


	useEffect(() => {
		callApi();
		callApiGetFavorite();

	}, []);

	const Content = () => {
		switch (currentTab) {
			case 0:
				return (
					<div>
						<Typography.Title>Tài Khoản</Typography.Title>
						<Form form={form} layout="vertical">
							<div className="grid grid-cols-2 gap-5">
								<Form.Item label="Email" name="email" required>
									<Input placeholder="Email" />
								</Form.Item>
								<Form.Item label="Họ" name="firstName">
									<Input placeholder="Họ" />
								</Form.Item>
								<Form.Item label="Tên và tên đệm" name="lastName">
									<Input placeholder="Tên và tên đệm" />
								</Form.Item>
								<Form.Item label="Số điện thoại" name="phoneNumber">
									<Input placeholder="Số điện thoại" />
								</Form.Item>
								<Form.Item label="Địa chỉ" name="address">
									<Input placeholder="Địa chỉ" />
								</Form.Item>
								{/* <Form.Item label="Ngày sinh" name="bookingDate">
									<DatePicker placeholder="Ngày sinh" />
								</Form.Item> */}
							</div>
						</Form>
						<Button
							className="mx-auto block mt-10"
							type="primary"
							onClick={onUpdateCustomer}
						>
							Lưu thông tin
						</Button>
					</div>
				);
			case 1: {
				const columns: TableColumnsType<ITourOrder> = [
					{
						title: "ID",
						dataIndex: "id",
					},
					{
						title: "Tour order",
						dataIndex: "tourName",
						width: "30%",
					},
					{
						title: "Ngày đặt",
						dataIndex: "bookingDate",
					},
					{
						title: "Ngày du lịch",
						dataIndex: "travelDate",
					},
					{
						title: "Trạng thái",
						dataIndex: "status",
					},

					{
						title: "Người lớn",
						dataIndex: "numOfPeople",
					},
					{
						title: "Trẻ em",
						dataIndex: "numOfChildren",
					},
					{
						title: "Action",
						dataIndex: "action",
						render: (_, record: ITourOrder) => (
							<Button
								type="primary"
								danger
								onClick={() => onCancelTour(record.id)} // Gọi hàm hủy tour
								disabled={record.status === "CANCELED"} // Vô hiệu hóa nút nếu trạng thái là CANCELED
							>
								Hủy tour
							</Button>
						),
					},
				];
				return (
					<div>
						<Typography.Title>Đơn hàng của tôi</Typography.Title>
						<Table<ITourOrder>
							columns={columns}
							pagination={false}
							dataSource={dataOrder?.content as ITourOrder[]}
						/>
					</div>
				);
			}

			case 2:
				return (
					<>
						<Typography.Title>Danh sách yêu thích</Typography.Title>
						<div className="flex flex-col gap-5">
							{(dataFavorite as IFavorite[])?.map((f, index) => (
								<div
									key={index}
									className="flex gap-10 items-center border-b border-solid border-gray-400 pb-2"
								>
									<img
										className="w-[100px]"
										src={
											f?.img_Url ??
											"https://dulichviet.com.vn/images/bandidau/NOI-DIA/Quy-Nhon/du-lich-quy-nhon-mua-thu-du-lich-viet-2024.jpg"
										}
									/>
									<Typography.Paragraph>{f?.details}</Typography.Paragraph>
									<Button
										type="primary"
										danger
										onClick={() => onRemoveFavorite(f.tour_id)} // Gọi hàm xóa
									>
										Xóa
									</Button>
								</div>
							))}
						</div>
					</>
				);
				
				
			case 3:
				return <h1>Thoát</h1>;
		}
	};

	return (
		<Container>
			{contextHolder}
			<div className="grid grid-cols-3">
				<div className="col-span-1 border border-gray-400 border-solid flex flex-col gap-7 rounded-md p-5">
					{initTab.map((tab, index) => (
						<div
							key={index}
							onClick={() => {
								setCurrentTab(tab.key);
								tab?.onClick?.();
							}}
							className={`flex items-center gap-5 cursor-pointer ${currentTab === tab.key ? "text-primary_color" : ""
								}`}
						>
							<span>{tab.icon}</span>
							<span>{tab.label}</span>
						</div>
					))}
				</div>

				<div className="col-span-2 p-5">
					<Content />
				</div>
			</div>
		</Container>
	);
};
export default Information;
