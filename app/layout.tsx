import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = 'https://claudecodemarketplace.com';
const siteName = 'Claude Code Plugins';
const siteDescription = 'Discover and install plugins for Claude Code. Browse hundreds of plugins to extend your AI coding assistant with new tools and capabilities.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    'Claude Code plugins',
    'plugins for Claude Code',
    'Claude Code extensions',
    'Claude plugins',
    'Claude Code tools',
    'Claude Code add-ons',
    'AI code editor plugins',
    'Claude Code marketplace',
    'Anthropic Claude Code',
    'Claude Code integrations',
    'Claude Code templates',
    'AI development tools',
    'code editor extensions',
  ],
  authors: [{ name: 'Claude Code Community' }],
  creator: 'Claude Code Community',
  publisher: 'Claude Code Community',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
    creator: '@claudeai',
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
