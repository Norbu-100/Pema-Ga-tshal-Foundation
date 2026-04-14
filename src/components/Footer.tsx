"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white font-heading font-bold text-2xl mb-4">
              Pema Ga-Tshal Foundation
            </h3>
            <p className="mb-6 max-w-md">
              Empowering Himalayan and rural communities of Nepal by supporting
              Padmai Ga-tshal Choiling School — providing quality education,
              shelter, and healthcare to children who need it most.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="#about" className="hover:text-[var(--color-pgf-secondary)] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#work" className="hover:text-[var(--color-pgf-secondary)] transition-colors">
                  Our Work
                </Link>
              </li>
              <li>
                <Link href="#support" className="hover:text-[var(--color-pgf-secondary)] transition-colors">
                  Support Us
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-[var(--color-pgf-secondary)] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="shrink-0 text-[var(--color-pgf-primary)]" />
                <span>Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="shrink-0 text-[var(--color-pgf-primary)]" />
                <span>+977 1234567890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="shrink-0 text-[var(--color-pgf-primary)]" />
                <span>info@pemagatshal.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Pema Ga-Tshal Foundation. All
            rights reserved.
          </p>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
