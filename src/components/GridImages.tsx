import { Image, Modal } from "antd";
import { useState } from "react";

interface IProps {
	images?: string[];
}

const GridImages = ({ images }: IProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => setIsModalOpen(true);
	const handleCloseModal = () => setIsModalOpen(false);
	if (!images?.length) return <></>;
	return (
		<div className="p-4 grid grid-cols-4 grid-rows-2 gap-4 select-none">
			<div className="col-span-2 row-span-2">
				<Image
					src={images?.[0]}
					alt="Main Room Image"
					className="rounded-lg shadow-md"
				/>
			</div>

			{images?.slice(1, 4).map((image, index) => (
				<div key={index} className="col-span-1">
					<Image
						src={image}
						alt={`Room Image ${index + 1}`}
						className="rounded-lg shadow-sm"
					/>
				</div>
			))}

			<div className="relative col-span-1 cursor-pointer" onClick={showModal}>
				<Image
					src={images?.[4]}
					alt="More Images"
					className="rounded-lg shadow-sm"
					preview={false}
				/>
				<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
					<span className="text-white text-lg font-semibold">
						+{Number(images?.length) - 5}
					</span>
				</div>
			</div>

			<Modal
				open={isModalOpen}
				footer={null}
				onCancel={handleCloseModal}
				className="top-6 max-w-fit !w-[90%]"
				closeIcon={false}
			>
				<div className="grid grid-cols-5 gap-5 p-5 h-[90vh] overflow-y-auto">
					{images?.map((image, index) => (
						<Image
							loading="lazy"
							key={index}
							src={image}
							alt={`Room Image ${index + 1}`}
							className="w-full md:w-1/3 lg:w-1/4 rounded-lg shadow-sm !hover:scale-50"
						/>
					))}
				</div>
			</Modal>
		</div>
	);
};

export default GridImages;
