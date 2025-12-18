import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Navigation from "@/components/Navigation";
import FloatingChat from "@/components/FloatingChat";
import FeatureAnnouncement from "@/components/FeatureAnnouncement";

export const metadata: Metadata = {
  title: {
    default: "AI Career Success Hub - Free AI Career Mentor, Resume Review & Side Hustles",
    template: "%s | AI Career Success Hub"
  },
  description: "Free AI-powered career mentor for job seekers, students, and professionals. Get AI resume reviews, side hustle ideas, scholarship opportunities, and career guidance. 100% free tools.",
  icons: {
    icon: "/logo-2.svg",
    shortcut: "/logo-2.svg",
    apple: "/logo-2.svg",
  },
  keywords: [
    "AI career mentor",
    "free resume review",
    "side hustle ideas",
    "career advice",
    "job search help",
    "remote jobs",
    "freelance opportunities",
    "career change guidance",
    "salary negotiation",
    "professional development",
    "scholarships",
    "passive income ideas"
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
          <Navigation />
          {children}
          <FloatingChat />
          <FeatureAnnouncement 
            announcementId="v1.3.0-ux-improvements"
            title="✨ New: Enhanced UX & Sample Data!"
            description="We've added sample data buttons, privacy notes, and improved tool guidance to make your experience smoother."
            ctaText="See What's New"
            ctaHref="/updates"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
