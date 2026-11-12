"use client";

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    useSyncExternalStore,
    type FocusEvent,
    type ReactNode,
    type RefObject
} from "react";
import { animate as animateElement, motion, useAnimationFrame, useMotionValue, useReducedMotion } from "motion/react";
import { cn } from "cn";

type MarqueeContextValue = {
    isAnimating: boolean;
    prefersReducedMotion: boolean;
    shouldEase: boolean;
    pauseOnHover: boolean;
    setHovered: (hovered: boolean) => void;
};

const MarqueeContext = createContext<MarqueeContextValue | undefined>(undefined);

function useMarqueeContext(componentName: string) {
    const context = useContext(MarqueeContext);

    if (!context) throw new Error(`${componentName} must be used inside Marquee.`);
    return context;
}

function isMarqueeTarget(target: EventTarget | null) {
    return target instanceof Element && target.closest('[data-slot="marquee"]') !== null;
}

function subscribeToVisibility(onChange: () => void) {
    document.addEventListener("visibilitychange", onChange);

    return () => document.removeEventListener("visibilitychange", onChange);
}

function getVisibilitySnapshot() {
    return document.visibilityState === "visible";
}

function getServerVisibilitySnapshot() {
    return true;
}

type MarqueeProps = {
    children: ReactNode;
    ariaLabel?: string;
    className?: string;
    trackClassName?: string;
    itemsGroupClassName?: string;
    pauseOnHover?: boolean;
    pauseOnFocus?: boolean;
    reverse?: boolean;
    speed?: number;
};

const SPEED_TRANSITION_DURATION = 0.7;

export function Marquee({
    children,
    ariaLabel = "Marquee Element",
    className,
    trackClassName,
    itemsGroupClassName,
    pauseOnHover = false,
    pauseOnFocus = false,
    reverse = false,
    speed = 40
}: MarqueeProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocusWithin, setIsFocusWithin] = useState(false);

    const isDocumentVisible = useSyncExternalStore(
        subscribeToVisibility,
        getVisibilitySnapshot,
        getServerVisibilitySnapshot
    );

    const viewportRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion() ?? false;

    const isPausedByInteraction = (pauseOnHover && isHovered) || (pauseOnFocus && isFocusWithin);
    const isAnimating = isDocumentVisible && !prefersReducedMotion && !isPausedByInteraction;
    const shouldEase = isDocumentVisible && !prefersReducedMotion && (isAnimating || isPausedByInteraction);

    const contextValue = useMemo(
        () => ({
            isAnimating,
            prefersReducedMotion,
            shouldEase,
            pauseOnHover,
            setHovered: setIsHovered
        }),
        [isAnimating, pauseOnHover, prefersReducedMotion, shouldEase]
    );

    function handleBlurCapture(event: FocusEvent<HTMLDivElement>) {
        if (!pauseOnFocus) return;

        if (
            !(event.relatedTarget instanceof Node) ||
            !event.currentTarget.contains(event.relatedTarget) ||
            !isMarqueeTarget(event.relatedTarget)
        )
            setIsFocusWithin(false);
    }

    function handleFocusCapture(event: FocusEvent<HTMLDivElement>) {
        if (pauseOnFocus && isMarqueeTarget(event.target)) setIsFocusWithin(true);
    }

    return (
        <MarqueeContext.Provider value={contextValue}>
            <div
                ref={viewportRef}
                data-slot="marquee"
                data-reverse={reverse ? "true" : "false"}
                data-playing={isAnimating ? "true" : "false"}
                aria-label={ariaLabel}
                aria-roledescription="marquee"
                aria-live="off"
                role="group"
                className={cn("overflow-hidden", className)}
                onMouseEnter={() => pauseOnHover && setIsHovered(true)}
                onMouseLeave={() => pauseOnHover && setIsHovered(false)}
                onFocusCapture={handleFocusCapture}
                onBlurCapture={handleBlurCapture}
            >
                <MarqueeTrack
                    reverse={reverse}
                    speed={speed}
                    viewportRef={viewportRef}
                    trackClassName={trackClassName}
                    itemsGroupClassName={itemsGroupClassName}
                >
                    {children}
                </MarqueeTrack>
            </div>
        </MarqueeContext.Provider>
    );
}

type MarqueeTrackProps = {
    children: ReactNode;
    reverse: boolean;
    speed: number;
    viewportRef: RefObject<HTMLDivElement | null>;
    trackClassName?: string;
    itemsGroupClassName?: string;
};

function MarqueeTrack({
    children,
    reverse,
    speed,
    viewportRef,
    trackClassName,
    itemsGroupClassName
}: MarqueeTrackProps) {
    const { isAnimating, prefersReducedMotion, shouldEase } = useMarqueeContext("MarqueeTrack");

    const [metrics, setMetrics] = useState({ distance: 0, copies: 2 });

    const groupRef = useRef<HTMLDivElement>(null);
    const position = useMotionValue(0);
    const phase = useMotionValue(0);
    const speedFactor = useMotionValue(0);
    const previousDistance = useRef(0);

    if (!Number.isFinite(speed) || speed <= 0) throw new RangeError("Marquee speed must be a finite, positive number.");

    useEffect(() => {
        const viewport = viewportRef.current;
        const group = groupRef.current;

        if (!viewport || !group) return;

        function updateMetrics(viewportElement: HTMLDivElement, groupElement: HTMLDivElement) {
            const groupBounds = groupElement.getBoundingClientRect();
            const distance = groupBounds.width;

            if (!Number.isFinite(distance) || distance <= 0) {
                return setMetrics((current) =>
                    current.distance === 0 && current.copies === 2 ? current : { distance: 0, copies: 2 }
                );
            }

            const copies = Math.max(2, Math.ceil(viewportElement.clientWidth / distance) + 1);

            setMetrics((current) =>
                Math.abs(current.distance - distance) < 0.5 && current.copies === copies
                    ? current
                    : { distance, copies }
            );
        }

        if (typeof ResizeObserver === "undefined") {
            window.addEventListener("resize", () => updateMetrics(viewport, group));

            return () => window.removeEventListener("resize", () => updateMetrics(viewport, group));
        }

        const observer = new ResizeObserver(() => updateMetrics(viewport, group));

        observer.observe(viewport);
        observer.observe(group);

        return () => observer.disconnect();
    }, [viewportRef]);

    useEffect(() => {
        if (metrics.distance <= 0) return;

        if (prefersReducedMotion) {
            phase.set(0);
            position.set(0);
            previousDistance.current = metrics.distance;
            return;
        }

        const previous = previousDistance.current;
        const nextPhase = previous > 0 ? (phase.get() / previous) * metrics.distance : 0;

        phase.set(nextPhase);
        position.set(reverse ? nextPhase - metrics.distance : -nextPhase);
        previousDistance.current = metrics.distance;
    }, [metrics.distance, phase, position, prefersReducedMotion, reverse]);

    useEffect(() => {
        const animation = animateElement(speedFactor, isAnimating ? 1 : 0, {
            duration: shouldEase ? SPEED_TRANSITION_DURATION : 0,
            ease: "easeInOut"
        });

        return () => animation.stop();
    }, [isAnimating, shouldEase, speedFactor]);

    useAnimationFrame((_, delta) => {
        const distance = metrics.distance;
        const currentSpeed = speedFactor.get();

        if (distance <= 0 || currentSpeed <= 0) return;

        const nextPhase = (phase.get() + (speed * currentSpeed * Math.min(delta, 64)) / 1_000) % distance;

        phase.set(nextPhase);
        position.set(reverse ? nextPhase - distance : -nextPhase);
    });

    return (
        <motion.div
            data-slot="marquee-track"
            className={cn("flex w-max flex-row", trackClassName)}
            style={{ x: position }}
        >
            {Array.from({ length: metrics.copies }, (_, index) => (
                <div
                    key={index}
                    ref={index === 0 ? groupRef : undefined}
                    data-slot="marquee-group"
                    aria-hidden={index > 0}
                    inert={index > 0}
                    className={cn("flex shrink-0 flex-row items-center", itemsGroupClassName)}
                >
                    {children}
                </div>
            ))}
        </motion.div>
    );
}
