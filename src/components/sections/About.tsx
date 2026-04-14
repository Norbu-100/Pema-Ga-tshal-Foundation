import { Button } from "../ui/Button";
import NextImage from "next/image";

export default function About() {

  return (
    <section id="about" className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-4 sm:px-6 lg:px-32 py-24">
        {/* Text/Content Side */}
        <div>
          <span className="text-[var(--color-pgf-primary)] font-bold tracking-wider uppercase text-sm mb-4 block">Who are we</span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-6 leading-tight">
            From PGCS, For PGCS
          </h2>
          <p className="text-slate-600 text-lg mb-8 leading-relaxed">
            We are not outsiders, we are alumni of Padmai Ga-tshal Choiling School who have directly benefited from Rinpoche's vision. And now driven to ensure this opportunity is secured for coming generations. <br /><br />
            For this reason, We, the alumni of Padmai Ga-tshal Choiling School, formed the Pema Ga-tshal Foundation out of deep gratitude for the life-changing support we once received. Having experienced both struggle and opportunity, we are driven to give back - so that every child who comes after us can learn, grow, and dream without limits, just as we once did. <br /><br />
            Our Foundation is the official support vehicle for the school, managing all fundraising, development projects, and international outreach to secure long-term stability for PGCS.
          </p>
          <Button
            variant="ghost"
            size="lg">
            Learn More &rarr;
          </Button>
        </div>
        {/* Image/Visual Side */}
        <div className="relative">
          {/* Decorative element */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--color-pgf-secondary)]/20 to-[var(--color-pgf-primary)]/20 rounded-3xl transform -rotate-3 z-0"></div>

          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-square">
            {/* Using optimized Next.js Image component */}
            <NextImage
              src="/aboutschool.png"
              alt="Padmai Ga-tshal Choiling School building"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-8">
              <div>
                <p className="text-[var(--color-pgf-secondary)] font-medium mb-2">Non-Profit Institution</p>
                <h3 className="text-2xl font-bold text-white">Padmai Ga-tshal Choiling School</h3>
              </div>
            </div>
          </div>

          {/* Floating stats card */}
          <div className="absolute -bottom-8 -right-8 md:-right-12 bg-white p-6 rounded-xl shadow-xl z-20 border border-slate-100 hidden sm:block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[var(--color-pgf-primary)]/10 text-[var(--color-pgf-primary)] rounded-full flex items-center justify-center font-bold text-xl">
                100%
              </div>
              <div>
                <p className="font-bold text-slate-900 text-lg">Free</p>
                <p className="text-sm text-slate-500">Education & Shelter</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
