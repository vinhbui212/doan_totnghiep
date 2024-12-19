/* eslint-disable @typescript-eslint/no-explicit-any */
import { addReviewTourService, getReviewTourService } from "@/services/tour";
import { Button, Form, Input, notification, Rate, Typography } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
import { useEffect, useState } from "react";

interface IProps {
	idTour?: string;
}

const ReviewTour = ({ idTour }: IProps) => {
	const [form] = Form.useForm();
	const [api, contextHolder] = notification.useNotification();
	const [dataReview, setDataReview] = useState<any>([]);
	const [rate, setRate] = useState<number>(0);
	const handleGetData = async () => {
		const res = await getReviewTourService(idTour);
		setDataReview(res);
	};
	const name = localStorage.getItem("customerName");
	const handleSubmit = async () => {
		try {
			await addReviewTourService({
				tourId: idTour,
				comment: form.getFieldsValue().comment,
				rating: rate,
				date: dayjs().toISOString(),
				customerName:name
			});
			handleGetData();
			api.success({
				message: "Đánh giá thành công",
			});
			form.resetFields();
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		handleGetData();
	}, [idTour]);

	return (
		<Form form={form}>
			{contextHolder}
			{dataReview?.map((d: any) => {
				return (
					<div className="flex border border-solid border-s-gray-500 rounded-md p-3 flex-col">
						<div className="flex gap-2">
							<Typography.Text strong>{d?.customerName}</Typography.Text>
							<Typography.Text>{`( ${dayjs(
								d?.date
							).fromNow()} )`}</Typography.Text>
						</div>
						<Typography.Paragraph>{d?.comment}</Typography.Paragraph>
						<Rate defaultValue={d?.rating ?? 0} disabled />
					</div>
				);
			})}

			<div className="mt-5">
				<Form.Item name="comment">
					<Input.TextArea rows={4} placeholder="Comment"></Input.TextArea>
				</Form.Item>
				<div>
					<Rate allowHalf defaultValue={rate} onChange={(r) => setRate(r)} />
					<Button type="primary" onClick={handleSubmit}>
						Gửi đánh giá
					</Button>
				</div>
			</div>
		</Form>
	);
};
export default ReviewTour;
