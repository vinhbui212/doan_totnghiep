/* eslint-disable @typescript-eslint/no-explicit-any */
export type TFlightDetail = {
	token: string;
	segments: Array<ISegment>;
	priceBreakdown: {
		total: {
			currencyCode: string;
			units: number;
			nanos: number;
		};
		baseFare: {
			currencyCode: string;
			units: number;
			nanos: number;
		};
		fee: {
			currencyCode: string;
			units: number;
			nanos: number;
		};
		tax: {
			currencyCode: string;
			units: number;
			nanos: number;
		};
		totalRounded: {
			currencyCode: string;
			nanos: number;
			units: number;
		};
		moreTaxesAndFees: any;
		discount: {
			currencyCode: string;
			units: number;
			nanos: number;
		};
		totalWithoutDiscount: {
			currencyCode: string;
			units: number;
			nanos: number;
		};
		totalWithoutDiscountRounded: {
			currencyCode: string;
			nanos: number;
			units: number;
		};
		carrierTaxBreakdown: Array<{
			carrier: {
				name: string;
				code: string;
				logo: string;
			};
			avgPerAdult: {
				currencyCode: string;
				units: number;
				nanos: number;
			};
			avgPerChild: {
				currencyCode: string;
				units: number;
				nanos: number;
			};
			avgPerInfant: {
				currencyCode: string;
				units: number;
				nanos: number;
			};
		}>;
	};
	travellerPrices: Array<{
		travellerPriceBreakdown: {
			total: {
				currencyCode: string;
				units: number;
				nanos: number;
			};
			baseFare: {
				currencyCode: string;
				units: number;
				nanos: number;
			};
			fee: {
				currencyCode: string;
				units: number;
				nanos: number;
			};
			tax: {
				currencyCode: string;
				units: number;
				nanos: number;
			};
			totalRounded: {
				currencyCode: string;
				nanos: number;
				units: number;
			};
			moreTaxesAndFees: any;
			discount: {
				currencyCode: string;
				units: number;
				nanos: number;
			};
			totalWithoutDiscount: {
				currencyCode: string;
				units: number;
				nanos: number;
			};
			totalWithoutDiscountRounded: {
				currencyCode: string;
				nanos: number;
				units: number;
			};
		};
		travellerReference: string;
		travellerType: string;
	}>;
	priceDisplayRequirements: Array<any>;
	pointOfSale: string;
	tripType: string;
	offerReference: string;
	travellerDataRequirements: Array<string>;
	bookerDataRequirement: Array<string>;
	travellers: Array<{
		travellerReference: string;
		type: string;
		age?: number;
	}>;
	posMismatch: {
		detectedPointOfSale: string;
		isPOSMismatch: boolean;
		offerSalesCountry: string;
	};
	includedProductsBySegment: Array<Array<any>>;
	includedProducts: {
		areAllSegmentsIdentical: boolean;
		segments: Array<any>;
	};
	extraProducts: Array<{
		type: string;
		priceBreakdown: {
			total: {
				currencyCode: string;
				units: number;
				nanos: number;
			};
			baseFare: {
				currencyCode: string;
				units: number;
				nanos: number;
			};
			fee: {
				currencyCode: string;
				units: number;
				nanos: number;
			};
			tax: {
				currencyCode: string;
				units: number;
				nanos: number;
			};
			moreTaxesAndFees: any;
			discount: {
				currencyCode: string;
				units: number;
				nanos: number;
			};
			totalWithoutDiscount: {
				currencyCode: string;
				units: number;
				nanos: number;
			};
		};
	}>;
	offerExtras: {
		flexibleTicket: {
			airProductReference: string;
			travellers: Array<string>;
			recommendation: {
				recommended: boolean;
				confidence: string;
			};
			priceBreakdown: {
				total: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				baseFare: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				fee: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				tax: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				totalRounded: {
					currencyCode: string;
					nanos: number;
					units: number;
				};
				moreTaxesAndFees: any;
				discount: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				totalWithoutDiscount: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				totalWithoutDiscountRounded: {
					currencyCode: string;
					nanos: number;
					units: number;
				};
			};
			supplierInfo: {
				name: string;
				termsUrl: string;
				privacyPolicyUrl: string;
			};
		};
	};
	ancillaries: {
		checkedInBaggage: {
			airProductReference: string;
			options: Array<{
				luggageAllowance: {
					luggageType: string;
					ruleType: string;
					maxPiece: number;
					maxWeightPerPiece: number;
					massUnit: string;
				};
				priceBreakdown: {
					total: {
						currencyCode: string;
						units: number;
						nanos: number;
					};
					baseFare: {
						currencyCode: string;
						units: number;
						nanos: number;
					};
					fee: {
						currencyCode: string;
						units: number;
						nanos: number;
					};
					tax: {
						currencyCode: string;
						units: number;
						nanos: number;
					};
					moreTaxesAndFees: any;
					discount: {
						currencyCode: string;
						units: number;
						nanos: number;
					};
					totalWithoutDiscount: {
						currencyCode: string;
						units: number;
						nanos: number;
					};
				};
				travellers: Array<string>;
				preSelected: boolean;
			}>;
		};
		flexibleTicket: {
			airProductReference: string;
			travellers: Array<string>;
			priceBreakdown: {
				total: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				baseFare: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				fee: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				tax: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				moreTaxesAndFees: any;
				discount: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				totalWithoutDiscount: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
			};
			preSelected: boolean;
			recommendation: {
				recommended: boolean;
				confidence: string;
			};
			supplierInfo: {
				name: string;
				termsUrl: string;
				privacyPolicyUrl: string;
			};
		};
		travelInsurance: {
			options: {
				type: string;
				travellers: Array<string>;
				priceBreakdown: {
					total: {
						currencyCode: string;
						units: number;
						nanos: number;
					};
					baseFare: {
						currencyCode: string;
						units: number;
						nanos: number;
					};
					fee: {
						currencyCode: string;
						units: number;
						nanos: number;
					};
					tax: {
						currencyCode: string;
						units: number;
						nanos: number;
					};
					moreTaxesAndFees: any;
					discount: {
						currencyCode: string;
						units: number;
						nanos: number;
					};
					totalWithoutDiscount: {
						currencyCode: string;
						units: number;
						nanos: number;
					};
				};
				disclaimer: string;
				termsAndConditionsUrl: string;
				productInformationDocumentUrl: string;
			};
			documents: {
				terms_and_conditions: string;
			};
			content: {
				header: string;
				subheader: string;
				optInTitle: string;
				optOutTitle: string;
				exclusions: Array<string>;
				coveredStatusLabel: string;
				notCoveredStatusLabel: string;
				benefitsTitle: string;
				closeA11y: string;
				paxStatus: string;
				benefits: Array<string>;
				finePrint: Array<string>;
			};
			forceForAllTravellers: boolean;
			isPerTraveller: boolean;
			version: number;
			recommendation: {
				recommended: boolean;
				confidence: string;
			};
		};
	};
	brandedFareInfo: {
		fareName: string;
		cabinClass: string;
		features: Array<any>;
		fareAttributes: Array<any>;
		nonIncludedFeaturesRequired: boolean;
		nonIncludedFeatures: Array<any>;
	};
	appliedDiscounts: Array<any>;
	offerKeyToHighlight: string;
	baggagePolicies: Array<{
		code: string;
		name: string;
		url: string;
	}>;
	extraProductDisplayRequirements: any;
	carbonEmissions: {
		footprintForOffer: {
			quantity: number;
			unit: string;
			status: string;
			average: number;
			percentageDifference: number;
		};
		faqUrl: string;
	};
	displayOptions: {
		skipExtrasPage: boolean;
	};
};
export interface ISegment {
	departureAirport: {
		type: string;
		code: string;
		name: string;
		city: string;
		cityName: string;
		country: string;
		countryName: string;
		province: string;
	};
	arrivalAirport: {
		type: string;
		code: string;
		name: string;
		city: string;
		cityName: string;
		country: string;
		countryName: string;
		province: string;
	};
	departureTime: string;
	arrivalTime: string;
	legs: Array<{
		departureTime: string;
		arrivalTime: string;
		departureAirport: {
			type: string;
			code: string;
			name: string;
			city: string;
			cityName: string;
			country: string;
			countryName: string;
			province: string;
		};
		arrivalAirport: {
			type: string;
			code: string;
			name: string;
			city: string;
			cityName: string;
			country: string;
			countryName: string;
			province: string;
		};
		cabinClass: string;
		flightInfo: {
			facilities: Array<any>;
			flightNumber: number;
			planeType: string;
			carrierInfo: {
				operatingCarrier: string;
				marketingCarrier: string;
				operatingCarrierDisclosureText: string;
			};
		};
		carriers: Array<string>;
		carriersData: Array<{
			name: string;
			code: string;
			logo: string;
		}>;
		totalTime: number;
		flightStops: Array<any>;
		amenities: Array<any>;
	}>;
	totalTime: number;
	travellerCheckedLuggage: Array<any>;
	travellerCabinLuggage: Array<any>;
	isAtolProtected: boolean;
	showWarningDestinationAirport: boolean;
	showWarningOriginAirport: boolean;
}

export type TResListFlight = {
	aggregation: {
		totalCount: number;
		filteredTotalCount: number;
		stops: Array<{
			numberOfStops: number;
			count: number;
			minPrice: {
				currencyCode: string;
				units: number;
				nanos: number;
			};
			minPriceRound: {
				currencyCode: string;
				units: number;
				nanos: number;
			};
		}>;
		airlines: Array<{
			name: string;
			logoUrl: string;
			iataCode: string;
			count: number;
			minPrice: {
				currencyCode: string;
				units: number;
				nanos: number;
			};
		}>;
		departureIntervals: Array<{
			start: string;
			end: string;
		}>;
		flightTimes: Array<{
			arrival: Array<{
				start: string;
				end: string;
				count: number;
			}>;
			departure: Array<{
				start: string;
				end: string;
				count: number;
			}>;
		}>;
		shortLayoverConnection: {
			count: number;
		};
		durationMin: number;
		durationMax: number;
		minPrice: {
			currencyCode: string;
			units: number;
			nanos: number;
		};
		minRoundPrice: {
			currencyCode: string;
			units: number;
			nanos: number;
		};
		minPriceFiltered: {
			currencyCode: string;
			units: number;
			nanos: number;
		};
		baggage: Array<{
			paramName: string;
			count: number;
			enabled: boolean;
			baggageType: string;
		}>;
		budget: {
			paramName: string;
			min: {
				currencyCode: string;
				units: number;
				nanos: number;
			};
			max: {
				currencyCode: string;
				units: number;
				nanos: number;
			};
		};
		budgetPerAdult: {
			paramName: string;
			min: {
				currencyCode: string;
				units: number;
				nanos: number;
			};
			max: {
				currencyCode: string;
				units: number;
				nanos: number;
			};
		};
		duration: Array<{
			min: number;
			max: number;
			durationType: string;
			enabled: boolean;
			paramName: string;
		}>;
		filtersOrder: Array<string>;
	};
	flightOffers: Array<{
		token: string;
		segments: Array<{
			departureAirport: {
				type: string;
				code: string;
				name: string;
				city: string;
				cityName: string;
				country: string;
				countryName: string;
				province: string;
			};
			arrivalAirport: {
				type: string;
				code: string;
				name: string;
				city: string;
				cityName: string;
				country: string;
				countryName: string;
				province: string;
			};
			departureTime: string;
			arrivalTime: string;
			legs: Array<{
				departureTime: string;
				arrivalTime: string;
				departureAirport: {
					type: string;
					code: string;
					name: string;
					city: string;
					cityName: string;
					country: string;
					countryName: string;
					province: string;
				};
				arrivalAirport: {
					type: string;
					code: string;
					name: string;
					city: string;
					cityName: string;
					country: string;
					countryName: string;
					province: string;
				};
				cabinClass: string;
				flightInfo: {
					facilities: Array<any>;
					flightNumber: number;
					planeType: string;
					carrierInfo: {
						operatingCarrier: string;
						marketingCarrier: string;
						operatingCarrierDisclosureText: string;
					};
				};
				carriers: Array<string>;
				carriersData: Array<{
					name: string;
					code: string;
					logo: string;
				}>;
				totalTime: number;
				flightStops: Array<any>;
				amenities: Array<any>;
			}>;
			totalTime: number;
			travellerCheckedLuggage: Array<any>;
			travellerCabinLuggage: Array<{
				travellerReference: string;
				luggageAllowance: {
					luggageType: string;
					maxPiece: number;
					maxWeightPerPiece: number;
					massUnit: string;
					sizeRestrictions: {
						maxLength: number;
						maxWidth: number;
						maxHeight: number;
						sizeUnit: string;
					};
				};
				personalItem: boolean;
			}>;
			isAtolProtected: boolean;
			showWarningDestinationAirport: boolean;
			showWarningOriginAirport: boolean;
		}>;
		priceBreakdown: {
			total: {
				currencyCode: string;
				units: number;
				nanos: number;
			};
			baseFare: {
				currencyCode: string;
				units: number;
				nanos: number;
			};
			fee: {
				currencyCode: string;
				units: number;
				nanos: number;
			};
			tax: {
				currencyCode: string;
				units: number;
				nanos: number;
			};
			totalRounded: {
				currencyCode: string;
				nanos: number;
				units: number;
			};
			moreTaxesAndFees: any;
			discount: {
				currencyCode: string;
				units: number;
				nanos: number;
			};
			totalWithoutDiscount: {
				currencyCode: string;
				units: number;
				nanos: number;
			};
			totalWithoutDiscountRounded: {
				currencyCode: string;
				nanos: number;
				units: number;
			};
			carrierTaxBreakdown: Array<{
				carrier: {
					name: string;
					code: string;
					logo: string;
				};
				avgPerAdult: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				avgPerChild: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				avgPerInfant: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
			}>;
		};
		travellerPrices: Array<{
			travellerPriceBreakdown: {
				total: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				baseFare: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				fee: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				tax: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				totalRounded: {
					currencyCode: string;
					nanos: number;
					units: number;
				};
				moreTaxesAndFees: any;
				discount: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				totalWithoutDiscount: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				totalWithoutDiscountRounded: {
					currencyCode: string;
					nanos: number;
					units: number;
				};
			};
			travellerReference: string;
			travellerType: string;
		}>;
		priceDisplayRequirements: Array<any>;
		pointOfSale: string;
		tripType: string;
		posMismatch: {
			detectedPointOfSale: string;
			isPOSMismatch: boolean;
			offerSalesCountry: string;
		};
		includedProductsBySegment: Array<
			Array<{
				travellerReference: string;
				travellerProducts: Array<{
					type: string;
					product?: {
						luggageType: string;
						maxPiece: number;
						maxWeightPerPiece: number;
						massUnit: string;
						sizeRestrictions: {
							maxLength: number;
							maxWidth: number;
							maxHeight: number;
							sizeUnit: string;
						};
					};
				}>;
			}>
		>;
		includedProducts: {
			areAllSegmentsIdentical: boolean;
			segments: Array<
				Array<{
					luggageType: string;
					maxPiece: number;
					piecePerPax: number;
					maxWeightPerPiece?: number;
					massUnit?: string;
					sizeRestrictions?: {
						maxLength: number;
						maxWidth: number;
						maxHeight: number;
						sizeUnit: string;
					};
				}>
			>;
		};
		extraProducts: Array<{
			type: string;
			priceBreakdown: {
				total: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				baseFare: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				fee: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				tax: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				moreTaxesAndFees: any;
				discount: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				totalWithoutDiscount: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
			};
		}>;
		offerExtras: {
			flexibleTicket: {
				airProductReference: string;
				travellers: Array<string>;
				recommendation: {
					recommended: boolean;
					confidence: string;
				};
				priceBreakdown: {
					total: {
						currencyCode: string;
						units: number;
						nanos: number;
					};
					baseFare: {
						currencyCode: string;
						units: number;
						nanos: number;
					};
					fee: {
						currencyCode: string;
						units: number;
						nanos: number;
					};
					tax: {
						currencyCode: string;
						units: number;
						nanos: number;
					};
					totalRounded: {
						currencyCode: string;
						nanos: number;
						units: number;
					};
					moreTaxesAndFees: any;
					discount: {
						currencyCode: string;
						units: number;
						nanos: number;
					};
					totalWithoutDiscount: {
						currencyCode: string;
						units: number;
						nanos: number;
					};
					totalWithoutDiscountRounded: {
						currencyCode: string;
						nanos: number;
						units: number;
					};
				};
				supplierInfo: {
					name: string;
					termsUrl: string;
					privacyPolicyUrl: string;
				};
			};
		};
		ancillaries: {
			checkedInBaggage: {
				airProductReference: string;
				options: Array<{
					luggageAllowance: {
						luggageType: string;
						ruleType: string;
						maxPiece: number;
						maxWeightPerPiece: number;
						massUnit: string;
					};
					priceBreakdown: {
						total: {
							currencyCode: string;
							units: number;
							nanos: number;
						};
						baseFare: {
							currencyCode: string;
							units: number;
							nanos: number;
						};
						fee: {
							currencyCode: string;
							units: number;
							nanos: number;
						};
						tax: {
							currencyCode: string;
							units: number;
							nanos: number;
						};
						moreTaxesAndFees: any;
						discount: {
							currencyCode: string;
							units: number;
							nanos: number;
						};
						totalWithoutDiscount: {
							currencyCode: string;
							units: number;
							nanos: number;
						};
					};
					travellers: Array<string>;
					preSelected: boolean;
				}>;
			};
			flexibleTicket: {
				airProductReference: string;
				travellers: Array<string>;
				priceBreakdown: {
					total: {
						currencyCode: string;
						units: number;
						nanos: number;
					};
					baseFare: {
						currencyCode: string;
						units: number;
						nanos: number;
					};
					fee: {
						currencyCode: string;
						units: number;
						nanos: number;
					};
					tax: {
						currencyCode: string;
						units: number;
						nanos: number;
					};
					moreTaxesAndFees: any;
					discount: {
						currencyCode: string;
						units: number;
						nanos: number;
					};
					totalWithoutDiscount: {
						currencyCode: string;
						units: number;
						nanos: number;
					};
				};
				preSelected: boolean;
				recommendation: {
					recommended: boolean;
					confidence: string;
				};
				supplierInfo: {
					name: string;
					termsUrl: string;
					privacyPolicyUrl: string;
				};
			};
		};
		brandedFareInfo: {
			fareName: string;
			cabinClass: string;
			features: Array<{
				featureName: string;
				category: string;
				code: string;
				label: string;
				availability: string;
			}>;
			fareAttributes: Array<any>;
			nonIncludedFeaturesRequired: boolean;
			nonIncludedFeatures: Array<any>;
		};
		appliedDiscounts: Array<any>;
		offerKeyToHighlight: string;
		extraProductDisplayRequirements: any;
	}>;
	flightDeals: Array<{
		key: string;
		offerToken: string;
		price: {
			currencyCode: string;
			units: number;
			nanos: number;
		};
		travellerPrices: Array<{
			travellerPriceBreakdown: {
				total: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				baseFare: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				fee: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				tax: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				totalRounded: {
					currencyCode: string;
					nanos: number;
					units: number;
				};
				moreTaxesAndFees: any;
				discount: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				totalWithoutDiscount: {
					currencyCode: string;
					units: number;
					nanos: number;
				};
				totalWithoutDiscountRounded: {
					currencyCode: string;
					nanos: number;
					units: number;
				};
			};
			travellerReference: string;
			travellerType: string;
		}>;
	}>;
	atolProtectedStatus: string;
	searchId: string;
	banners: Array<any>;
	displayOptions: {
		brandedFaresShownByDefault: boolean;
		directFlightsOnlyFilterIgnored: boolean;
		hideFlexiblePricesBanner: boolean;
	};
	isOffersCabinClassExtended: boolean;
	cabinClassExtension: any;
	searchCriteria: {
		cabinClass: string;
	};
	baggagePolicies: Array<{
		code: string;
		name: string;
		url: string;
	}>;
	priceAlertStatus: {
		isEligible: boolean;
		isSearchEligible: boolean;
	};
};

export interface IFlightDetail {
	bookingDate: string;
	classOfService: string;
	customerId: string;
	endPoint: string;
	endTime: string;
	fltPrice: number;
	fltPriceCurrency: string;
	id: number;
	startPoint: string;
	startTime: string;
	status: string;
}
