export interface ITour {
	id?: number;
	title?: string;
	description?: string;
	priceCurrency?: string;
	startDate?: string;
	endDate?: string;
	schedule?: string;
	imgUrl?: string;
	price_aldults?: number;
	price_children?: number;
	departure?: string;
	destination?: string;
	abroad: true;
}

export interface ITourDetail {
	abroad: boolean;
	departure: string;
	description: string;
	destination: string;
	endDate: string;
	id: number;
	imgUrl: string;
	priceCurrency: string;
	price_aldults: number;
	price_children: number;
	schedule: string;
	startDate: string;
	title: string;
	imgUrl2: string;
	imgUrl3: string;
}

export interface ITourOrder {
	id: number;
	customerId: number;
	customerName: string;
	bookingDate: string;
	numOfPeople: number;
	numOfChildren: number;
	status: string;
	tourId: number;
	tourName: string;
	travelDate: string;
	
}

export interface IFavorite {
	tour_id: number;
	img_Url: string;
	details: string;
}
