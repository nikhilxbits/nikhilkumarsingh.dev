import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getGreetingText } from "./greeting-text";

describe("getGreetingText", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it.each([
        { hour: 0, greeting: "hi there" },
        { hour: 4, greeting: "hi there" },
        { hour: 5, greeting: "good morning" },
        { hour: 11, greeting: "good morning" },
        { hour: 12, greeting: "good afternoon" },
        { hour: 16, greeting: "good afternoon" },
        { hour: 17, greeting: "good evening" },
        { hour: 20, greeting: "good evening" },
        { hour: 21, greeting: "hi there" }
    ])("returns '$greeting' at $hour:00", ({ hour, greeting }) => {
        vi.setSystemTime(new Date(2024, 0, 1, hour));

        expect(getGreetingText()).toBe(greeting);
    });
});
