/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITour } from "@/common/types/tour";
import CardTour from "@/components/CardTour";
import ItemCategory from "@/components/ItemCategory";
import Container from "@/components/layout/components/Container";
import useCallApi from "@/hooks/useCallApi";
import { getToursService } from "@/services/tour";
import { CalendarOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { useEffect } from "react";
import Banner from "../../components/Banner";

const HomePage = () => {
	const initCategory = [
		{ icon: <CalendarOutlined />, label: "Đặt khách sạn toàn cầu" },
		{ icon: <CalendarOutlined />, label: "Đặt khách sạn toàn cầu" },
		{ icon: <CalendarOutlined />, label: "Đặt khách sạn toàn cầu" },
		{ icon: <CalendarOutlined />, label: "Đặt khách sạn toàn cầu" },
	];

	const handleGetTour = async () => {
		return (await getToursService()) as any;
	};

	const { data, isLoading, callApi } = useCallApi({ func: handleGetTour });

	useEffect(() => {
		callApi();
	}, []);

	return (
		<Container isLoading={isLoading}>
			<Banner />
			<Row gutter={12} justify="center" className="m-0 mt-10">
				{initCategory.map((c, index) => (
					<Col key={index}>
						<ItemCategory icon={c.icon} label={c.label} />
					</Col>
				))}
			</Row>

			<div className="mt-10">
				<Row gutter={[16, 20]}>
					{(data?.content as ITour[])?.map((t, index) => {
						return (
							<Col lg={6} key={index}>
								<CardTour tour={t} />
							</Col>
						);
					})}
				</Row>
			</div>
		</Container>
	);
};

export default HomePage;
