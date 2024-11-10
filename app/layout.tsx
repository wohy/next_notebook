import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SideBar } from "./components/sideBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Next Note",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-row min-w-[1080px]">
          <div className="min-w-[30%]">
            <SideBar />
          </div>
          <div className="dark:bg-slate-800 bg-white py-5 px-3 flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
