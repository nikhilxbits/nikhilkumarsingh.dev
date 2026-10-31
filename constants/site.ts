import type { SiteInformation, SourceCodeRepository, ViewportThemeColor } from "@/types/site";

import { AUTHOR_INFO, SOCIAL_PROFILES } from "./author";

const REPOSITORY_HANDLE = `${SOCIAL_PROFILES.github.handle}/nikhilkumarsingh.dev`;

const SITE_URL =
    process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.NEXT_PUBLIC_SITE_URL || "https://nikhilkumarsingh.dev";

const REPOSITORY_INFO: SourceCodeRepository = {
    handle: REPOSITORY_HANDLE,
    href: `https://github.com/${REPOSITORY_HANDLE}`,
    license: { name: "MIT", href: `https://github.com/${REPOSITORY_HANDLE}/blob/main/LICENSE` }
};

const SITE_INFO: SiteInformation = {
    name: AUTHOR_INFO.displayName,
    url: SITE_URL,
    description: AUTHOR_INFO.bio,
    keywords: AUTHOR_INFO.keywords,
    siteCreatedAt: new Date("2026-10-26")
};

const VIEWPORT_THEME_COLORS: ViewportThemeColor = { dark: "#0A0A0A", light: "#FAFAFA" };

export { REPOSITORY_INFO, SITE_INFO, SITE_URL, VIEWPORT_THEME_COLORS };
