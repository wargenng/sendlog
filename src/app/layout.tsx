import { ClerkProvider } from "@clerk/nextjs";
import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TopNav } from "./_components/topnav";
import { BottomNav } from "./_components/bottomnav";

export const metadata: Metadata = {
  title: "sendlog",
  description: "a way to document your sends",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable} dark`}>
        <body className="flex flex-col justify-between">
          <TopNav />
          {children}
          <BottomNav />
        </body>
      </html>
    </ClerkProvider>
  );
}
