import { Spin, Typography } from "antd";

const LoadingSearchFlight = () => {
	return (
		<div className="flex flex-col items-center gap-7">
			<Typography.Title level={2}>Lấy thông tin chuyến bay...</Typography.Title>

			<Typography.Text type="success" className="text-xl">
				Vui lòng đợi trong giây lát, chúng tôi đang lấy chuyến bay và mức
				giá tốt nhất cho bạn...
			</Typography.Text>

			<Typography.Text strong className="font-bold">
				
			</Typography.Text>
			<Typography.Text type="secondary"></Typography.Text>
			<Spin size="large" />
		</div>
	);
};

export default LoadingSearchFlight;
