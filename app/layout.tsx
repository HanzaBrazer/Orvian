import type { Metadata, Viewport } from "next";
import { STIX_Two_Text } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const stix = STIX_Two_Text({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-stix",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://orvian.vercel.app"),
  title: {
    default: "Orvian — Boost Your Productivity With Task Management",
    template: "%s · Orvian",
  },
  description:
    "Streamline your processes and empower your team with Orvian. Effortlessly manage tasks, projects and data in one centralized platform.",
  keywords: [
    "task management",
    "productivity",
    "project management",
    "team collaboration",
    "Orvian",
  ],
  openGraph: {
    title: "Orvian — Task Management App",
    description:
      "Streamline your processes and empower your team with Orvian.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${stix.variable} ${GeistSans.variable}`}>
      <body className="font-sans antialiased">
        <div className="relative flex min-h-screen flex-col overflow-x-clip">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
