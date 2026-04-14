"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "About Us", href: "/#about" },
    { name: "Our Team & Member", href: "/#team" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
        : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-2">
            <span
              className={`font-heading font-bold text-xl tracking-tight transition-colors ${isScrolled ? "text-slate-900" : "text-slate-900 md:text-white"
                }`}
            >
              Pema Ga-Tshal Foundation
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium hover:text-[var(--color-pgf-secondary)] transition-colors ${isScrolled ? "text-slate-600" : "text-white/90"
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/donate"
              className="bg-[var(--color-pgf-secondary)] hover:bg-[var(--color-pgf-secondary)]/90 text-white px-5 py-2.5 rounded-sm text-sm font-medium transition-transform hover:scale-105 shadow-md"
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={isScrolled ? "text-slate-900" : "text-slate-900"}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 font-medium hover:text-[var(--color-pgf-primary)] py-2 border-b border-slate-100 last:border-0"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/donate"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-[var(--color-pgf-secondary)] text-white text-center px-5 py-3 rounded-md font-medium"
          >
            Donate Now
          </Link>
        </div>
      )}
    </nav>
  );
}
