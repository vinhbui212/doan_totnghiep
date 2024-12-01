/* eslint-disable @typescript-eslint/no-explicit-any */
import { IFlightDetail } from "@/common/types/flight";
import useCallApi from "@/hooks/useCallApi";
import { getListBookingsFlightService } from "@/services/flight";
import { Table, TableColumnsType, Typography } from "antd";
import { useEffect } from "react";

const FlightAdmin = () => {
	const { data, callApi } = useCallApi({ func: getListBookingsFlightService });
	const columns: TableColumnsType<IFlightDetail> = [
		{
			title: "Ngày đặt",
			dataIndex: "bookingDate",
		},
		{
			title: "Hạng vé",
			dataIndex: "classOfService",
		},
		{
			title: "Điểm đi",
			dataIndex: "startPoint",
		},
		{
			title: "Điểm đến",
			dataIndex: "endPoint",
		},

		{
			title: "Đơn vị tiền tệ",
			dataIndex: "fltPriceCurrency",
		},
		{
			title: "Giá vé",
			dataIndex: "fltPrice",
		},
	];

	useEffect(() => {
		callApi();
	}, []);
	return (
		<>
			<Typography.Title level={3}>Quản lý đặt vé máy bay</Typography.Title>
			<Table<IFlightDetail>
				columns={columns}
				pagination={false}
				dataSource={(data as any)?.content as IFlightDetail[]}
			/>
		</>
	);
};
export default FlightAdmin;
