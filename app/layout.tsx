import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
const notoSans = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "NextYouTubeMusic",
    description: "NYTM",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={notoSans.className}>
                <div className="bg-zinc-900 text-white min-h-screen dark">
                    <NextUIProvider>{children}</NextUIProvider>
                </div>
            </body>
        </html>
    );
}
