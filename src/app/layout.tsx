import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

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
  title: "Grabbix Store",
  description: "Wholesale and Retail Store",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
      {/* Header */}
      <header className="bg-gray-800 text-white p-4">
          <nav className="shift container mx-auto flex justify-between py-4">
              <div>
                  <Link href="/" className="text-xl font-bold">
                      Grabbix
                  </Link>
              </div>
              <ul className="flex space-x-6">
                  <li>
                      <Link href="/" className="nav-link">Home</Link>
                  </li>
                  <li>
                      <Link href="/products" className="nav-link">Products</Link>
                  </li>
                  <li>
                      <Link href="/about" className="nav-link">About</Link>
                  </li>
                  <li>
                      <Link href="/contact" className="nav-link">Contact</Link>
                  </li>
              </ul>
          </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
          {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 mt-8">
          <div className="container mx-auto text-center">
              <p>&copy; {new Date().getFullYear()} Grabbix. All rights reserved.</p>
              <p>Contact us at <a href="mailto:support@grabbix.com"
                                  className="text-blue-400 hover:underline">support@grabbix.com</a></p>
          </div>
      </footer>
      </body>
      </html>
  );
}