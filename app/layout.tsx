import type { Metadata } from "next";
// import { Inter, Outfit } from "next/font/google";
import "./globals.css";

// Force rebuild

// const inter = Inter({
//     subsets: ["latin"],
//     variable: "--font-body",
// });

// const outfit = Outfit({
//     subsets: ["latin"],
//     variable: "--font-display",
// });

export const metadata: Metadata = {
    title: {
        default: "ElizTap - Offline-to-Online Data Capture",
        template: "%s | ElizTap"
    },
    description: "Seamless offline-to-online visitor data capture. Turn physical foot traffic into digital leads instantly with our NFC-powered platform.",
    keywords: ["NFC data capture", "offline to online", "lead generation", "visitor management", "digital marketing"],
    authors: [{ name: "ElizTap Team" }],
    creator: "ElizTap",
    publisher: "ElizTap",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: "website",
        locale: "en_GB",
        url: "https://eliztap.io/",
        siteName: "ElizTap",
        title: "ElizTap - Offline-to-Online Data Capture",
        description: "Seamless offline-to-online visitor data capture. Turn physical foot traffic into digital leads instantly with our NFC-powered platform.",
        images: [
            {
                url: "/logo.png",
                width: 800,
                height: 600,
                alt: "ElizTap Logo",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "ElizTap - Offline-to-Online Data Capture",
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
import ToastProvider from "@/components/providers/ToastProvider";
import SupportChatbot from "@/components/shared/SupportChatbot";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
                <style dangerouslySetInnerHTML={{
                    __html: `
            :root {
              --font-body: 'Inter', sans-serif;
              --font-display: 'Outfit', sans-serif;
            }
          `}} />
            </head>
            <body
                className={`antialiased font-sans`}
                style={{ fontFamily: "var(--font-body)" }}
            >
                <QueryProvider>
                    <ToastProvider />
                    {children}
                    <CookieBanner />
                    <SupportChatbot />
                </QueryProvider>
            </body>
        </html>
    );
}
