import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Next.js 13 Store",
  description: "A simple e-commerce store built with Next.js 13",
};

import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={'min-h-screen flex flex-col bg-white ' + inter.className} suppressHydrationWarning={true}>
        <main className="flex-grow">
          {children}
        </main>
        <footer>This is the footer</footer>
      </body>
    </html>
  );
}
