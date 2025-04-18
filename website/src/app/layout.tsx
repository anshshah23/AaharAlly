import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from 'react-hot-toast';
import "./globals.css";
import {
  ClerkProvider,
} from "@clerk/nextjs";
import FooterBar from "@/components/FooterBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AaharAlly",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider>
          <main className="py-16">
            {children}
          </main>
          <Toaster />
          <FooterBar />
        </ClerkProvider>
      </body>
    </html>
  );
}
