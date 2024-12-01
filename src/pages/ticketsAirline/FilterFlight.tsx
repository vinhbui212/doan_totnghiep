/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDate } from "@/helper/func";
import useQueryParams from "@/hooks/useQueryParams";
import { Button, Col, DatePicker, Form, FormInstance, Input, Row } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

interface IProps {
	form?: FormInstance<any>;
	handleFilter: () => void;
}
const FilterFlight = ({ form, handleFilter }: IProps) => {
	const { updateQueryParams, valuesQuery } = useQueryParams();
	useEffect(() => {
		const valueInQuery = valuesQuery(form?.getFieldsValue());
		form?.setFieldsValue({
			...valueInQuery,
			departDate: valueInQuery.departDate
				? dayjs(valueInQuery.departDate)
				: null,
			returnDate: valueInQuery.returnDate
				? dayjs(valueInQuery.returnDate)
				: null,
		});
	}, [form?.getFieldsValue()]);
	return (
		<Form
			form={form}
			onValuesChange={(_, value) => {
				console.log({ value });
				updateQueryParams({
					...value,
					departDate: value.departDate
						? formatDate(value.departDate, "YYYY-MM-DD")
						: null,
					returnDate: value.returnDate
						? formatDate(value.returnDate, "YYYY-MM-DD")
						: null,
				});
			}}
		>
			<Row gutter={12}>
				<Col xl={6}>
					<Form.Item name="fromId">
						<Input placeholder="Điểm khởi hành" />
					</Form.Item>
				</Col>
				<Col xl={6}>
					<Form.Item name="toId">
						<Input placeholder="Điểm đến" />
					</Form.Item>
				</Col>
				<Col xl={6}>
					<Form.Item name="departDate">
						<DatePicker placeholder="Thời gian khởi hành" />
					</Form.Item>
				</Col>
				<Col xl={6}>
					<Form.Item name="returnDate">
						<DatePicker placeholder="Thời gian trở lại" defaultValue={null} />
					</Form.Item>
				</Col>
			</Row>

			<div className="flex justify-center">
				<Button onClick={handleFilter} type="primary">
					Tìm chuyến bay
				</Button>
			</div>
		</Form>
	);
};
export default FilterFlight;
