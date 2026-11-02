import type { ComponentProps } from "react";
import { Slot } from "radix-ui";
import { cn } from "cn";

type LinkProps = ComponentProps<"a"> & { asChild?: boolean };

export function Link({ className, asChild = false, ...props }: LinkProps) {
    const Component = asChild ? Slot.Root : "a";

    return (
        <Component
            data-slot="link"
            className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-sm text-sm font-medium underline-offset-4 transition-shadow",
                "focus-visible:ring-primary focus-visible:ring-offset-background hover:underline focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none active:scale-95",
                className
            )}
            {...props}
        />
    );
}
