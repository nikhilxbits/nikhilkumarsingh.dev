import { cn } from "cn";

import { Container, ContainerWrap } from "@/components/ui/container";
import { Magnified } from "@/components/ui/magnified";

export function Magnify() {
    return (
        <section className="border-b border-dashed px-1">
            <Container>
                <Magnified lensSize={120} zoom={3}>
                    <ContainerWrap
                        className={cn(
                            "text-muted-foreground flex h-56 flex-col items-end justify-end text-end",
                            "bg-[repeating-linear-gradient(315deg,var(--secondary)_0,var(--secondary)_1px,transparent_0,transparent_50%)] bg-size-[4px_4px]"
                        )}
                    >
                        <p className="text-xs/5 font-medium">Hover over this to see magnifying glass effect.</p>
                        <p className="text-xs/5 font-medium">
                            This component is made with React, Motion and Tailwind CSS.
                        </p>
                    </ContainerWrap>
                </Magnified>
            </Container>
        </section>
    );
}
