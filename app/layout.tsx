import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import { cn } from "cn";

import "./globals.css";

const inter = Inter_Tight({
    preload: true,
    subsets: ["latin"],
    fallback: ["system-ui", "sans-serif"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
    variable: "--inter-tight"
});

export const metadata: Metadata = {
    title: "Nikhil Kumar Singh - Full Stack MERN Developer",
    description:
        "I'm a Full Stack MERN Developer, building applications that are maintainable and less chaotic than JavaScript usually wants them to be."
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en" className={cn(inter.variable, "h-full antialiased")}>
            <body className="flex min-h-full flex-col">{children}</body>
        </html>
    );
}
