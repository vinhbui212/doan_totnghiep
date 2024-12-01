/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITourDetail } from "@/common/types/tour";
import { StockOutlined } from "@ant-design/icons";
import { Image, Typography } from "antd";
import { useMemo, useState } from "react";

const fixData = {
	children: [
		{
			time: "Sáng",
			contentTime:
				"Quý khách có mặt tại ga quốc nội, sân bay Tân Sơn Nhất trước giờ bay ít nhất hai tiếng. ",
			values: [
				"Đại diện công ty Du Lịch Việt đón và hỗ trợ Quý Khách làm thủ tục đón chuyến bay đi Tuy Hòa. ",
				"Đến sân bay Tuy Hòa, Hướng dẫn viên đón đoàn khởi hành đi Mũi Điện  điểm cực đông – nơi đón bình minh đầu tiên trên đất liền của Tổ Quốc.",
				"Mũi Điện có núi, có biển, từ xa là ngọn đèn hải đăng đứng sừng sững quay mặt ra biển, bên dưới chân núi là Bãi Môn được nhiều người yêu thích bởi sự yên tĩnh, thanh vắng mà bãi biển này mang lại. Trên đường khời hành ra mũi điện quý khách co dip chiêm ngưỡng cung đường ven biển Phước Tân – Bãi Ngà tuyệt đẹp. ",
			],
			urlImage:
				"https://dulichviet.com.vn/images/bandidau/NOI-DIA/Quy-Nhon/du-lich-quy-nhon-kham-pha-mui-dien-du-lich-viet.jpg",
		},
		{
			time: "Trưa",
			contentTime: "đoàn dùng cơm trưa tại vè nổi trên vịnh Vũng Rô.",
			values: [
				"Sau bữa trưa quý khách có thể đi cano ra Hòn Nưa một hòn đảo hoang sơ nhưng thật quyến rũ tữ do tắm biển và ngắm san hô (chi phí tự túc).",
			],
		},
		{
			time: "Chiều",
			contentTime: " Dùng cơm chiều. Nghỉ đêm tại Tuy Hoà.",
			values: [
				"Quý khách tự do mua sắm các đặc sản Phú Yên như: khô cá ngừ đại dương, bò một nắng hai sương, muối kiến vàng lá then leng…",
			],
		},
	],
};

interface IProps {
	tour: ITourDetail;
}
const ScheduleTour = ({ tour }: IProps) => {
	const [contentHidden, setContentHidden] = useState<number[]>([]);
	const handleClickContent = (value: number) => {
		let newContentHidden = [...contentHidden];
		if (newContentHidden.includes(value)) {
			newContentHidden = newContentHidden.filter((c) => c !== value);
		} else {
			newContentHidden.push(value);
		}
		setContentHidden(newContentHidden);
	};

	const dataSchedule = useMemo(() => {
		return tour?.schedule?.split(";")?.map((item) => ({
			id: Math.random(),
			title: item?.trim(),
			children: fixData.children,
		}));
	}, [tour?.schedule]);

	return (
		<>
			<div className="flex gap-x-5 items-center">
				<StockOutlined className="text-2xl text-primary_color" />
				<Typography.Title level={3} className="!m-0">
					Lịch Trình
				</Typography.Title>
				<span className="flex h-full items-center bg-blue_color_02 text-white font-semibold px-2 py-3 rounded-lg">
					Lịch khởi hành ( cập nhật {tour?.startDate} )
				</span>
			</div>
			<div className="mt-5 pl-5 space-y-10 border-l-4 border-dashed border-primary_color">
				{dataSchedule?.map((item, index) => (
					<div key={index}>
						<div
							onClick={() => {
								handleClickContent(item.id);
							}}
							className="py-2 px-4 text-white font-semibold bg-primary_color rounded-md cursor-pointer relative"
						>
							{item?.title}
							<span className="flex items-center justify-center w-8 h-8 absolute left-[-38px] bottom-0 border border-solid border-primary_color bg-white rounded-full">
								<span className="block w-[50%] h-[50%] bg-primary_color rounded-full"></span>
							</span>
						</div>
						{!contentHidden.includes(item.id) && (
							<div className="flex flex-col gap-y-5 mt-5 bg-gray_bg_color_01 p-2 rounded-md">
								{item?.children?.map((child: any, index) => (
									<div key={index}>
										<span>
											<Typography.Text strong>{child.time}: </Typography.Text>
											<Typography.Text>{child.contentTime}</Typography.Text>
										</span>
										<ul className="list-disc px-10 mt-3 space-y-2">
											{child?.values?.map((value: any, index: number) => (
												<li className="text-sm leading-6" key={index}>
													{value}
												</li>
											))}
										</ul>
										{child.urlImage && (
											<Image
												src={child.urlImage}
												className="mt-5 rounded-md"
												preview={false}
											/>
										)}
									</div>
								))}
							</div>
						)}
					</div>
				))}
			</div>
		</>
	);
};

export default ScheduleTour;
