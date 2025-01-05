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
		// Lấy giá trị từ query params để khôi phục trạng thái form
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

	// Hàm đảm bảo thêm hậu tố ".AIRPORT" cho fromId và toId
	const ensureAirportSuffix = (value: string | undefined): string => {
		if (!value) return ""; // Nếu giá trị trống, trả về chuỗi trống
		return value.endsWith(".AIRPORT") ? value : `${value}.AIRPORT`;
	};

	const handleFilterWithValidation = () => {
		// Lấy giá trị hiện tại từ form
		const values = form?.getFieldsValue();

		// Cập nhật các giá trị với hậu tố ".AIRPORT"
		const updatedValues = {
			...values,
			fromId: ensureAirportSuffix(values?.fromId),
			toId: ensureAirportSuffix(values?.toId),
		};

		// Cập nhật lại form và gọi hàm handleFilter
		form?.setFieldsValue(updatedValues);
		updateQueryParams({
			...updatedValues,
			departDate: updatedValues.departDate
				? formatDate(updatedValues.departDate, "YYYY-MM-DD")
				: null,
			returnDate: updatedValues.returnDate
				? formatDate(updatedValues.returnDate, "YYYY-MM-DD")
				: null,
			currency_code: "VND",
		});
		handleFilter();
	};

	return (
		<Form
			form={form}
			onValuesChange={(_, value) => {
				// Cập nhật query params mỗi khi giá trị thay đổi
				updateQueryParams({
					...value,
					fromId: ensureAirportSuffix(value?.fromId),
					toId: ensureAirportSuffix(value?.toId),
					departDate: value.departDate
						? formatDate(value.departDate, "YYYY-MM-DD")
						: null,
					returnDate: value.returnDate
						? formatDate(value.returnDate, "YYYY-MM-DD")
						: null,
					currency_code: "VND",
				});
			}}
		>
			<Row gutter={12}>
				<Col xl={6}>
					<Form.Item name="fromId">
						<Input
							placeholder="Điểm khởi hành"
							onBlur={(e) => {
								// Cập nhật giá trị khi rời khỏi input
								const currentValue = e.target.value;
								form?.setFieldsValue({
									fromId: ensureAirportSuffix(currentValue),
								});
							}}
						/>
					</Form.Item>
				</Col>
				<Col xl={6}>
					<Form.Item name="toId">
						<Input
							placeholder="Điểm đến"
							onBlur={(e) => {
								// Cập nhật giá trị khi rời khỏi input
								const currentValue = e.target.value;
								form?.setFieldsValue({
									toId: ensureAirportSuffix(currentValue),
								});
							}}
						/>
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
				<Button onClick={handleFilterWithValidation} type="primary">
					Tìm chuyến bay
				</Button>
			</div>
		</Form>
	);
};
export default FilterFlight;
