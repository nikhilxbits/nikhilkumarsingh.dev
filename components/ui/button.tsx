import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "cn";

const variants = cva(
    [
        "inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all select-none",
        "focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none active:scale-95 disabled:pointer-events-none disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
    ],
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground focus-visible:ring-primary hover:bg-primary/85",
                secondary: "bg-secondary text-secondary-foreground focus-visible:ring-secondary hover:bg-secondary/75",
                destructive:
                    "bg-destructive text-destructive-foreground focus-visible:ring-destructive hover:bg-destructive/85",
                outline:
                    "border-border bg-background text-foreground focus-visible:ring-secondary hover:bg-accent hover:text-accent-foreground",
                ghost: "text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-secondary bg-transparent"
            },
            size: {
                default: "h-9 gap-1.5 px-3 py-1.5",
                sm: "h-8 gap-1 px-2 py-1",
                icon: "size-8"
            }
        },
        defaultVariants: { variant: "default", size: "default" }
    }
);

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof variants> & { asChild?: boolean };

function Button({ className, variant = "default", size = "default", asChild = false, ...props }: ButtonProps) {
    const Component = asChild ? Slot.Root : "button";

    return (
        <Component
            data-slot="button"
            data-variant={variant}
            data-size={size}
            className={cn(variants({ variant, size }), className)}
            {...props}
        />
    );
}

export { Button, variants };
