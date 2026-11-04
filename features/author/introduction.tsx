import { Suspense } from "react";

import { IconBriefcase } from "@tabler/icons-react";
import { Container, ContainerWrap } from "@/components/ui/container";

import { AUTHOR_INFO } from "./constants";
import { Greet, GreetFallback } from "./greet";

export function Introduction() {
    return (
        <section className="border-b border-dashed">
            <div className="border-b border-dashed px-1">
                <Container className="grid md:grid-cols-2">
                    <ContainerWrap className="text-muted-foreground flex items-center justify-between border-b max-md:border-e-0!">
                        <Suspense fallback={<GreetFallback />}>
                            <Greet />
                        </Suspense>
                    </ContainerWrap>
                    <ContainerWrap className="border-b max-md:border-e-0! md:row-start-3 md:border-e!">
                        <h1 className="scroll-m-20 text-3xl/tight font-bold">I&apos;M {AUTHOR_INFO.displayName}.</h1>
                    </ContainerWrap>
                    <ContainerWrap className="text-muted-foreground flex items-center gap-1.5 md:row-start-5 md:border-e!">
                        <IconBriefcase className="pointer-events-none size-5 shrink-0" />
                        <p className="text-sm/6 font-medium">{AUTHOR_INFO.currentDesignation}</p>
                    </ContainerWrap>
                </Container>
            </div>
            <div className="px-1">
                <Container>
                    <ContainerWrap className="max-w-lg">
                        <p className="text-muted-foreground text-sm/6 font-medium">{AUTHOR_INFO.bio}</p>
                    </ContainerWrap>
                </Container>
            </div>
        </section>
    );
}
