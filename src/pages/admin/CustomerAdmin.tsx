/* eslint-disable @typescript-eslint/no-explicit-any */
import useCallApi from "@/hooks/useCallApi";
import { getAllCustomerService } from "@/services/customer";
import { Table, TableColumnsType, Typography } from "antd";
import { useEffect } from "react";

const CustomerAdmin = () => {
	const { data, callApi } = useCallApi({ func: getAllCustomerService });
	const columns: TableColumnsType<any> = [
		{
			title: "Họ",
			dataIndex: "firstName",
		},
		{
			title: "Tên",
			dataIndex: "lastName",
		},
		{
			title: "Gmail",
			dataIndex: "email",
		},
		{
			title: "Số điện thoại",
			dataIndex: "phoneNumber",
		},
	];

	useEffect(() => {
		callApi();
	}, []);

	return (
		<>
			<Typography.Title level={3}>Quản lý khách hàng</Typography.Title>
			<Table<any>
				columns={columns}
				pagination={false}
				dataSource={data as any}
			/>
		</>
	);
};

export default CustomerAdmin;
