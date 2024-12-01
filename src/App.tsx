import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routers from "./router";

const App = () => {
	const router = createBrowserRouter(routers);
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<RouterProvider router={router} />
		</Suspense>
	);
};

export default App;
