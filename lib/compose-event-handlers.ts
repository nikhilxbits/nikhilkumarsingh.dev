import type { SyntheticEvent } from "react";

type EventHandler<Event extends SyntheticEvent> = (event: Event) => void;

export function composeEventHandlers<Event extends SyntheticEvent>(
    ...handlers: Array<EventHandler<Event> | undefined>
): EventHandler<Event> {
    return (event) => {
        handlers.forEach((handler) => handler?.(event));
    };
}
