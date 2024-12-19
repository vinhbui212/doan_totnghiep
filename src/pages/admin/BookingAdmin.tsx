import { ITourDetail } from "@/common/types/tour";
import ModalHandleTourAdmin from "@/components/ModalHandleTourAdmin";
import useCallApi from "@/hooks/useCallApi";
import { getAllTourService } from "@/services/tour";
import { Button, Table, TableColumnsType, Typography } from "antd";
import { SearchProps } from "antd/es/input";
import Search from "antd/es/transfer/search";
import { useEffect, useState } from "react";

const BookingAdmin = () => {
	const { data, callApi } = useCallApi({ func: getAllTourService });
	const [valueModal, setValueModal] = useState<{
		open?: boolean;
		tour?: ITourDetail;
	}>({});
	const columns: TableColumnsType<ITourDetail> = [
		{
			title: "Tên tour",
			dataIndex: "title",
		},
		{
			title: "Ngày bắt đầu",
			dataIndex: "startDate",
		},
		{
			title: "Ngày kết thúc",
			dataIndex: "endDate",
		},
		{
			title: "Lịch trình",
			dataIndex: "schedule",
		},

		{
			title: "Giá trẻ em",
			dataIndex: "price_children",
		},
		{
			title: "Giá người lớn",
			dataIndex: "price_aldults",
		},
		{
			title: "Hành động",
			render: (_, record) => {
				return (
					<Button
						type="primary"
						onClick={() => setValueModal({ open: true, tour: record })}
					>
						Xem chi tiết
					</Button>
				);
			},
		},
	];

	const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

	useEffect(() => {
		callApi();
	}, []);

	return (
		<>
			<ModalHandleTourAdmin
				valueModal={valueModal}
				setValueModal={setValueModal}
				callbackSuccess={callApi}
			/>
			<div className="flex justify-between items-center mb-10">
				<Typography.Title level={3}>Quản lý đặt tour</Typography.Title>

				<div className="flex gap-8">
					<div className="w-[400px]">
						<Search placeholder="input search text" onChange={() => { }} />
					</div>
					<Button type="primary" onClick={() => setValueModal({ open: true })}>
						Tạo Tour
					</Button>
				</div>
			</div>

			<Table<ITourDetail>
				columns={columns}
				pagination={false}
				dataSource={data?.content as ITourDetail[]}
			/>
		</>
	);
};

export default BookingAdmin;
