import { useState } from "react";

interface CallApiPayload<T> {
	func: () => Promise<T | undefined>;
	funcCallbackSuccess?: () => void;
}

const useCallApi = <T>(payload: CallApiPayload<T>) => {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<Error | null>(null);

	const callApi = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const result = await payload.func();
			if (!result) {
				throw new Error("API response is empty");
			}
			payload?.funcCallbackSuccess?.();
			setData(result);
		} catch (err) {
			setError(err as Error);
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, data, error, callApi };
};

export default useCallApi;
