import { Spin } from "antd";

const Loading = () => {
	return (
		<div className="bg-gray-500 bg-opacity-45 fixed top-0 left-0 w-full h-full z-20 flex items-center justify-center">
			<Spin size="large" />
		</div>
	);
};

export default Loading;
