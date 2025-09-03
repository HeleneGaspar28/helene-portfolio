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
        <nav className="navbar navbar-expand-md bg-white border-bottom">
          <div className="container">
            <a className="navbar-brand fw-semibold" href="#">Helene</a>
            <div className="ms-auto">
              <a className="nav-link d-inline-block me-2" href="/projects">Projects</a>
              <a className="nav-link d-inline-block" href="/about">About</a>
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
