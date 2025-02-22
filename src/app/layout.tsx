import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar"
import Footer from "./components/footer"
import IconWhatsapp from "@/app/components/whatsapp_icon"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MusyaffaTours",
  description: "Umroh murah dan terjamin, memberikan pengalaman spiritual yang mendalam dengan harga yang terjangkau. Kami menawarkan paket umroh yang lengkap, termasuk akomodasi nyaman, transportasi yang aman, dan bimbingan dari pemandu berpengalaman. Bergabunglah dengan kami untuk menjalani ibadah umroh dengan tenang dan penuh berkah.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col items-center justify-center overflow-x-hidden `}
      >
        <Navbar />
        <IconWhatsapp/> 
        {children}
        <Footer/>
      </body>
    </html>
  );
}
