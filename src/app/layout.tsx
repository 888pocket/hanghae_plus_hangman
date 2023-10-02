import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "행맨",
  description: "틀리면 죽는다.",
  keywords: [
    "hangman",
    "hanghae",
    "hanghae plus",
    "행맨",
    "항해 플러스",
    "코육대",
  ],
  openGraph: {
    title: "행맨 게임",
    description: "틀리면 죽는다.",
    url: "https://hanghae-hangman.vercel.app/",
    siteName: "행맨",
    images: [
      {
        url: "/og_800.png",
        width: 800,
        height: 600,
      },
      {
        url: "/og_1800.png",
        width: 1800,
        height: 1600,
        alt: "행맨 플레이하러 가기",
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
