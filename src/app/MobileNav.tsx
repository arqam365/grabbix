"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileNav() {
    const [menuOpen, setMenuOpen] = useState(false); // State to track mobile menu

    return (
        <nav className="shift container mx-auto flex justify-between items-center py-4">
            <div>
                <Link href="/" className="text-xl font-bold">
                    Grabbix
                </Link>
            </div>
            <div className="md:hidden">
                <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
                    {/* Hamburger Icon */}
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button>
            </div>
            <ul className="hidden md:flex space-x-6">
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

            {/* Mobile Menu */}
            {menuOpen && (
                <ul className="md:hidden flex flex-col space-y-4 mt-4">
                    <li>
                        <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
                    </li>
                    <li>
                        <Link href="/products" onClick={() => setMenuOpen(false)}>Products</Link>
                    </li>
                    <li>
                        <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
                    </li>
                    <li>
                        <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
                    </li>
                </ul>
            )}
        </nav>
    );
}