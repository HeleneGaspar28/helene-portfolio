import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";  // 👈 add this line
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Helene Portfolio",
  description: "My personal portfolio built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <nav className="navbar navbar-expand-md bg-white border-bottom sticky-top">
          <div className="container">
            <Link href="/" className="navbar-brand fw-semibold">Helene</Link>
            <div className="ms-auto">
              <Link href="/projects" className="nav-link d-inline-block me-4">Projects</Link>
              <Link href="/about" className="nav-link d-inline-block me-4">About</Link>
              <Link href="#contact" className="btn btn-primary d-inline-block">Contact</Link>
            </div>
          </div>
        </nav>
        {children}
        <footer className="border-top py-4 mt-5">
          <div className="container text-body-secondary small">© {new Date().getFullYear()} Helene</div>
        </footer>
      </body>
    </html>
  );
}
