/* eslint-disable @typescript-eslint/no-explicit-any */
import { ETypeModalAuth } from "@/enum";
import { handleAuthSuccess } from "@/helper/func";
import { paths } from "@/router/path";
import {
	loginAccountService,
	registerAccountService,
} from "@/services/authentication";
import Logo from "@assets/logo.png";
import { Form, Input, Modal, notification, Typography } from "antd";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
	isAdmin?: boolean;
}
const Header = ({ isAdmin }: IProps) => {
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [api, contextHolder] = notification.useNotification();
	const [modal, setModal] = useState<{ open?: boolean; type?: ETypeModalAuth }>(
		{ type: ETypeModalAuth.LOGIN }
	);

	const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));

	const isLoginSelected = useMemo(() => {
		return modal.type === ETypeModalAuth.LOGIN;
	}, [modal.type]);
	const handleSubmit = async () => {
		try {
			const values = form.getFieldsValue();
			const res = isLoginSelected
				? await loginAccountService(values)
				: await registerAccountService(values);
			form.resetFields();
			handleAuthSuccess(res);
			setModal({ ...modal, open: false });
			setIsLogin(true);
			if (values?.email === "admin@gmail.com") {
				navigate(paths.bookingAdmin);
			}
			api.open({
				message: "Notification Title",
				description: isLoginSelected
					? "Login success"
					: "Register account success",
				showProgress: true,
				pauseOnHover: true,
			});
		} catch (error) {
			console.log({ error });
		}
	};

	const menus = useMemo(() => {
		return {
			contact: [
				{ label: "Hệ thống giao dịch" },
				{ label: "Đăng ký đại lý" },
				{ label: "Phiếu góp ý" },
				{
					label: isLogin ? "Thông tin cá nhân" : "Đăng nhập",
					onClick: () => {
						if (isLogin) {
							navigate(paths.information);
						} else {
							setModal({ ...modal, open: true });
						}
					},
				},
			],
			service: [
				{ label: "du lịch", path: paths.home },
				{ label: "vé máy bay", path: paths.ticketsAirline },
				{ label: "khách sạn", path: paths.hotel },
			],
		};
	}, [isLogin]);

	return (
		<>
			{contextHolder}
			{modal.open && (
				<Modal
					destroyOnClose
					open={modal.open}
					onClose={() => {
						setModal({ ...modal, open: false });
					}}
					onCancel={() => {
						setModal({ ...modal, open: false });
					}}
					onOk={handleSubmit}
					okText={modal.type === ETypeModalAuth.LOGIN ? "Đăng nhập" : "Đăng ký"}
					title={
						<Typography.Title level={4} className="!text-center !mb-10">
							{isLoginSelected ? "Đăng nhập" : "Đăng Ký"}
						</Typography.Title>
					}
					footer={(_, { OkBtn }) => (
						<div className="flex justify-center mt-10 items-center relative">
							<OkBtn />
							<span
								className="cursor-pointer text-primary_color absolute right-0"
								onClick={() => {
									setModal({
										...modal,
										type: isLoginSelected
											? ETypeModalAuth.REGISTER
											: ETypeModalAuth.LOGIN,
									});
								}}
							>
								{isLoginSelected ? "Đăng ký" : "Đăng nhập"}
							</span>
						</div>
					)}
				>
					<Form layout="vertical" form={form}>
						{!isLoginSelected && (
							<>
								<Form.Item name="firstName" label="First name" required>
									<Input placeholder="First name" />
								</Form.Item>
								<Form.Item name="lastName" label="Last name" required>
									<Input placeholder="Nhập last name" />
								</Form.Item>
							</>
						)}
						<Form.Item name="email" label="Email" required>
							<Input placeholder="Nhập email" />
						</Form.Item>
						<Form.Item name="password" label="Mật khẩu" required>
							<Input.Password placeholder="Nhập mật khẩu" />
						</Form.Item>
					</Form>
				</Modal>
			)}
			<header>
				<div className="flex justify-between px-[30px] xl:px-[200px] py-[16px] bg-primary_color items-center">
					<div className="flex gap-4 items-center">
						<span className="text-while_color">Hotline</span>
						<span className="text font-bold text-yellow_color_01 text-xl">
							1900 1177
						</span>
					</div>
					<ul className="flex text-base gap-5 text-while_color">
						{menus.contact.map((contact, index) => (
							<li
								onClick={() => {
									if (!contact.onClick) return;
									contact.onClick();
								}}
								key={index}
								className="cursor-pointer"
							>
								{contact.label}
							</li>
						))}
					</ul>
				</div>
				{!isAdmin && (
					<div className="flex items-center justify-between px-[30px] xl:px-[200px] mt-5">
						<img src={Logo} alt="" />
						<ul className="flex uppercase gap-5 font-semibold">
							{menus.service.map((service, index) => (
								<li
									key={index}
									className="cursor-pointer"
									onClick={() => {
										navigate(service.path);
									}}
								>
									{service.label}
								</li>
							))}
						</ul>
					</div>
				)}
			</header>
		</>
	);
};

export default Header;
