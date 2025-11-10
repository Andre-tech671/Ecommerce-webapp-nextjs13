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

import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={'min-h-screen flex flex-col ' + inter.className}>
        {children}
      </body>
    </html>
  );
}
