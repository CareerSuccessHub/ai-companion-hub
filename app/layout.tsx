import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  title: {
    default: "AI Student Success Hub - Career Mentor, Side Hustles & Scholarships",
    template: "%s | AI Student Success Hub"
  },
  description: "Free AI-powered career mentor for students. Get personalized side hustle ideas, scholarship opportunities, job alerts, and professional guidance. Build your future today.",
  keywords: [
    "student career advice",
    "side hustle ideas",
    "AI career mentor",
    "college scholarships",
    "student jobs",
    "freelance opportunities",
    "career guidance",
    "passive income for students",
    "job search for students",
    "student success"
  ],
  authors: [{ name: "AI Student Success Hub" }],
  creator: "AI Student Success Hub",
  publisher: "AI Student Success Hub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://ai-companion-hub.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AI Student Success Hub - Your Career & Income Companion",
    description: "Free AI mentor for students. Get side hustle ideas, scholarships, and career advice.",
    url: "/",
    siteName: "AI Student Success Hub",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Student Success Hub - Career Mentor for Students",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Student Success Hub - Career Mentor for Students",
    description: "Free AI-powered career advice, side hustles, and scholarships for students.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add these after setting up Google Search Console
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
} );
}
