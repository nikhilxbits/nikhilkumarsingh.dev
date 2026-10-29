import Script from "next/script";

import type { Metadata, Viewport } from "next";
import { Inter_Tight } from "next/font/google";
import { cn } from "cn";

import "./globals.css";

import { SITE_INFO, VIEWPORT_THEME_COLORS } from "@/constants/site";
import { AUTHOR_INFO } from "@/constants/author";

const inter = Inter_Tight({
    preload: true,
    subsets: ["latin"],
    fallback: ["system-ui", "sans-serif"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
    variable: "--inter-tight"
});

// Thanks @tailwindcss
const darkModeScriptForViewportThemeColor = String.raw`
  try {
    if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '${VIEWPORT_THEME_COLORS.dark}')
    }
  } catch (_) {}
`;

// Thanks @chanhdai for this metadata structure
export const metadata: Metadata = {
    metadataBase: new URL(SITE_INFO.url),
    title: {
        template: `%s - ${SITE_INFO.name}`,
        default: `${AUTHOR_INFO.displayName} - ${AUTHOR_INFO.currentDesignation}`
    },
    description: SITE_INFO.description,
    keywords: SITE_INFO.keywords,
    authors: [{ name: AUTHOR_INFO.displayName, url: AUTHOR_INFO.website }],
    creator: AUTHOR_INFO.displayName,
    publisher: AUTHOR_INFO.displayName,
    openGraph: {
        siteName: SITE_INFO.name,
        url: SITE_INFO.url,
        firstName: AUTHOR_INFO.firstName,
        lastName: AUTHOR_INFO.lastName,
        username: AUTHOR_INFO.username,
        gender: AUTHOR_INFO.gender,
        title: SITE_INFO.name,
        description: SITE_INFO.description,
        locale: "en_US",
        type: "profile"
    },
    twitter: { card: "summary_large_image", title: SITE_INFO.name, description: SITE_INFO.description }
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    viewportFit: "cover",
    themeColor: VIEWPORT_THEME_COLORS.light
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en" className={cn(inter.variable, "h-full antialiased")}>
            <head>
                <script
                    type="text/javascript"
                    dangerouslySetInnerHTML={{ __html: darkModeScriptForViewportThemeColor }}
                />
                <Script src={`data:text/javascript;base64,${btoa(darkModeScriptForViewportThemeColor)}`} />
            </head>
            <body className="flex min-h-full flex-col">{children}</body>
        </html>
    );
}
