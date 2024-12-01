import { formatPrice } from "@/helper/func";
import { paths } from "@/router/path";
import { Button, Image } from "antd";
import { useNavigate } from "react-router-dom";

interface IProps {
	from?: string;
	to?: string;
	logo?: string;
	token?: string;
	currencyCode?: string;
	price?: number;
}
const TicketItem = (props: IProps) => {
	const navigate = useNavigate();
	return (
		<div className="w-full border border-gray-300 rounded-lg p-4 shadow-md">
			<div className="flex justify-between items-center">
				<div>
					<p className="text-gray-800 text-lg font-semibold">
						{props.from} <span className="text-gray-500">→</span> {props.to}
					</p>
				</div>
				<Image src={props.logo} className="!w-8 !h-8" />
			</div>
			<p className="text-gray-500 text-sm mt-2">22/10/2001</p>
			<p className="text-primary_color text-2xl font-bold mt-4">
				{formatPrice(props.price, props.currencyCode)}
			</p>
			<div className="mt-5 flex justify-end">
				<Button
					onClick={() => {
						navigate(paths.ticketsAirlineDetail, {
							state: { token: props.token },
						});
					}}
					type="default"
					children="Xem"
				/>
			</div>
		</div>
	);
};

export default TicketItem;
