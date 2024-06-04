import type { Metadata } from "next";
import { Shojumaru } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import Footer from '@/components/Footer';

const shojumaru = Shojumaru({ subsets: ['latin'], weight: '400' });

// TODO: Add meta data and icon
export const metadata: Metadata = {
  metadataBase: new URL("https://otakle.vercel.app/"),

  title: "Otakle | SkaiLord",
  authors: {
    name: "SkaiLord",
  },
  icons: {
    icon: "/favicon.ico",
  },
  description:
    "Otakle - Unleash your inner otaku with anime word puzzle for true fans! Guess anime characters in daily challenges and test your knowledge of all things anime.",
  openGraph: {
    title: "Otakle | SkaiLord",
    description:
      "Otakle - Unleash your inner otaku with anime word puzzle for true fans! Guess anime characters in daily challenges and test your knowledge of all things anime.",
    url: "https://otakle.vercel.app/",
    siteName: "Otakle | SkaiLord",
    images: "/otakle-og.png",
    type: "website",
  },
  keywords: ["Otakle", "anime", "wordle", "otaku", "anime word game"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={shojumaru.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <Toaster />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
