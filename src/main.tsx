import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routers from "./router";

import { ConfigProvider } from "antd";

import "./index.css";

const router = createBrowserRouter(routers);
createRoot(document.getElementById("root")!).render(
	<ConfigProvider
		theme={{
			token: {
				colorPrimary: "#df1388",
				fontSize: 15,
				fontSizeSM: 12,
			},
		}}
		input={{
			style: {
				height: 40,
				width: "100%",
			},
		}}
		datePicker={{
			style: {
				height: 40,
				width: "100%",
			},
		}}
		button={{
			style: {
				height: 40,
			},
		}}
	>
		<RouterProvider router={router} />
	</ConfigProvider>
);
