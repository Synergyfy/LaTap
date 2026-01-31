import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-body",
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-display",
});

export const metadata: Metadata = {
    title: "EntryConnect - Offline-to-Online Data Capture",
    description: "Seamless offline-to-online visitor data capture. Turn physical foot traffic into digital leads instantly with our NFC-powered platform.",
};

import QueryProvider from "./providers/QueryProvider";
import CookieBanner from "@/components/shared/CookieBanner";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            </head>
            <body
                className={`${inter.variable} ${outfit.variable} antialiased`}
            >
                <QueryProvider>
                    {children}
                    <CookieBanner />
                </QueryProvider>
            </body>
        </html>
    );
}
