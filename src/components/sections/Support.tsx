import { HeartHandshake, Users, Landmark } from "lucide-react";
import Link from "next/link";

export default function Support() {
  return (
    <section id="support" className=" py-24 bg-white relative overflow-hidden">
      {/* Background Graphic */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center sm:text--start max-w-3xl mx-auto mb-16">
          <span className="text-[var(--color-pgf-primary)] font-bold tracking-wider uppercase text-sm mb-4 block">Get Involved</span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
            Support Our Mission
          </h2>
          <p className="text-slate-600 text-lg">
            Your contribution directly impacts the lives of children by providing them with education, shelter, and a brighter future. Join us in making a difference.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Donation Card */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-100 transform transition-transform hover:-translate-y-1">
            <div className="w-16 h-16 bg-red-50 text-[var(--color-pgf-primary)] rounded-2xl flex items-center justify-center mb-8">
              <HeartHandshake size={32} />
            </div>
            <h3 className="text-3xl font-heading font-bold text-slate-900 mb-4">Make a Donation</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Every dollar counts. Your financial support helps us buy school supplies, maintain our boarding facilities, and ensure our children are well-fed and healthy.
            </p>



            <Link href="/donate" className="w-full py-4 bg-[var(--color-pgf-primary)] hover:bg-[var(--color-pgf-primary)]/90 text-white rounded-xl font-bold text-lg shadow-lg shadow-[var(--color-pgf-primary)]/30 transition-transform hover:scale-[1.02] flex items-center justify-center">
              Donate Now
            </Link>
          </div>

          {/* Other Ways to Help */}
          <div className="space-y-8">
            <h3 className="text-2xl font-heading font-bold text-slate-900 mb-6">Other Ways to Help</h3>

            <div className="flex gap-6 p-6 rounded-2xl bg-blue-50/50 hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100">
              <div className="shrink-0 w-14 h-14 bg-white shadow-sm rounded-full flex items-center justify-center text-[var(--color-pgf-accent)]">
                <Users size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Volunteer With Us</h4>
                <p className="text-slate-600">Join our team of passionate individuals. We occasionally need help with teaching, administration, and organizing events.</p>
                <button className="mt-3 text-[var(--color-pgf-accent)] font-semibold hover:underline">Apply to Volunteer &rarr;</button>
              </div>
            </div>

            <div className="flex gap-6 p-6 rounded-2xl bg-yellow-50/50 hover:bg-yellow-50 transition-colors border border-transparent hover:border-yellow-100">
              <div className="shrink-0 w-14 h-14 bg-white shadow-sm rounded-full flex items-center justify-center text-[var(--color-pgf-secondary)]">
                <Landmark size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Corporate Sponsorships</h4>
                <p className="text-slate-600">Partner your business with our foundation. We offer various sponsorship tiers that directly fund educational programs.</p>
                <button className="mt-3 text-[var(--color-pgf-secondary)] font-semibold hover:underline">Learn More &rarr;</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
