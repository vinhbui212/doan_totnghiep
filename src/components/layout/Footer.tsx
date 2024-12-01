import { Button, Col, Row } from "antd";
import { Typography } from "antd";

const Footer = () => {
	return (
		<footer className="bg-white border-t-2 border-solid border-primary_color max-w-[80%] mx-auto mt-[80px] py-[60px]">
			<Row className="">
				<Col xl={10}>
					<Typography.Title level={3}>
						CÔNG TY CỔ PHẦN TRUYỀN THÔNG DU LỊCH VIỆT
					</Typography.Title>
					<ul className="space-y-5">
						<li>
							Địa chỉ: 239A Hoàng Văn Thụ, P.8, Quận Phú Nhuận, TP. Hồ Chí Minh.
						</li>
						<li>
							Văn phòng: 217 Bis Nguyễn Thị Minh Khai, Phường Nguyễn Cư Trinh,
							Quận 1, TP. Hồ Chí Minh.
						</li>
						<li>Chi nhánh Hà Nội: 44 Tràng Tiền, Quận Hoàn Kiếm, Hà Nội.</li>
						<li>Điện thoại: 028 73056789 | Hotline: 1900 1177</li>
						<li>Website: dulichviet.com.vn</li>
					</ul>
				</Col>

				<Col xl={6}>
					<Typography.Title level={3}>Góc khách hàng</Typography.Title>
					<ul className="space-y-3">
						<li>
							<a href="#!" className="hover:text-primary_color">
								Chính sách đặt tour
							</a>
						</li>
						<li>
							<a href="#!" className="hover:text-primary_color">
								Chính sách bảo mật
							</a>
						</li>
						<li>
							<a href="#!" className="hover:text-primary_color">
								Ý kiến khách hàng
							</a>
						</li>
						<li>
							<a href="#!" className="hover:text-primary_color">
								Phiếu góp ý
							</a>
						</li>
					</ul>
				</Col>
				<Col xl={8}>
					<Typography.Title level={3}>
						Đăng ký nhận thông tin khuyến mãi
					</Typography.Title>
					<p>
						Nhập email để có cơ hội giảm 50% cho chuyến đi tiếp theo của Quý
						khách
					</p>
					<div className="mt-5 flex">
						<input
							type="email"
							placeholder="Email của bạn"
							className="flex-grow border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary_color"
						/>
						<Button type="primary" className="h-10">
							Gửi
						</Button>
					</div>
				</Col>
			</Row>
			<div className="text-center mt-8 text-xs text-gray-500">
				Copyright © 2019 DU LỊCH VIỆT
			</div>
		</footer>
	);
};

export default Footer;
