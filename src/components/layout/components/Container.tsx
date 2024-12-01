import Loading from "@/components/Loading";
import { motion } from "framer-motion";
import { useEffect } from "react";

interface IProps {
	children: React.ReactNode;
	isLoading?: boolean;
	className?: string;
}

const Container = ({ children, isLoading, className }: IProps) => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	if (isLoading) {
		return <Loading />;
	}
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.6, ease: "easeInOut" }}
			className={`w-[1400px] max-w-[98%] mx-auto my-10 scroll-smooth ${
				className ? className : ""
			}`}
		>
			{children}
		</motion.div>
	);
};

export default Container;
