import { cn } from "cn";
import { IconExternalLink } from "@tabler/icons-react";

import { Container, ContainerWrap } from "@/components/ui/container";
import { IconBadge } from "@/components/ui/icon-badge";
import { Link } from "@/components/ui/link";

import { OVERVIEW } from "./constants";
import type { OverviewItem } from "./types";

export function OverviewGrid() {
    return (
        <section className="border-b border-dashed px-1">
            <Container className="grid md:grid-cols-2">
                {OVERVIEW.map((item, index) => (
                    <OverviewGridCard
                        key={index}
                        overview={item}
                        className={cn(
                            [OVERVIEW.length - 1, OVERVIEW.length - 2].includes(index) && "md:border-b-0",
                            (index + 1) % 2 === 0 && "border-e-0!"
                        )}
                    />
                ))}
            </Container>
        </section>
    );
}

function OverviewGridCard({ overview, className }: { overview: OverviewItem; className?: string }) {
    const isLinkItem = overview.type === "email-address" || overview.type === "phone-number";

    return (
        <ContainerWrap className={cn("flex items-center gap-2 border-b max-md:border-e-0!", className)}>
            <IconBadge>
                <overview.icon />
            </IconBadge>
            <div className="group flex grow items-center justify-between text-sm/6 font-medium">
                {isLinkItem ? (
                    <>
                        <Link
                            href={overview.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={overview.label}
                            className={cn(overview.type === "phone-number" && "[word-spacing:4px]")}
                        >
                            {overview.label}
                        </Link>
                        <IconExternalLink className="text-muted-foreground group-hover:text-primary pointer-events-none size-3 shrink-0 transition-colors" />
                    </>
                ) : (
                    overview.label
                )}
            </div>
        </ContainerWrap>
    );
}
