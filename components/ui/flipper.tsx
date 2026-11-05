"use client";

import { forwardRef, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "cn";

type FlipperProps = { duration?: number; text: string; className?: string };

type FlipperItemProps = {
    character: string;
    changed: boolean;
    duration: number;
    index: number;
    reduceMotion: boolean;
};

export function Flipper({ text, duration = 0.5, className }: FlipperProps) {
    if (typeof text !== "string") throw new TypeError("Flipper text must be a string.");
    if (!Number.isFinite(duration) || duration < 0)
        throw new RangeError("Flipper duration must be a finite, non-negative number.");

    const reduceMotion = useReducedMotion() ?? false;
    const characters = useMemo(
        () =>
            Array.from(
                new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text),
                ({ segment }) => segment
            ),
        [text]
    );

    const [previousCharacters, setPreviousCharacters] = useState(characters);

    const changedCharacters = useMemo(
        () =>
            characters.map((character, index) => ({
                character,
                changed: character !== previousCharacters[index],
                index
            })),
        [characters, previousCharacters]
    );

    useEffect(() => {
        const frameId = window.requestAnimationFrame(() => setPreviousCharacters(characters));

        return () => window.cancelAnimationFrame(frameId);
    }, [characters]);

    return (
        <div
            data-slot="flipper"
            className={cn("flex items-center gap-0.5 overflow-hidden text-sm font-medium", className)}
        >
            <div aria-atomic="true" aria-live="polite" className="sr-only">
                {text}
            </div>
            <AnimatePresence initial={false} mode="popLayout">
                {changedCharacters.map(({ character, changed, index }) => (
                    <FlipperItem
                        key={`${index}-${character}`}
                        character={character}
                        changed={changed}
                        duration={duration}
                        index={index}
                        reduceMotion={reduceMotion}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}

const FlipperItem = forwardRef<HTMLDivElement, FlipperItemProps>(function FlipperItem(
    { character, changed, duration, index, reduceMotion },
    ref
) {
    return (
        <motion.div
            ref={ref}
            data-slot="flipper-item"
            aria-hidden="true"
            animate={{ opacity: 1, y: "0%" }}
            className="bg-muted relative inline-flex size-[1.5em] shrink-0 items-center justify-center overflow-hidden rounded border border-dashed"
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: "-100%" }}
            initial={changed && !reduceMotion ? { opacity: 0.35, y: "100%" } : false}
            transition={{
                duration: reduceMotion ? 0 : duration,
                delay: changed && !reduceMotion && duration > 0 ? Math.min(index * 0.015, 0.12) : 0,
                ease: [0.22, 0.68, 0, 1]
            }}
        >
            <span className="absolute inset-0 flex items-center justify-center text-center leading-none">
                {character === " " ? "\u00a0" : character}
            </span>
        </motion.div>
    );
});
