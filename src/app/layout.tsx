import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LOGO } from "@/lib/media";

export const metadata: Metadata = {
  title: { default: "Student Life — TIET", template: "%s · Student Life — TIET" },
  description: "Hostel onboarding, allocation, fees, residence services, portals and campus life at Thapar Institute of Engineering & Technology.",
  icons: { icon: LOGO },
};

export const viewport: Viewport = { themeColor: "#FAF6EF", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh">
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
