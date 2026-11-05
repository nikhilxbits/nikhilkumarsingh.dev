import type { ComponentProps } from "react";
import { Slot } from "radix-ui";
import { cn } from "cn";

type IconBadgeProps = ComponentProps<"div"> & { asChild?: boolean };

export function IconBadge({ className, asChild = false, ...props }: IconBadgeProps) {
    const Component = asChild ? Slot.Root : "div";

    return (
        <Component
            data-slot="icon-badge"
            className={cn(
                "ring-offset-background ring-secondary bg-muted text-muted-foreground inline-flex size-6 shrink-0 items-center justify-center rounded-md border ring-1 ring-offset-1",
                "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                className
            )}
            {...props}
        />
    );
}
