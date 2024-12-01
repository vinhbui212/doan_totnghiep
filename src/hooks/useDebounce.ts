import { useEffect, useState } from "react";

interface IProps {
	value?: string;
	delay?: number;
}

const useDebounce = ({ value, delay }: IProps) => {
	const [resValue, setResValue] = useState<string | undefined>("");

	useEffect(() => {
		const timeout = setTimeout(() => {
			setResValue(value);
		}, delay ?? 800);

		return () => {
			clearTimeout(timeout);
		};
	}, [value, delay]);

	return resValue;
};

export default useDebounce;
