import { describe, expect, it } from "vitest";

import { getFormattedPhoneNumber } from "./phone-number";

describe("getFormattedPhoneNumber", () => {
    it("formats a valid phone number and returns its telephone URI", () => {
        expect(getFormattedPhoneNumber("+12133734253")).toEqual({
            phoneNumber: "+1 213 373 4253",
            uri: "tel:+12133734253"
        });
    });

    it("returns an error message for a parsed but invalid phone number", () => {
        expect(getFormattedPhoneNumber("+1213373425")).toEqual({
            phoneNumber: "PROVIDED PHONE NUMBER IS NOT VALID",
            uri: "#"
        });
    });

    it("rejects a correctly sized phone number with invalid digits", () => {
        expect(getFormattedPhoneNumber("+6521234567")).toEqual({
            phoneNumber: "PROVIDED PHONE NUMBER IS NOT VALID",
            uri: "#"
        });
    });

    it("returns the original input when it cannot be parsed", () => {
        expect(getFormattedPhoneNumber("not a phone number")).toEqual({
            phoneNumber: "not a phone number",
            uri: "#"
        });
    });
});
