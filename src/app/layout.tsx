import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "vista.wtf",
  description: "super cool dashboard operator by vista.wtf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} ${geistSans.variable} ${geistMono.variable} overflow-x-hidden antialiased`}
      >
        <div
          className="
            w-full max-w-[1205px] min-h-screen
            mx-auto pt-[85px] px-4 md:px-6
            flex flex-col"
        >
          <Header className="mb-[88px]" />

          {children}
        </div>
        
        <Footer className="mt-[106px]" />
      </body>
    </html>
  );
}
