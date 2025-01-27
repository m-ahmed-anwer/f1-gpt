import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "F1 GPT Chatbot - Real-time Formula 1 AI Assistant | Ahmed Anwer",
  description:
    "Experience the ultimate F1 chatbot powered by AI. Get real-time Formula 1 updates, race insights, and expert analysis. Built by Ahmed Anwer.",
  keywords: [
    "F1 Chatbot",
    "Formula 1 AI",
    "F1 GPT",
    "Real-time F1 Updates",
    "F1 Race Insights",
    "Ahmed Anwer",
    "Next.js Chatbot",
    "AI Chatbot for F1",
  ],
  authors: [{ name: "Ahmed Anwer", url: "https://f1-gpt-sand.vercel.app/" }],
  openGraph: {
    title: "F1 GPT Chatbot - Real-time Formula 1 AI Assistant | Ahmed Anwer",
    description:
      "Experience the ultimate F1 chatbot powered by AI. Get real-time Formula 1 updates, race insights, and expert analysis. Built by Ahmed Anwer.",
    url: "https://f1-gpt-sand.vercel.app/",
    siteName: "F1 GPT Chatbot",
    images: [
      {
        url: "https://f1-gpt-sand.vercel.app/f1.png", // Full URL to the image
        width: 1200,
        height: 630,
        alt: "F1 GPT Chatbot - Real-time Formula 1 AI Assistant",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "F1 GPT Chatbot - Real-time Formula 1 AI Assistant | Ahmed Anwer",
    description:
      "Experience the ultimate F1 chatbot powered by AI. Get real-time Formula 1 updates, race insights, and expert analysis. Built by Ahmed Anwer.",
    images: ["https://f1-gpt-sand.vercel.app/f1.png"],
    creator: "@ahmed_anwer3",
  },
  
  icons: {
    icon: "/favicon.ico", // Path to your favicon
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "https://f1-gpt-sand.vercel.app/site.webmanifest", // Path to your manifest file
  metadataBase: new URL("https://f1-gpt-sand.vercel.app/"), // Base URL for all relative URLs
};

export const viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <Toaster position="top-center" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
