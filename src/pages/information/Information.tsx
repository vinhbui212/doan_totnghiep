import { IFavorite, ITourOrder } from "@/common/types/tour";
import Container from "@/components/layout/components/Container";
import useCallApi from "@/hooks/useCallApi";
import { paths } from "@/router/path";
import {
	getFavoriteService,
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
											// f?.img_Url ??
											"https://dulichviet.com.vn/images/bandidau/NOI-DIA/Quy-Nhon/du-lich-quy-nhon-mua-thu-du-lich-viet-2024.jpg"
										}
									/>
									<Typography.Paragraph>{f?.details}</Typography.Paragraph>
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
							onClick={() => setCurrentTab(tab.key)}
							className={`flex items-center gap-5 cursor-pointer ${
								currentTab === tab.key ? "text-primary_color" : ""
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
