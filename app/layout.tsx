import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
    title: "Nikhil Kumar Singh - Full Stack MERN Developer",
    description:
        "I'm a Full Stack MERN Developer, building applications that are maintainable and less chaotic than JavaScript usually wants them to be."
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en" className="h-full antialiased">
            <body className="flex min-h-full flex-col">{children}</body>
        </html>
    );
}
