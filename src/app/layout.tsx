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
        <nav className="container mx-auto flex justify-between">
          <div>
            <Link href="/" className="text-xl font-bold hover:underline">
              Grabbix
            </Link>
          </div>
          <div className="space-x-4">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <Link href="/products" className="hover:underline">
              Products
            </Link>
          </div>
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
          <p>Contact us at <a href="mailto:support@grabbix.com" className="text-blue-400 hover:underline">support@grabbix.com</a></p>
        </div>
      </footer>
      </body>
      </html>
  );
}