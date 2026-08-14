import type { Metadata } from "next";
import { Geist, Lora } from "next/font/google";
import "./globals.css";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bear-river-plumbing.sites.openai.com"),
  title: { default:"Bear River Plumbing LLC", template:"%s | Bear River Plumbing" },
  description: "Local, family-owned residential and commercial plumbing across Wyoming and Idaho communities.",
  openGraph:{title:"Bear River Plumbing LLC",description:"Residential and commercial plumbing across Wyoming and Idaho.",type:"website",images:[{url:"/og.png",width:1734,height:907,alt:"Bear River Plumbing LLC"}]},
  twitter:{card:"summary_large_image",title:"Bear River Plumbing LLC",description:"Residential and commercial plumbing across Wyoming and Idaho.",images:["/og.png"]},
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
        className={`${geistSans.variable} ${lora.variable} antialiased`}
      >
        <Header />{children}<Footer />
      </body>
    </html>
  );
}
