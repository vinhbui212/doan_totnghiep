interface IProps {
	names?: string[];
}

const ListItemService = ({ names }: IProps) => {
	return (
		<div className="flex gap-3 flex-wrap cursor-context-menu">
			{names?.map((name) => (
				<span
					key={name}
					className="px-5 py-2 bg-blue_color_02 rounded-lg text-white"
				>
					{name}
				</span>
			))}
		</div>
	);
};

export default ListItemService;
