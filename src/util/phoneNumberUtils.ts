import {
	PhoneNumber,
	PhoneNumberFormat,
	PhoneNumberUtil,
} from "google-libphonenumber";

import { is } from "./typeUtils";

const PHONE_UTIL = PhoneNumberUtil.getInstance();

export function parsePhoneList(
	phoneList: string | string[] | undefined,
): PhoneNumber[] {
	if (phoneList != null) {
		try {
			const phoneArray: unknown = Array.isArray(phoneList)
				? phoneList
				: JSON.parse(phoneList);
			if (
				Array.isArray(phoneArray) &&
				phoneArray.every(
					is<unknown, string>((s: unknown) =>
						typeof s === "string" ? s : undefined,
					),
				)
			) {
				const parsedNumbers = phoneArray.map((phoneString) =>
					PHONE_UTIL.parse(phoneString, "US"),
				);

				return parsedNumbers.filter(
					(number) =>
						PHONE_UTIL.isValidNumberForRegion(number, "US") ||
						PHONE_UTIL.isValidNumberForRegion(number, "IN"),
				);
			}

			return [];
		} catch {
			return [];
		}
	} else {
		return [];
	}
}

export function isPhoneNumberOnList(
	phoneNumber: string,
	phoneNumberList: libphonenumber.PhoneNumber[],
): boolean {
	if (phoneNumberList.length === 0) {
		return false;
	}

	return phoneNumberList.some((greenListedNum) => {
		const matchType = PHONE_UTIL.isNumberMatch(greenListedNum, phoneNumber);
		if (
			matchType === PhoneNumberUtil.MatchType.EXACT_MATCH ||
			matchType === PhoneNumberUtil.MatchType.NSN_MATCH ||
			matchType === PhoneNumberUtil.MatchType.SHORT_NSN_MATCH
		) {
			return true;
		}

		return false;
	});
}

export function normalizePhoneNumber(
	phoneNumber: string,
	format?: PhoneNumberFormat,
): string | undefined {
	try {
		if (/[a-z]/i.test(phoneNumber)) {
			return undefined;
		}
		let number = PHONE_UTIL.parse(phoneNumber, "US");
		if (PHONE_UTIL.isValidNumberForRegion(number, "US")) {
			return format
				? PHONE_UTIL.format(number, format)
				: `${number.getCountryCode()}${number.getNationalNumber()}`;
		}

		number = PHONE_UTIL.parse(phoneNumber, "IN");
		if (PHONE_UTIL.isValidNumberForRegion(number, "IN")) {
			return format
				? PHONE_UTIL.format(number, format)
				: `${number.getCountryCode()}${number.getNationalNumber()}`;
		}

		return undefined;
	} catch (err: unknown) {
		console.error(err);
		return undefined;
	}
}
