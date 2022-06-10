import type { PhoneNumber } from "google-libphonenumber";

export const preloadValidation = () => {
	import("google-libphonenumber");
};
export const validatePhoneNumber = async (value: string) => {
	const { PhoneNumberUtil } = await import("google-libphonenumber");

	const instance = PhoneNumberUtil.getInstance();
	try {
		const phoneNumber = instance.parseAndKeepRawInput(value, "IS");
		return instance.isValidNumberForRegion(phoneNumber as PhoneNumber, "IS");
	} catch (e) {
		return false;
	}
};
