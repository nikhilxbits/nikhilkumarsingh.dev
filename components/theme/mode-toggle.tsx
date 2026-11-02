"use client";

import { IconBrightness } from "@tabler/icons-react";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

import { useViewportThemeColor } from "@/hooks/use-viewport-theme-color";
import { VIEWPORT_THEME_COLORS } from "@/constants/site";

import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const subscribe = () => () => {};
const getMountedSnapshot = () => true;
const getServerMountedSnapshot = () => false;

export function ModeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const { setViewportThemeColor } = useViewportThemeColor();

    const mounted = useSyncExternalStore(subscribe, getMountedSnapshot, getServerMountedSnapshot);

    function handleOnClick() {
        const theme = resolvedTheme === "dark" ? "light" : "dark";

        setTheme(theme);
        setViewportThemeColor(theme === "dark" ? VIEWPORT_THEME_COLORS.dark : VIEWPORT_THEME_COLORS.light);
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    type="button"
                    onClick={handleOnClick}
                    variant="ghost"
                    size="icon"
                    aria-label="Mode toggle"
                    aria-pressed={mounted && resolvedTheme === "dark"}
                    className="aria-pressed:[&_svg]:rotate-180"
                >
                    <IconBrightness className="transition-transform! duration-300" />
                    <span className="sr-only">Mode toggle</span>
                </Button>
            </TooltipTrigger>
            <TooltipContent>Mode toggle </TooltipContent>
        </Tooltip>
    );
}
