"use client";

import {
    createContext,
    useContext,
    useState,
    type ComponentProps,
    type PointerEvent as ReactPointerEvent,
    type ReactNode
} from "react";
import { cn } from "cn";
import { AnimatePresence, motion } from "motion/react";
import { Portal } from "radix-ui";

import { composeEventHandlers } from "@/lib/compose-event-handlers";

// Component is inspired by @aceternity-ui
// Thanks @aceternity-ui

type PointerPosition = {
    x: number;
    y: number;
    clientX: number;
    clientY: number;
    contentLeft: number;
    contentTop: number;
    contentWidth: number;
    contentHeight: number;
    sourceLeft: number;
    sourceTop: number;
    sourceWidth: number;
    sourceHeight: number;
};

type MagnifiedContextValue = { children: ReactNode; pointer: PointerPosition | null; isMagnifiedCopy: boolean };

const MagnifiedContext = createContext<MagnifiedContextValue | undefined>(undefined);

function useMagnifiedContext(component: string) {
    const context = useContext(MagnifiedContext);

    if (!context) throw new Error(`${component} must be used inside Magnified.`);
    return context;
}

function Magnified({
    children,
    className,
    style,
    onPointerEnter,
    onPointerMove,
    onPointerLeave,
    ...props
}: ComponentProps<"div">) {
    const [pointer, setPointer] = useState<PointerPosition | null>(null);

    function updatePointer(event: ReactPointerEvent<HTMLDivElement>) {
        if (event.pointerType === "touch") return;

        const hasContent =
            event.currentTarget.childElementCount > 0 || Boolean(event.currentTarget.textContent?.trim());

        if (!hasContent) return;

        const bounds = event.currentTarget.getBoundingClientRect();
        const width = event.currentTarget.clientWidth;
        const height = event.currentTarget.clientHeight;
        const contentLeft = bounds.left + event.currentTarget.clientLeft;
        const contentTop = bounds.top + event.currentTarget.clientTop;

        if (width === 0 || height === 0) return;

        const childBounds = Array.from(event.currentTarget.children)
            .map((child) => child.getBoundingClientRect())
            .filter((childBounds) => childBounds.width > 0 && childBounds.height > 0);

        const sourceLeft = childBounds.length
            ? Math.min(...childBounds.map((childBounds) => childBounds.left)) - contentLeft
            : 0;

        const sourceTop = childBounds.length
            ? Math.min(...childBounds.map((childBounds) => childBounds.top)) - contentTop
            : 0;

        const sourceRight = childBounds.length
            ? Math.max(...childBounds.map((childBounds) => childBounds.right)) - contentLeft
            : width;

        const sourceBottom = childBounds.length
            ? Math.max(...childBounds.map((childBounds) => childBounds.bottom)) - contentTop
            : height;

        const x = Math.max(0, Math.min(event.clientX - contentLeft, width));
        const y = Math.max(0, Math.min(event.clientY - contentTop, height));

        setPointer({
            x,
            y,
            clientX: contentLeft + x,
            clientY: contentTop + y,
            contentLeft,
            contentTop,
            contentWidth: width,
            contentHeight: height,
            sourceLeft,
            sourceTop,
            sourceWidth: sourceRight - sourceLeft,
            sourceHeight: sourceBottom - sourceTop
        });
    }

    return (
        <div
            data-slot="magnified"
            className={cn("relative", className)}
            style={style}
            onPointerEnter={composeEventHandlers(updatePointer, onPointerEnter)}
            onPointerMove={composeEventHandlers(updatePointer, onPointerMove)}
            onPointerLeave={composeEventHandlers(() => setPointer(null), onPointerLeave)}
            {...props}
        >
            <MagnifiedContext.Provider value={{ children, pointer, isMagnifiedCopy: false }}>
                {children}
            </MagnifiedContext.Provider>
        </div>
    );
}

function MagnifiedGlass({
    lensSize = 120,
    zoom = 2,
    className
}: {
    lensSize?: number;
    zoom?: number;
    className?: string;
}) {
    const { children, pointer, isMagnifiedCopy } = useMagnifiedContext("MagnifiedGlass");

    if (isMagnifiedCopy) return null;

    const diameter = Math.max(0, lensSize);
    const radius = diameter / 2;
    const sourceWidth = pointer ? Math.max(pointer.sourceWidth, 1) : 1;
    const sourceHeight = pointer ? Math.max(pointer.sourceHeight, 1) : 1;
    const scale = pointer ? Math.max(zoom, diameter / Math.min(sourceWidth, sourceHeight)) : zoom;
    const minFocusX = pointer ? pointer.sourceLeft + radius / scale : 0;
    const minFocusY = pointer ? pointer.sourceTop + radius / scale : 0;
    const maxFocusX = pointer ? pointer.sourceLeft + pointer.sourceWidth - radius / scale : 0;
    const maxFocusY = pointer ? pointer.sourceTop + pointer.sourceHeight - radius / scale : 0;
    const focusX = pointer ? Math.max(minFocusX, Math.min(pointer.x, maxFocusX)) : 0;
    const focusY = pointer ? Math.max(minFocusY, Math.min(pointer.y, maxFocusY)) : 0;
    const left = pointer ? pointer.clientX - radius : 0;
    const top = pointer ? pointer.clientY - radius : 0;

    return (
        <Portal.Root>
            <AnimatePresence>
                {pointer && (
                    <motion.div
                        key="magnified-glass"
                        aria-hidden="true"
                        data-slot="magnified-glass"
                        className={cn(
                            "bg-background pointer-events-none fixed z-50 overflow-hidden rounded-full",
                            className
                        )}
                        initial={{ left, top, scale: 0, opacity: 0 }}
                        animate={{ left, top, scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 45, mass: 0.2 }}
                        style={{ width: diameter, height: diameter }}
                    >
                        <motion.div
                            className="absolute origin-top-left"
                            style={{ width: pointer.contentWidth, height: pointer.contentHeight }}
                            initial={false}
                            animate={{
                                left: pointer.contentLeft - left,
                                top: pointer.contentTop - top,
                                x: pointer.x - focusX * scale,
                                y: pointer.y - focusY * scale,
                                scale
                            }}
                            transition={{ type: "spring", stiffness: 500, damping: 45, mass: 0.2 }}
                        >
                            <MagnifiedContext.Provider value={{ children, pointer, isMagnifiedCopy: true }}>
                                {children}
                            </MagnifiedContext.Provider>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Portal.Root>
    );
}

export { Magnified, MagnifiedGlass };
