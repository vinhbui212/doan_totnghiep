/* eslint-disable @typescript-eslint/no-explicit-any */
import useCallApi from "@/hooks/useCallApi";
import { getListBookingsHotelService } from "@/services/hotel";
import { Table, TableColumnsType, Typography } from "antd";
import { useEffect } from "react";

const HotelAdmin = () => {
	const { data, callApi } = useCallApi({ func: getListBookingsHotelService });
	const columns: TableColumnsType<any> = [
		{
			title: "Tên khách sạn",
			dataIndex: "name",
		},
		{
			title: "Địa chỉ",
			dataIndex: "address",
		},
		{
			title: "Giá phòng",
			dataIndex: "pricePerNight",
		},
		{
			title: "Trạng thái",
			dataIndex: "status",
		},
	];

	useEffect(() => {
		callApi();
	}, []);
	return (
		<>
			<Typography.Title level={3}>Quản lý khách sạn</Typography.Title>
			<Table<any>
				columns={columns}
				pagination={false}
				dataSource={(data as any)?.content as any}
			/>
		</>
	);
};

export default HotelAdmin;
