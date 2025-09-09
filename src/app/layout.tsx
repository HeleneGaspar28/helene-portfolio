import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Script from "next/script";
import Image from "next/image";



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
      <head>
        {/* cloudinary */}
        <Script src="https://widget.cloudinary.com/v2.0/global/all.js" strategy="beforeInteractive" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* navbar */}
        <nav className="navbar navbar-expand-md bg-white border-bottom sticky-top">
          <div className="container">
            <Link href="/" className="navbar-brand d-flex align-items-center gap-2">
              <Image
                src="/logo.png"
                alt="Helene Logo"
                width={50}
                height={50}
                className="rounded"
              />
            </Link>
            <div className="ms-auto">
              <Link href="/projects" className="nav-link d-inline-block me-4">Projects</Link>
              <Link href="/about" className="nav-link d-inline-block me-4">About</Link>
              <Link href="#contact" className="btn btn-primary d-inline-block">Contact</Link>
            </div>
          </div>
        </nav>

        {children}

        {/* Contact / CTA */}
        <section id="contact"className="py-5 bg-light">
          <div className="container text-center mb-5">
            <h2 className="display-6 fw-semibold mb-2 text-primary">Let's Work Together</h2>
            <p className="text-body-secondary mx-auto" style={{ maxWidth: "70ch" }}>
              Ready to contribute to a growth-stage company. Available for software engineering roles.
            </p>
          </div>

          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10">
                <div className="p-4 p-md-5 bg-white rounded-4 shadow-sm">
                  <div className="row g-4 align-items-stretch">
                    {/* Left: contact details */}
                    <div className="col-12 col-md-6 text-start">
                      <h3 className="h5 fw-semibold mb-4">Get In Touch</h3>

                      <div className="d-flex align-items-start mb-3">
                        <span className="icon-badge me-3">✉️</span>
                        <div>
                          <div className="fw-medium">Email</div>
                          <a href="mailto:helenegaspar@outlook.com" className="text-body-secondary text-decoration-none">
                            helenegaspar@outlook.com
                          </a>
                        </div>
                      </div>

                      <div className="d-flex align-items-start mb-4">
                        <span className="icon-badge me-3">📍</span>
                        <div>
                          <div className="fw-medium">Location</div>
                          <div className="text-body-secondary">Paris, France</div>
                        </div>
                      </div>

                      <div>
                        <div className="fw-medium mb-2">Connect with me</div>
                        <div className="d-flex gap-2">
                          <a className="btn btn-light border" href="https://www.linkedin.com/in/helenegaspar/" target="_blank">LinkedIn</a>
                          <a className="btn btn-light border" href="https://github.com/HeleneGaspar28" target="_blank">GitHub</a>
                        </div>
                      </div>
                    </div>

                    {/* Right: CTA panel */}
                    <div className="col-12 col-md-6">
                      <div className="p-4 p-md-4 rounded-4 contact-cta h-100">
                        <div className="text-center mb-3">
                          <div className="h5 fw-semibold mb-1">Ready to hire?</div>
                        </div>

                        <div className="vstack gap-3">
                          <a className="btn btn-primary btn-lg w-100" href="https://www.canva.com/design/DAGyGV8uvEY/mR7lCP8qrbcIukh6b3v4uQ/view?utm_content=DAGyGV8uvEY&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb772496446" target="_blank">
                            ⬇️&nbsp; View CV
                          </a>
                          <a className="btn btn-outline-dark btn-lg w-100" href="mailto:helenegaspar@outlook.com">
                            ✉️&nbsp; Send Email
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{/* /card */}
              </div>
            </div>
          </div>
        </section>

        {/* footer */}
        <footer className="border-top py-4 mt-5">
          <div className="container text-body-secondary small">© {new Date().getFullYear()} Helene</div>
        </footer>
      </body>
    </html>
  );
}
