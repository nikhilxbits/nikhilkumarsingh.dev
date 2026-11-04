import type { SyntheticEvent } from "react";
import { describe, expect, it, vi } from "vitest";

import { composeEventHandlers } from "./compose-event-handlers";

describe("composeEventHandlers", () => {
    it("calls handlers in order with the same event", () => {
        const firstHandler = vi.fn();
        const secondHandler = vi.fn();
        const event = { type: "click" } as SyntheticEvent<HTMLDivElement>;

        composeEventHandlers(firstHandler, secondHandler)(event);

        expect(firstHandler).toHaveBeenCalledExactlyOnceWith(event);
        expect(secondHandler).toHaveBeenCalledExactlyOnceWith(event);
        expect(firstHandler.mock.invocationCallOrder[0]).toBeLessThan(secondHandler.mock.invocationCallOrder[0]);
    });

    it("skips undefined handlers", () => {
        const handler = vi.fn();
        const event = { type: "click" } as SyntheticEvent<HTMLDivElement>;

        composeEventHandlers(undefined, handler, undefined)(event);

        expect(handler).toHaveBeenCalledExactlyOnceWith(event);
    });

    it("does nothing when there are no handlers", () => {
        const event = { type: "click" } as SyntheticEvent<HTMLDivElement>;

        expect(() => composeEventHandlers()(event)).not.toThrow();
    });
});
