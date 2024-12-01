import { PhoneOutlined } from "@ant-design/icons";
import { Button, Col, Form, Image, Input, Modal, Row, Typography } from "antd";

import { ITourDetail } from "@/common/types/tour";
import { ENameFormOrderHotel } from "@/enum";
import homeImage from "@assets/home_image.jpg";

interface IProps {
	tour?: ITourDetail;
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalOrderRoom = ({ tour, showModal, setShowModal }: IProps) => {
	const [form] = Form.useForm();

	const handleSubmit = () => {
		form.validateFields({});
	};
	return (
		<Modal
			open={showModal}
			footer={null}
			className="!w-fit !h-fit"
			onCancel={() => {
				setShowModal(false);
			}}
		>
			<Row className="w-[60vw]">
				<Col xl={12} className="text-center flex flex-col gap-8">
					<Typography.Title level={3} className="!text-primary_color !mb-0">
						{tour?.title}
					</Typography.Title>

					<Typography.Title level={4} className="!my-0">
						Liên hệ đặt tour
					</Typography.Title>

					<div className="w-[60%] flex items-center justify-center border border-solid border-primary_color rounded-lg p-2 gap-2 mx-auto">
						<PhoneOutlined className="text-2xl" />
						<div className="flex flex-col font-bold text-primary_color">
							<Typography.Text strong>0909.502.588</Typography.Text>
							<Typography.Text strong>0909.502.588</Typography.Text>
						</div>
					</div>
					<Image src={homeImage} preview={false} />
				</Col>
				<Col xl={12} className="p-5 px-8">
					<Form form={form} layout="vertical">
						<Form.Item label="Họ tên" required>
							<Input name={ENameFormOrderHotel.YOUR_NAME} />
						</Form.Item>
						<Form.Item label="Email" required>
							<Input name={ENameFormOrderHotel.YOUR_NAME} />
						</Form.Item>
						<Form.Item label="Số điện thoại" required>
							<Input name={ENameFormOrderHotel.PHONE_NUMBER} />
						</Form.Item>
						<Form.Item label="Địa chỉ">
							<Input name={ENameFormOrderHotel.LOCATION} />
						</Form.Item>
						<Form.Item label="Yêu cầu" required>
							<Input.TextArea rows={4} name={ENameFormOrderHotel.REQUEST} />
						</Form.Item>
						<Form.Item label="Bạn biết thông tin qua">
							<Input name={ENameFormOrderHotel.INTRODUCE} />
						</Form.Item>
					</Form>
					<Button
						onClick={handleSubmit}
						type="primary"
						className="w-full h-[40px]"
					>
						Gửi thông tin
					</Button>
				</Col>
			</Row>
		</Modal>
	);
};

export default ModalOrderRoom;
