import {
	parsePhoneList,
	normalizePhoneNumber,
} from "../../src/util/phoneNumberUtils.js";
import { assert, test } from "vitest";

test("returns array of valid numbers", () => {
	const validPhoneList =
		'["1-754-799-3136", "754-799-3136", "+17547993136", "(754)799-3136", "+91-722-783-5250", "+91-897-771-8880"]';
	const result = parsePhoneList(validPhoneList);

	assert.equal(result.length, 6);
});

test("strips invalid numbers", () => {
	const weirdPhoneList =
		'["7548-7999-3136", "000-799-3136", "754-799-3136", "91-722-783-5250", "91(722)783-5250"]';
	/* the numbers `91-722-783-5250` and `91(722)783-5250` will not be a valid green numbers
        because we are parsing numbers only with "US" region-flag. `+91` allows the number to be parsed
        as an indian phone number. Just `91` will not be accepted. */
	const result = parsePhoneList(weirdPhoneList);

	assert.equal(result.length, 1);
});

test("should return the normalized phone number for valid numbers", () => {
	const phonePattern1 = "512-779-9030";
	const phonePattern2 = "5127799030";
	const phonePattern3 = "1.512.779.9030";
	const phonePattern4 = "1 512 779 9030";
	const phonePattern5 = "917227835250";
	const phonePattern6 = "+91-722-783-5250";
	const phonePattern7 = "91(722)783-5250";

	const normalized1 = normalizePhoneNumber(phonePattern1);
	const normalized2 = normalizePhoneNumber(phonePattern2);
	const normalized3 = normalizePhoneNumber(phonePattern3);
	const normalized4 = normalizePhoneNumber(phonePattern4);
	const normalized5 = normalizePhoneNumber(phonePattern5);
	const normalized6 = normalizePhoneNumber(phonePattern6);
	const normalized7 = normalizePhoneNumber(phonePattern7);

	let expectedNormalized = "15127799030";
	assert.equal(normalized1, expectedNormalized);
	assert.equal(normalized2, expectedNormalized);
	assert.equal(normalized3, expectedNormalized);
	assert.equal(normalized4, expectedNormalized);

	expectedNormalized = "917227835250";
	assert.equal(normalized5, expectedNormalized);
	assert.equal(normalized6, expectedNormalized);
	assert.equal(normalized7, expectedNormalized);
});
