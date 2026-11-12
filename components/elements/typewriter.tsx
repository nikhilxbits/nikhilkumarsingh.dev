"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "cn";

type TypewriterProps = {
    words: readonly string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
    loop?: boolean;
    cursor?: boolean;
    className?: string;
};

type AnimationState = {
    words: readonly string[];
    wordIndex: number;
    characterCount: number;
    isDeleting: boolean;
    announcement: string;
};

function initialAnimationState(words: readonly string[]): AnimationState {
    return { words, wordIndex: 0, characterCount: 0, isDeleting: false, announcement: "" };
}

function segmentText(text: string) {
    if (typeof Intl.Segmenter === "function")
        return Array.from(
            new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text),
            ({ segment }) => segment
        );

    return Array.from(text);
}

function validateDuration(name: string, value: number) {
    if (!Number.isFinite(value) || value < 0) throw new RangeError(`${name} must be a finite, non-negative number.`);
}

export function Typewriter({
    words,
    typingSpeed = 80,
    deletingSpeed = 40,
    pauseDuration = 1_500,
    loop = true,
    cursor = true,
    className
}: TypewriterProps) {
    if (!Array.isArray(words) || words.length === 0 || words.some((word) => typeof word !== "string"))
        throw new TypeError("Typewriter words must be a non-empty array of strings.");

    validateDuration("Typewriter TypingSpeed", typingSpeed);
    validateDuration("Typewriter DeletingSpeed", deletingSpeed);
    validateDuration("Typewriter PauseDuration", pauseDuration);

    const prefersReducedMotion = useReducedMotion() ?? false;
    const segmentedWords = useMemo(() => words.map(segmentText), [words]);

    const [animation, setAnimation] = useState(() => initialAnimationState(words));

    const { wordIndex, characterCount, isDeleting, announcement } =
        animation.words === words ? animation : initialAnimationState(words);

    const currentWord = words[wordIndex] ?? words[0];
    const currentCharacters = segmentedWords[wordIndex] ?? segmentedWords[0];
    const visibleCharacterCount = prefersReducedMotion ? currentCharacters.length : characterCount;

    const updateAnimation = useCallback(
        (update: (state: AnimationState) => AnimationState) => {
            setAnimation((previous) => (previous.words === words ? update(previous) : initialAnimationState(words)));
        },
        [words]
    );

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout> | undefined;

        if (prefersReducedMotion) {
            if (wordIndex === words.length - 1 && !loop) return;

            timeoutId = setTimeout(() => {
                updateAnimation((state) => ({
                    ...state,
                    wordIndex: state.wordIndex === words.length - 1 ? 0 : state.wordIndex + 1,
                    characterCount: 0,
                    isDeleting: false
                }));
            }, pauseDuration);
        } else if (isDeleting) {
            if (characterCount > 0) {
                timeoutId = setTimeout(
                    () => updateAnimation((state) => ({ ...state, characterCount: state.characterCount - 1 })),
                    deletingSpeed
                );
            } else {
                timeoutId = setTimeout(
                    () =>
                        updateAnimation((state) => ({
                            ...state,
                            isDeleting: false,
                            wordIndex: state.wordIndex === words.length - 1 ? 0 : state.wordIndex + 1
                        })),
                    0
                );
            }
        } else if (characterCount < currentCharacters.length) {
            timeoutId = setTimeout(
                () => updateAnimation((state) => ({ ...state, characterCount: state.characterCount + 1 })),
                typingSpeed
            );
        } else {
            timeoutId = setTimeout(
                () => {
                    updateAnimation((state) =>
                        wordIndex === words.length - 1 && !loop
                            ? { ...state, announcement: currentWord }
                            : { ...state, announcement: currentWord, isDeleting: true }
                    );
                },
                wordIndex === words.length - 1 && !loop ? 0 : pauseDuration
            );
        }

        return () => {
            if (timeoutId !== undefined) clearTimeout(timeoutId);
        };
    }, [
        characterCount,
        currentCharacters,
        currentWord,
        deletingSpeed,
        isDeleting,
        loop,
        pauseDuration,
        prefersReducedMotion,
        typingSpeed,
        updateAnimation,
        wordIndex,
        words.length
    ]);

    return (
        <div data-slot="typewriter" className={cn("inline-block text-sm leading-none font-medium", className)}>
            <div aria-hidden="true" className="flex items-center">
                <div className="whitespace-pre-wrap">
                    {currentCharacters.slice(0, visibleCharacterCount).map((character, index) => (
                        <motion.span
                            key={`${index}-${character}`}
                            initial={prefersReducedMotion ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.12 }}
                        >
                            {character}
                        </motion.span>
                    ))}
                </div>
                {cursor && (
                    <motion.div
                        aria-hidden="true"
                        className="ml-0.5 inline-block h-4 w-0.5 bg-current"
                        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: [1, 0] }}
                        transition={prefersReducedMotion ? undefined : { duration: 0.8, repeat: Infinity }}
                    />
                )}
            </div>
            <span aria-atomic="true" aria-live="polite" className="sr-only">
                {prefersReducedMotion ? currentWord : announcement}
            </span>
        </div>
    );
}
