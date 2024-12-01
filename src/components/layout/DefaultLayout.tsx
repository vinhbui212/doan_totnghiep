import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./Footer";
import { useEffect } from "react";

const DefaultLayout = () => {
	useEffect(() => {
		console.log("DefaultLayout");
	}, []);
	return (
		<main>
			<Header />
			<Outlet />
			<Footer />
		</main>
	);
};

export default DefaultLayout;
