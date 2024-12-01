/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IndexObject } from "@/common/types/common";
import { filterParams } from "@/helper/func";
import { useSearchParams } from "react-router-dom";

const useSetQueryParams = () => {
	const [searchParams, setQueryParams] = useSearchParams();
	const updateQueryParams = (value: IndexObject) => {
		setQueryParams(filterParams(value ?? {}));
	};

	const valuesQuery = (value: IndexObject) => {
		const values: any = {};
		Object.keys(value).forEach((key) => {
			values[key] = searchParams.get(key);
		});
		return filterParams(values);
	};
	return { updateQueryParams, valuesQuery };
};

export default useSetQueryParams;
