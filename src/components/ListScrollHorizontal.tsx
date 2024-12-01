import { useEffect, useRef } from "react";

interface IProps {
	children: React.ReactNode;
}

const ListScrollHorizontal = (props: IProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
		if (containerRef.current && e.deltaY !== 0) {
			containerRef.current.scrollLeft += e.deltaY;
		}
	};
	const disableWindowScroll = (e: WheelEvent) => {
		if (
			containerRef.current &&
			containerRef.current.contains(e.target as Node)
		) {
			e.preventDefault();
		}
	};

	useEffect(() => {
		window.addEventListener("wheel", disableWindowScroll, { passive: false });

		return () => {
			window.removeEventListener("wheel", disableWindowScroll);
		};
	}, []);
	return (
		<div
			className="flex overflow-x-auto scroll-smooth pb-3"
			onWheel={handleScroll}
			ref={containerRef}
		>
			{props.children}
		</div>
	);
};
export default ListScrollHorizontal;
