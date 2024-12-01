/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDate, formatPrice } from "@/helper/func";
import useCallApi from "@/hooks/useCallApi";
import { paymentGetAllService } from "@/services/payment";
import { Table, TableColumnsType, Typography } from "antd";
import { useEffect } from "react";

const PaymentAdmin = () => {
	const { data, callApi } = useCallApi({ func: paymentGetAllService });
	const columns: TableColumnsType<any> = [
		{
			title: "Id",
			dataIndex: "id",
		},
		{
			title: "Mã đơn",
			dataIndex: "booking_id",
		},
		{
			title: "Số tiền thanh toán",
			render: (_, record) => formatPrice(record?.amount),
		},
		{
			title: "Ngày thanh toán",
			render: (_, record) => formatDate(record?.payDate),
		},
		{
			title: "Thanh Toán",
			dataIndex: "payment_type",
		},
		{
			title: "Trạng thái",
			dataIndex: "status",
		},
	];
	console.log({ data });
	useEffect(() => {
		callApi();
	}, []);
	return (
		<>
			<Typography.Title level={3}>Quản lý thanh toán</Typography.Title>
			<Table<any>
				columns={columns}
				pagination={false}
				dataSource={data as any}
			/>
		</>
	);
};

export default PaymentAdmin;
