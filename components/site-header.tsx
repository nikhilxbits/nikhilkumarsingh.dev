import { IconBrandGithub } from "@tabler/icons-react";

import { REPOSITORY_INFO } from "@/constants/site";

import { Container, ContainerWrap } from "./ui/container";
import { Logo } from "./logo";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { ModeToggle } from "./theme/mode-toggle";

export function SiteHeader() {
    return (
        <header className="bg-background sticky top-0 z-50 border-b border-dashed px-1">
            <Container className="grid grid-cols-2 items-center">
                <ContainerWrap className="flex items-center">
                    <Logo />
                </ContainerWrap>
                <ContainerWrap className="flex items-center justify-end">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild variant="ghost" size="icon">
                                <a
                                    href={REPOSITORY_INFO.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={REPOSITORY_INFO.handle}
                                >
                                    <IconBrandGithub />
                                </a>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>{REPOSITORY_INFO.handle}</TooltipContent>
                    </Tooltip>
                    <ModeToggle />
                </ContainerWrap>
            </Container>
        </header>
    );
}
