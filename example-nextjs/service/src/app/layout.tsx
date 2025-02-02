import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "./components/NavBar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Serverless Container Framework - NextJS Example",
  description: "Serverless Container Framework NextJS Example",
  icons: {
    icon: [
      { url: '/images/favicon.png' },
    // { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    // { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    // If you have an Apple touch icon, you can add it too
    apple: [
      { url: '/images/apple-touch-icon.png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
