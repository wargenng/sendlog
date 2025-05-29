import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import "~/styles/globals.css";

import { dark } from "@clerk/themes";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Toaster } from "~/components/ui/toaster";
import { BottomNav } from "../components/bottomnav/bottomnav";
import { SignInCard } from "../components/signin/signincard";

export const metadata: Metadata = {
    title: "sendlog",
    description: "a way to document your sends",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <html lang="en" className={`${GeistSans.variable} dark`}>
                <head>
                    <link
                        rel="icon"
                        type="image/png"
                        href="/favicon-48x48.png"
                        sizes="48x48"
                    />
                    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                    <link rel="shortcut icon" href="/favicon.ico" />
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/apple-touch-icon.png"
                    />
                    <meta name="apple-mobile-web-app-title" content="sendlog" />
                    <link rel="manifest" href="/site.webmanifest" />
                </head>
                <body className="flex flex-col items-center justify-between">
                    <SignedIn>
                        {children}
                        <Toaster />
                        <BottomNav />
                    </SignedIn>
                    <SignedOut>
                        <SignInCard />
                    </SignedOut>
                </body>
            </html>
        </ClerkProvider>
    );
}
