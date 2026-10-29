import parsePhoneNumber from "libphonenumber-js/max";

type GetFormattedPhoneNumber = { phoneNumber: string; uri: string };

export function getFormattedPhoneNumber(input: string): GetFormattedPhoneNumber {
    const result = parsePhoneNumber(input);

    if (result) {
        if (result.isValid()) return { phoneNumber: result.formatInternational(), uri: result.getURI() };
        else return { phoneNumber: "PROVIDED PHONE NUMBER IS NOT VALID", uri: "#" };
    } else return { phoneNumber: input, uri: "#" };
}
