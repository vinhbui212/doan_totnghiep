/* eslint-disable @typescript-eslint/no-explicit-any */
export type THotelItem = {
	hotel_id: number;
	accessibilityLabel: string;
	property: {
		isFirstPage: boolean;
		ufi: number;
		blockIds: Array<string>;
		reviewScoreWord: string;
		currency: string;
		wishlistName: string;
		reviewCount: number;
		checkoutDate: string;
		qualityClass: number;
		propertyClass: number;
		checkinDate: string;
		mainPhotoId: number;
		rankingPosition: number;
		longitude: number;
		checkin: {
			untilTime: string;
			fromTime: string;
		};
		accuratePropertyClass: number;
		countryCode: string;
		name: string;
		reviewScore: number;
		id: number;
		position: number;
		optOutFromGalleryChanges: number;
		latitude: number;
		photoUrls: Array<string>;
		priceBreakdown: {
			benefitBadges: Array<{
				text: string;
				explanation: string;
				identifier: string;
			}>;
			strikethroughPrice: {
				currency: string;
				value: number;
			};
			grossPrice: {
				value: number;
				currency: string;
			};
			taxExceptions: Array<any>;
		};
		checkout: {
			fromTime: string;
			untilTime: string;
		};
	};
};

export type THotelDetail = {
	ufi: number;
	hotel_id: number;
	hotel_name: string;
	url: string;
	hotel_name_trans: string;
	review_nr: number;
	arrival_date: string;
	departure_date: string;
	price_transparency_mode: string;
	accommodation_type_name: string;
	latitude: number;
	longitude: number;
	address: string;
	address_trans: string;
	city: string;
	city_trans: string;
	city_in_trans: string;
	city_name_en: string;
	district: any;
	countrycode: string;
	distance_to_cc: number;
	default_language: string;
	country_trans: string;
	currency_code: string;
	zip: string;
	timezone: string;
	rare_find_state: string;
	soldout: number;
	available_rooms: number;
	max_rooms_in_reservation: number;
	average_room_size_for_ufi_m2: string;
	is_family_friendly: number;
	is_closed: number;
	is_crimea: number;
	is_hotel_ctrip: number;
	is_price_transparent: number;
	is_genius_deal: number;
	is_cash_accepted_check_enabled: number;
	qualifies_for_no_cc_reservation: number;
	hotel_include_breakfast: number;
	opted_out_from_gallery_changes: number;
	cc1: string;
	family_facilities: Array<string>;
	product_price_breakdown: {
		gross_amount: {
			value: number;
			amount_rounded: string;
			currency: string;
			amount_unrounded: string;
		};
		strikethrough_amount_per_night: {
			value: number;
			amount_unrounded: string;
			amount_rounded: string;
			currency: string;
		};
		benefits: Array<{
			details: string;
			badge_variant: string;
			kind: string;
			identifier: string;
			name: string;
			icon: any;
		}>;
		all_inclusive_amount: {
			amount_unrounded: string;
			currency: string;
			amount_rounded: string;
			value: number;
		};
		all_inclusive_amount_hotel_currency: {
			currency: string;
			amount_rounded: string;
			amount_unrounded: string;
			value: number;
		};
		charges_details: {
			amount: {
				currency: string;
				value: number;
			};
			mode: string;
			translated_copy: string;
		};
		nr_stays: number;
		excluded_amount: {
			amount_rounded: string;
			currency: string;
			amount_unrounded: string;
			value: number;
		};
		strikethrough_amount: {
			value: number;
			amount_rounded: string;
			currency: string;
			amount_unrounded: string;
		};
		gross_amount_hotel_currency: {
			currency: string;
			amount_rounded: string;
			amount_unrounded: string;
			value: number;
		};
		gross_amount_per_night: {
			amount_unrounded: string;
			amount_rounded: string;
			currency: string;
			value: number;
		};
		items: Array<{
			item_amount: {
				value: number;
				amount_unrounded: string;
				currency: string;
				amount_rounded: string;
			};
			kind: string;
			base: {
				kind: string;
				percentage?: number;
			};
			inclusion_type?: string;
			name: string;
			details: string;
			identifier?: string;
		}>;
		has_long_stays_weekly_rate_price: number;
		included_taxes_and_charges_amount: {
			value: number;
			amount_unrounded: string;
			currency: string;
			amount_rounded: string;
		};
		discounted_amount: {
			amount_unrounded: string;
			amount_rounded: string;
			currency: string;
			value: number;
		};
		price_display_config: Array<{
			value: number;
			key: string;
		}>;
		client_translations: {
			tooltip_taxes_and_charges: string;
			tooltip_footnote_text: Array<string>;
			total_text: string;
			per_night_amount_prefix: string;
			amount_per_night_suffix: string;
			tooltip_total_text: string;
		};
		net_amount: {
			amount_unrounded: string;
			currency: string;
			amount_rounded: string;
			value: number;
		};
		has_long_stays_monthly_rate_price: number;
	};
	composite_price_breakdown: {
		all_inclusive_amount_hotel_currency: {
			value: number;
			amount_unrounded: string;
			amount_rounded: string;
			currency: string;
		};
		charges_details: {
			translated_copy: string;
			mode: string;
			amount: {
				value: number;
				currency: string;
			};
		};
		all_inclusive_amount: {
			currency: string;
			amount_rounded: string;
			amount_unrounded: string;
			value: number;
		};
		excluded_amount: {
			amount_rounded: string;
			currency: string;
			amount_unrounded: string;
			value: number;
		};
		strikethrough_amount: {
			amount_unrounded: string;
			amount_rounded: string;
			currency: string;
			value: number;
		};
		gross_amount: {
			value: number;
			amount_rounded: string;
			currency: string;
			amount_unrounded: string;
		};
		strikethrough_amount_per_night: {
			currency: string;
			amount_rounded: string;
			amount_unrounded: string;
			value: number;
		};
		benefits: Array<{
			details: string;
			badge_variant: string;
			kind: string;
			identifier: string;
			name: string;
			icon: any;
		}>;
		client_translations: {
			per_night_amount_prefix: string;
			tooltip_total_text: string;
			amount_per_night_suffix: string;
			total_text: string;
			tooltip_footnote_text: Array<string>;
			tooltip_taxes_and_charges: string;
		};
		has_long_stays_monthly_rate_price: number;
		net_amount: {
			value: number;
			amount_unrounded: string;
			amount_rounded: string;
			currency: string;
		};
		gross_amount_hotel_currency: {
			value: number;
			amount_unrounded: string;
			amount_rounded: string;
			currency: string;
		};
		gross_amount_per_night: {
			value: number;
			amount_unrounded: string;
			amount_rounded: string;
			currency: string;
		};
		items: Array<{
			kind: string;
			item_amount: {
				value: number;
				amount_unrounded: string;
				currency: string;
				amount_rounded: string;
			};
			base: {
				kind: string;
				percentage?: number;
			};
			inclusion_type?: string;
			details: string;
			name: string;
			identifier?: string;
		}>;
		included_taxes_and_charges_amount: {
			value: number;
			amount_unrounded: string;
			amount_rounded: string;
			currency: string;
		};
		discounted_amount: {
			currency: string;
			amount_rounded: string;
			amount_unrounded: string;
			value: number;
		};
		has_long_stays_weekly_rate_price: number;
		price_display_config: Array<{
			key: string;
			value: number;
		}>;
	};
	property_highlight_strip: Array<{
		icon_list: Array<{
			icon: string;
			size: number;
		}>;
		name: string;
		context: number;
	}>;
	facilities_block: {
		facilities: Array<{
			name: string;
			icon: string;
		}>;
		type: string;
		name: string;
	};
	top_ufi_benefits: Array<{
		translated_name: string;
		icon: string;
	}>;
	languages_spoken: {
		languagecode: Array<string>;
	};
	spoken_languages: Array<string>;
	breakfast_review_score: {
		rating: number;
		review_score_word: string;
		review_count: number;
		review_snippet: string;
		review_score: number;
		review_number: number;
	};
	wifi_review_score: {
		rating: number;
	};
	min_room_distribution: {
		children: Array<any>;
		adults: number;
	};
	tax_exceptions: Array<any>;
	booking_home: {
		is_aparthotel: number;
		checkin_methods: Array<any>;
		is_booking_home: number;
		group: string;
		is_vacation_rental: number;
		is_single_unit_property: number;
		segment: number;
		is_single_type_property: number;
		house_rules: Array<{
			icon: string;
			title: string;
			type: string;
			description: string;
		}>;
		quality_class: number;
	};
	aggregated_data: {
		has_seating: number;
		has_nonrefundable: number;
		has_refundable: number;
		common_kitchen_fac: Array<{
			name: string;
			id: number;
		}>;
		has_kitchen: number;
	};
	last_reservation: {
		country: any;
		countrycode: any;
		time: string;
	};
	free_facilities_cancel_breakfast: Array<{
		facility_id: number;
	}>;
	room_recommendation: Array<{
		children: number;
		number_of_extra_babycots: number;
		babies: number;
		number_of_extra_beds_and_babycots_total: number;
		extra_babycots_price: number;
		extra_beds_for_adults_price_in_hotel_currency: number;
		block_id: string;
		extra_beds_for_children_price: number;
		number_of_extra_beds_for_adults: number;
		extra_beds_for_children_price_in_hotel_currency: number;
		extra_beds_for_adults_price: number;
		extra_babycots_price_in_hotel_currency: number;
		total_extra_bed_price_in_hotel_currency: number;
		adults: number;
		number_of_extra_beds_for_children: number;
		total_extra_bed_price: number;
	}>;
	hotel_text: any;
	districts: Array<number>;
	preferences: Array<any>;
	hotel_important_information_with_codes: Array<{
		sentence_id: number;
		executing_phase: number;
		phrase: string;
	}>;
	rooms: {
		"1298553402": {
			children_and_beds_text: {
				cribs_and_extra_beds: Array<{
					highlight: number;
					text: string;
				}>;
				age_intervals: Array<{
					max_age: number;
					types_by_price: Array<Array<string>>;
					min_age: number;
					group_by_price: {
						"free,per_night,0": Array<string>;
					};
					crib: {
						price_mode: string;
						price_type_n: number;
						guaranteed: number;
						price_mode_n: number;
						price_type: string;
						price: number;
						id: number;
					};
				}>;
				children_at_the_property: Array<{
					text: string;
					highlight: number;
				}>;
				allow_children: number;
			};
			photos: Array<{
				url_original: string;
				url_square60: string;
				url_max300: string;
				photo_id: number;
				ratio: number;
				url_square180: string;
				url_max1280: string;
				url_640x200: string;
				last_update_date: string;
				new_order: number;
				url_max750: string;
			}>;
			facilities: Array<{
				alt_facilitytype_id: number;
				id: number;
				alt_facilitytype_name: string;
				name: string;
				facilitytype_id: number;
			}>;
			photos_may_sorted: number;
			bed_configurations: Array<{
				bed_types: Array<{
					name: string;
					bed_type: number;
					name_with_count: string;
					description_localized: any;
					count: number;
					description: string;
					description_imperial: string;
				}>;
			}>;
			private_bathroom_highlight: {
				has_highlight: number;
			};
			highlights: Array<{
				icon: string;
				translated_name: string;
				id?: number;
			}>;
			private_bathroom_count: number;
			description: string;
		};
	};
	block: Array<{
		extrabed_available: number;
		bh_room_highlights: Array<{
			icon_list: Array<{
				size: number;
				icon: string;
			}>;
			name: string;
			context: number;
		}>;
		paymentterms: {
			cancellation: {
				timeline: {
					nr_stages: number;
					policygroup_instance_id: string;
					stages: Array<{
						date_until?: string;
						u_stage_fee_pretty: string;
						u_fee: string;
						stage_fee_pretty: string;
						u_fee_remaining_pretty: string;
						fee_remaining_pretty: string;
						stage_fee: number;
						limit_until_time: string;
						current_stage: number;
						limit_timezone: string;
						u_fee_remaining: string;
						effective_number: number;
						limit_from_time: string;
						u_fee_pretty: string;
						fee_rounded: number;
						limit_from: string;
						limit_until: string;
						fee: number;
						is_free: number;
						limit_until_raw: string;
						stage_translation: string;
						text: string;
						limit_from_date: string;
						b_state: string;
						b_number: number;
						is_effective: number;
						fee_remaining: number;
						limit_until_date: string;
						fee_pretty: string;
						u_stage_fee: string;
						limit_from_raw: string;
						text_refundable: string;
						date_from?: string;
						amount_pretty?: string;
						amount?: number;
					}>;
					u_currency_code: string;
					currency_code: string;
				};
				info: {
					timezone_offset: string;
					refundable_date: string;
					date_before_raw: string;
					refundable_date_midnight: string;
					time: string;
					is_midnight: number;
					date_before: string;
					date: string;
					date_raw: string;
					time_before_midnight: string;
					timezone: string;
					refundable: number;
				};
				type: string;
				bucket: string;
				non_refundable_anymore: number;
				guaranteed_non_refundable: number;
				type_translation: string;
				description: string;
			};
			prepayment: {
				type_translation: string;
				type_extended: string;
				timeline: {
					currency_code: string;
					policygroup_instance_id: string;
					nr_stages: number;
					stages: Array<{
						stage_fee?: number;
						fee_remaining_pretty?: string;
						limit_until_time?: string;
						amount: string;
						limit_timezone?: string;
						current_stage?: number;
						u_stage_fee_pretty?: string;
						u_fee?: string;
						amount_pretty: string;
						u_fee_remaining_pretty?: string;
						stage_fee_pretty?: string;
						text: string;
						is_effective?: number;
						b_number?: number;
						b_state?: string;
						limit_from_date?: string;
						fee_pretty?: string;
						limit_until_date?: string;
						fee_remaining?: number;
						limit_from_raw?: string;
						u_stage_fee?: string;
						u_fee_pretty?: string;
						limit_from_time?: string;
						u_fee_remaining?: string;
						effective_number?: number;
						fee_rounded?: number;
						is_free: number;
						fee?: number;
						limit_from?: string;
						limit_until?: string;
						limit_until_raw?: string;
						after_checkin?: number;
					}>;
					u_currency_code: string;
				};
				description: string;
				simple_translation: string;
				type: string;
				extended_type_translation: string;
				info: {
					is_midnight: any;
					time_before_midnight: any;
					time: any;
					date_before: any;
					timezone_offset: any;
					prepayment_at_booktime: number;
					date: any;
					refundable: string;
					timezone: any;
				};
			};
		};
		nr_adults: number;
		is_smart_deal: number;
		can_reserve_free_parking: number;
		genius_discount_percentage: number;
		all_inclusive: number;
		half_board: number;
		number_of_bedrooms: number;
		refundable: number;
		nr_children: number;
		smoking: number;
		refundable_until: string;
		room_surface_in_feet2: number;
		bundle_extras: {
			benefits: Array<{
				icon: string;
				title: string;
				details: Array<string>;
				name: string;
			}>;
			footer: Array<string>;
			generated_name: string;
			highlighted_text: string;
		};
		is_domestic_rate: number;
		babycots_available_amount: any;
		is_last_minute_deal: number;
		children_ages: Array<any>;
		room_count: number;
		breakfast_included: number;
		number_of_bathrooms: number;
		pod_ios_migrate_policies_to_smp_fullon: number;
		max_occupancy: string;
		is_genius_deal: any;
		deposit_required: number;
		is_secret_deal: number;
		must_reserve_free_parking: number;
		max_children_free: number;
		name: string;
		babycots_available: number;
		name_without_policy: string;
		is_flash_deal: number;
		max_children_free_age: number;
		room_surface_in_m2: number;
		package_id: number;
		full_board: number;
		block_text: {
			policies: Array<{
				class: string;
				content: string;
				mealplan_vector?: string;
			}>;
		};
		block_id: string;
		mealplan: string;
		extrabed_available_amount: any;
		is_block_fit: number;
		roomtype_id: number;
		room_id: number;
		deals: {
			deal_attributes: {
				has_secret_channel_option: number;
			};
		};
		room_name: string;
	}>;
	rawData: {
		checkin: {
			fromTime: string;
			untilTime: string;
		};
		reviewScoreWord: string;
		isFirstPage: boolean;
		name: string;
		isHighlightedHotel: boolean;
		countryCode: string;
		wishlistName: string;
		rankingPosition: number;
		photoUrls: Array<string>;
		accuratePropertyClass: number;
		longitude: number;
		isTPI: boolean;
		checkinDate: string;
		qualityClass: number;
		position: number;
		optOutFromGalleryChanges: number;
		id: number;
		blockIds: Array<string>;
		mainPhotoId: number;
		priceBreakdown: {
			taxExceptions: Array<any>;
			benefitBadges: Array<any>;
			grossPrice: {
				value: number;
				currency: string;
				amountRounded: string;
			};
			chargesInfo: string;
		};
		checkoutDate: string;
		latitude: number;
		checkout: {
			fromTime: string;
			untilTime: string;
		};
		ufi: number;
		currency: string;
		propertyClass: number;
		reviewScore: number;
		reviewCount: number;
	};
};

export interface IImagesHotel {
	id: number;
	url?: string;
}
