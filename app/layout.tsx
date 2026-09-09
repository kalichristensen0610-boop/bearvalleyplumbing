import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rosybrown-armadillo-385824.hostingersite.com"),
  title: { default:"Bear River Plumbing LLC", template:"%s | Bear River Plumbing" },
  description: "Local, family-owned whole-house and new construction plumbing across Eastern Idaho and the Treasure Valley.",
  openGraph:{title:"Bear River Plumbing LLC",description:"Whole-house plumbing, water treatment, remodels, and new construction across Idaho.",type:"website",images:[{url:"/og.png",width:1734,height:907,alt:"Bear River Plumbing LLC"}]},
  twitter:{card:"summary_large_image",title:"Bear River Plumbing LLC",description:"Whole-house plumbing, water treatment, remodels, and new construction across Idaho.",images:["/og.png"]},
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
        className={`${manrope.variable} antialiased`}
      >
        <Header />{children}<Footer />
      </body>
    </html>
  );
}
