"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";

const navLinks = [
  { label: "Find Mentors", href: "/mentors" },
  { label: "Live Sessions", href: "/sessions" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-sm shadow-orange-100 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[10px] font-semibold text-orange-500 uppercase tracking-widest">
              Vedantu
            </span>
            <span className="text-[17px] font-800 text-dark font-extrabold tracking-tight">
              AlumConnect
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-orange-500 rounded-lg hover:bg-orange-50 transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/mentors"
            className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/mentors"
            className="btn-orange text-sm px-5 py-2.5 rounded-xl"
          >
            Get Started Free
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-orange-50 text-gray-600"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-orange-100 px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-2 pt-3 border-t border-orange-100">
            <Link
              href="/mentors"
              className="flex-1 text-center py-2.5 text-sm font-semibold text-orange-500 border border-orange-200 rounded-xl hover:bg-orange-50 transition-all"
            >
              Log in
            </Link>
            <Link
              href="/mentors"
              className="flex-1 text-center btn-orange py-2.5 text-sm rounded-xl"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
