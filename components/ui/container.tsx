import type { ComponentProps } from "react";
import { cn } from "cn";

function Container({ className, ...props }: ComponentProps<"div">) {
    return (
        <div
            data-slot="container"
            className={cn("mx-auto w-full max-w-3xl border-x border-dashed", className)}
            {...props}
        />
    );
}

function ContainerWrap({ className, ...props }: ComponentProps<"div">) {
    return (
        <div
            data-slot="container-wrap"
            className={cn("border-e border-dashed p-3 last:border-0", className)}
            {...props}
        />
    );
}

export { Container, ContainerWrap };
