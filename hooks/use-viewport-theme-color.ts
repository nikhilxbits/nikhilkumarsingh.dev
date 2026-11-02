import { useCallback, useEffect, useMemo } from "react";
import { useTheme } from "next-themes";

import { VIEWPORT_THEME_COLORS } from "@/constants/site";

// Inspired by @chanhdai
export function useViewportThemeColor() {
    const { resolvedTheme } = useTheme();

    const viewportThemeColor = useMemo(() => {
        return resolvedTheme !== "dark" ? VIEWPORT_THEME_COLORS.light : VIEWPORT_THEME_COLORS.dark;
    }, [resolvedTheme]);

    const setViewportThemeColor = useCallback((color: string) => {
        document.querySelector('meta[name="theme-color"]')?.setAttribute("content", color);
    }, []);

    useEffect(() => {
        setViewportThemeColor(viewportThemeColor);
    }, [setViewportThemeColor, viewportThemeColor]);

    return { viewportThemeColor, setViewportThemeColor };
}
