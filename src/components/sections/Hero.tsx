import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-slate-900"
    >
      {/* Background Image - Positioned to the right for desktop */}
      <div
        className="absolute inset-0 z-0 opacity-50 bg-cover bg-center lg:bg-right"
        style={{ backgroundImage: "url('/aboutschool.png')" }}
      />

      {/* Gradient Overlay from Left - Hidden on small screens */}
      <div className=" absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent z-0"></div>


      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-20">
        <div className="max-w-4xl text-center lg:text-left">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium tracking-wide mb-6">
            Empowering Himalayan Communities
          </span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight">
            Pema Ga-Tshal Foundation <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-pgf-secondary)] to-[var(--color-pgf-primary)]">
              From Padmai, For Padmai
            </span>
          </h1>

          <p className="mt-4 max-w-2xl mx-auto lg:mx-0 text-lg md:text-xl text-slate-200 mb-10">
            We are the graduates and current students of PGCS who have directly benefited from Rinpoche's vision. We founded the Foundation to ensure this opportunity is secured for the next generation of Himalayan children.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <Link href="#about" aria-label="Scroll down" className="text-white/70 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </Link>
      </div>
    </section>
  );
}
