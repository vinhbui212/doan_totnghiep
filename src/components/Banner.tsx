import { Carousel, Image } from "antd";

import banner_01 from "@assets/banner/banner_home_01.jpg";
import banner_02 from "@assets/banner/banner_home_02.jpg";
import banner_03 from "@assets/banner/banner_home_03.jpg";
import banner_04 from "@assets/banner/banner_home_04.jpg";
import banner_05 from "@assets/banner/banner_home_05.jpg";

const images = [banner_01, banner_02, banner_03, banner_04, banner_05];
const Banner = () => {
	return (
		<Carousel draggable className="flex justify-center Banner" autoplay>
			{images.map((image) => (
				<Image
					key={image}
					className="w-full max-h-[600px] rounded-lg "
					src={image}
					preview={false}
				/>
			))}
		</Carousel>
	);
};
export default Banner;
