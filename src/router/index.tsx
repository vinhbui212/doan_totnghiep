import HomePage from "@/pages/home";
import { TicketAirline, TicketAirlineDetail } from "@/pages/ticketsAirline";
import TourDetail from "@/pages/tour/TourDetail";
import { RouteObject } from "react-router-dom";
import { paths } from "./path";
import { DefaultLayout } from "@/components/layout";
import { Hotel, HotelDetail } from "@/pages/hotel";
import Information from "@/pages/information/Information";
import LayoutAdmin from "@/components/layout/LayoutAdmin";
import BookingAdmin from "@/pages/admin/BookingAdmin";
import FlightAdmin from "@/pages/admin/FlightAdmin";
import HotelAdmin from "@/pages/admin/HotellAdmin";
import CustomerAdmin from "@/pages/admin/CustomerAdmin";
import PaymentAdmin from "@/pages/admin/PaymentAdmin";

const routers: RouteObject[] = [
	{
		path: paths.home,
		Component: DefaultLayout,
		children: [
			{
				path: paths.home,
				Component: HomePage,
			},
			{
				path: paths.ticketsAirline,
				Component: TicketAirline,
			},
			{
				path: paths.ticketsAirlineDetail,
				Component: TicketAirlineDetail,
			},
			{
				path: paths.tourDetail,
				Component: TourDetail,
			},

			{
				path: paths.hotel,
				Component: Hotel,
			},
			{ path: paths.detailHotel, Component: HotelDetail },
			{ path: paths.information, Component: Information },
		],
	},

	{
		path: paths.home,
		Component: LayoutAdmin,
		children: [
			{ path: paths.bookingAdmin, Component: BookingAdmin },
			{ path: paths.flightAdmin, Component: FlightAdmin },
			{ path: paths.hotelAdmin, Component: HotelAdmin },
			{ path: paths.customerAdmin, Component: CustomerAdmin },
			{ path: paths.paymentAdmin, Component: PaymentAdmin },
		],
	},
];

export default routers;
