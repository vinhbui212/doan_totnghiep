interface IProps {
	icon: React.ReactNode;
	label: string | React.ReactNode;
}

const ItemCategory = (props: IProps) => {
	return (
		<div className="flex px-[12px] py-[18px] items-center gap-3 uppercase border border-primary_color border-solid cursor-pointer rounded-md">
			<span>{props.icon}</span>
			<span>{props.label}</span>
		</div>
	);
};

export default ItemCategory;
