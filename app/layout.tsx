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
    title: {
        default: "LaTap - Offline-to-Online Data Capture",
        template: "%s | LaTap"
    },
    description: "Seamless offline-to-online visitor data capture. Turn physical foot traffic into digital leads instantly with our NFC-powered platform.",
    keywords: ["NFC data capture", "offline to online", "lead generation", "visitor management", "digital marketing"],
    authors: [{ name: "LaTap Team" }],
    creator: "LaTap",
    publisher: "LaTap",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: "website",
        locale: "en_GB",
        url: "https://la-tap.vercel.app/",
        siteName: "LaTap",
        title: "LaTap - Offline-to-Online Data Capture",
        description: "Seamless offline-to-online visitor data capture. Turn physical foot traffic into digital leads instantly with our NFC-powered platform.",
        images: [
            {
                url: "/logo.png",
                width: 800,
                height: 600,
                alt: "LaTap Logo",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "LaTap - Offline-to-Online Data Capture",
        description: "Seamless offline-to-online visitor data capture. Turn physical foot traffic into digital leads instantly with our NFC-powered platform.",
        images: ["/logo.png"],
    },
    icons: {
        icon: "/icon.png",
        apple: "/icon.png",
    },
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
