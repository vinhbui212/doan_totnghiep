import { paths } from "@/router/path";
import { Menu, MenuProps } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
type MenuItem = Required<MenuProps>["items"][number];

const LayoutAdmin = () => {
	const navigate = useNavigate();
	const items: MenuItem[] = [
		{
			key: paths.bookingAdmin,
			label: "Quản lý tour",
			onClick: () => navigate(paths.bookingAdmin),
			// icon: <MailOutlined />,
		},
		{
			key: paths.tourAdmin,
			label: "Quản lý đặt tour",
			onClick: () => navigate(paths.tourAdmin),
			// icon: <MailOutlined />,
		},
		{
			key: paths.detailHotel,
			label: "Quản lý chuyến bay",
			onClick: () => navigate(paths.flightAdmin),
			// icon: <MailOutlined />,
		},
		{
			key: paths.hotelAdmin,
			label: "Quản lý khách sạn",
			onClick: () => navigate(paths.hotelAdmin),
			// icon: <MailOutlined />,
		},
		{
			key: paths.customerAdmin,
			label: "Quản lý khách hàng",
			onClick: () => navigate(paths.customerAdmin),
			// icon: <MailOutlined />,
		},
		{
			key: paths.paymentAdmin,
			label: "Quản lý thanh toán",
			onClick: () => navigate(paths.paymentAdmin),
			// icon: <MailOutlined />,
		},
	];
	return (
		<>
			<Header isAdmin={true} />
			<div className="flex">
				<Menu
					// onClick={onClick}
					style={{ width: 256 }}
					defaultSelectedKeys={["1"]}
					defaultOpenKeys={["sub1"]}
					mode="inline"
					items={items}
				/>

				<div className="flex-1 p-5">
					<Outlet />
				</div>
			</div>
		</>
	);
};

export default LayoutAdmin;
