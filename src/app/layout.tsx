import { type Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import LocalFont from "next/font/local";
import { cookies } from "next/headers";
import { ClerkProvider } from "@clerk/nextjs";

import "~/styles/globals.css";

import { Analytics, TailwindIndicator } from "~/components";
import { Toaster } from "~/components/ui/toaster";
import { siteConfig } from "~/config/site";
import { cn } from "~/lib/utils";
import { ModalProvider, ThemeProvider } from "~/providers";
import { TRPCReactProvider } from "~/trpc/react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
const fontHeading = LocalFont({
  src: "../styles/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  creator: siteConfig.creator,
  authors: siteConfig.authors,
  keywords: siteConfig.keywords,
  icons: {
    // apple: "/apple-touch-icon.png",
    // icon: "/android-chrome-192x192.png",
    shortcut: "/favicon.ico",
  },
  // manifest: `${siteConfig.url}/site.webmanifest`,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteConfig.url,
    type: "website",
    locale: "en-US",
    // images: [
    //   {
    //     url: siteConfig.ogImage,
    //     width: 1200,
    //     height: 630,
    //     alt: siteConfig.name,
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    // images: [`${siteConfig.url}/og.jpg`],
    // creator: "@example",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable,
        )}
      >
        <ClerkProvider>
          <TRPCReactProvider cookies={cookies().toString()}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
              <TailwindIndicator />
            </ThemeProvider>

            <Analytics />
            <ModalProvider />
            <Toaster />
          </TRPCReactProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
