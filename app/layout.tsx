import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/app/components/CustomCursor";
import ThemeToggle from "@/app/components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NEXUS Creative | Premium Immersive Design Studio",
  description: "NEXUS is a next-generation creative studio crafting immersive digital experiences, high-performance interfaces, and captivating interactive storytelling.",
  metadataBase: new URL("https://nexus-studio.creative"),
  openGraph: {
    title: "NEXUS Creative | Immersive Design Studio",
    description: "Next-generation design studio crafting immersive high-performance digital experiences using cutting-edge animations.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col overflow-x-hidden select-none custom-cursor-active">
        <CustomCursor />
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
