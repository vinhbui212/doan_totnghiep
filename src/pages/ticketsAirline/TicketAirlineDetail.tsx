/* eslint-disable react-hooks/exhaustive-deps */
import ItemTicketAirlineDetail from "@/components/ItemTicketAirlineDetail";
import Container from "@/components/layout/components/Container";
import LoadingSearchFlight from "@/components/LoadingSearchFlight";
import useCallApi from "@/hooks/useCallApi";
import { getFlightDetailService } from "@/services/flight";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TicketAirlineDetail = () => {
	const location = useLocation();
	const handleGetFlightDetail = async () => {
		return getFlightDetailService({ token: location.state?.token });
	};

	const {
		data,
		isLoading: isLoadingSearchFlight,
		callApi,
	} = useCallApi({
		func: handleGetFlightDetail,
	});

	useEffect(() => {
		callApi();
	}, []);
	return (
		<Container>
			{isLoadingSearchFlight ? (
				<LoadingSearchFlight />
			) : (
				<div className="flex flex-col gap-10 mt-20">
					{data?.data?.segments?.map((s, index) => (
						<ItemTicketAirlineDetail
							segment={s}
							key={index}
							price={
								data?.data?.priceBreakdown?.total?.units +
								data?.data?.priceBreakdown?.total?.nanos / 1000000000
							}
							currencyCode={data?.data?.priceBreakdown?.total?.currencyCode}
						/>
					))}
				</div>
			)}
		</Container>
	);
};

export default TicketAirlineDetail;
