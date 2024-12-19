/* eslint-disable react-hooks/exhaustive-deps */
import { ITourDetail } from "@/common/types/tour";
import { formatDate } from "@/helper/func";
import {
	createTourService,
	deleteTourService,
	updateTourService,
} from "@/services/tour";
import { Button, DatePicker, Form, Input, Modal, notification } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";


interface IProps {
	valueModal?: {
		open?: boolean;
		tour?: ITourDetail;
	};
	callbackSuccess: () => void;
	setValueModal: React.Dispatch<
		React.SetStateAction<{
			open?: boolean;
			tour?: ITourDetail;
		}>
	>;
}
const ModalHandleTourAdmin = ({
	valueModal,
	callbackSuccess,
	setValueModal,
}: IProps) => {
	const [form] = Form.useForm();
	const [api, contextHolder] = notification.useNotification();

	const handleCreateTour = async () => {
		const values = form.getFieldsValue();
		try {
			await createTourService(values);
			api.success({ message: "Tạo tour thành công" });
			callbackSuccess?.();
			setValueModal({ open: false });
		} catch (error) {
			console.error(error);
		}
	};
	const handleUpdateTour = async () => {
		const values = form.getFieldsValue();
		try {
			await updateTourService({ ...values, id: valueModal?.tour?.id, endDate: dayjs(values.endDate).format("YYYY-MM-DDTHH:mm:ss"), startDate: dayjs(values.startDate).format("YYYY-MM-DDTHH:mm:ss") });
			api.success({ message: "Chỉnh sửa tour thành công" });
			callbackSuccess?.();
			setValueModal({ open: false });
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteTour = async () => {
		try {
			await deleteTourService(valueModal?.tour?.id);
			api.success({ message: "Xóa tour thành công" });
			callbackSuccess?.();
			setValueModal({ open: false });
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		if (valueModal?.tour) {
			form.setFieldsValue({
				...valueModal?.tour,
				startDate: dayjs(valueModal?.tour?.startDate),
				endDate: dayjs(valueModal?.tour?.endDate),
			});
		} else {
			form.resetFields();
		}
	}, [valueModal?.tour?.id]);
	return (
		<div>
			{contextHolder}
			<Modal
				open={valueModal?.open}
				onCancel={() => setValueModal({})}
				className="top-6 max-w-fit !w-[90%]"
				closeIcon={false}
				title={valueModal?.tour?.id ? "Chỉnh sửa tour" : "Tạo Tour"}
				okText={valueModal?.tour?.id ? "Chỉnh sửa tour" : "Tạo Tour"}
				onOk={valueModal?.tour?.id ? handleUpdateTour : handleCreateTour}
				footer={(_, { CancelBtn, OkBtn }) => {
					return (
						<div className="flex justify-end gap-5">
							<CancelBtn />

							{valueModal?.tour?.id && (
								<Button type="dashed" onClick={handleDeleteTour}>
									Xóa tour
								</Button>
							)}
							<OkBtn />
						</div>
					);
				}}
			>
				<div className="w-[1200px] overflow-y-auto px-3 ">
					<Form form={form} layout="vertical">
						<div className="grid grid-cols-2 gap-5">
							<Form.Item label="Tên tour" name="title">
								<Input />
							</Form.Item>
							<Form.Item label="Đơn vị tiền tệ" name="priceCurrency">
								<Input />
							</Form.Item>
							<Form.Item
								label="Description"
								name="description"
								className="col-span-2"
							>
								<Input.TextArea rows={4} />
							</Form.Item>
							<Form.Item label="Ngày bắt đầu" name="startDate">
								<DatePicker />
							</Form.Item>
							<Form.Item label="Ngày kết thúc" name="endDate">
								<DatePicker />
							</Form.Item>
							<Form.Item label="Lịch trình" name="schedule">
								<Input />
							</Form.Item>
							<Form.Item label="link ảnh" name="imgUrl">
								<Input />
							</Form.Item>
							<Form.Item label="Giá người lớn" name="price_aldults">
								<Input />
							</Form.Item>
							<Form.Item label="Giá trẻ em" name="price_children">
								<Input />
							</Form.Item>
							<Form.Item label="Khởi hành" name="departure">
								<Input />
							</Form.Item>
							<Form.Item label="Điểm đến" name="destination">
								<Input />
							</Form.Item>
						</div>
					</Form>
				</div>
			</Modal>
		</div>
	);
};

export default ModalHandleTourAdmin;
