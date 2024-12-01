export interface ApiResponse<T> {
	data: T;
	status?: string;
	message?: string;
	timestamp?: number;
}

export interface ApiResponseForme<T> {
	data: T;
	pageable: {
		pageNumber: number;
		pageSize: number;
		sort: {
			empty: boolean;
			sorted: boolean;
			unsorted: boolean;
		};
		offset: number;
		unpaged: boolean;
		paged: boolean;
	};
	last: boolean;
	totalPages: number;
	totalElements: number;
	first: boolean;
	size: number;
	number: number;
	sort: {
		empty: boolean;
		sorted: boolean;
		unsorted: boolean;
	};
	numberOfElements: number;
	empty: boolean;
}
