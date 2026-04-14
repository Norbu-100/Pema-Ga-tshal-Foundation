"use client"
import { useState, useEffect } from "react";
import DonationModal from "@/components/DonationModal";
import { HandHeart, Shirt, GraduationCap, BookOpen, PenTool, Utensils, Trophy, Footprints, ArrowRight, Heart, Landmark, Mail, ShieldCheck, HelpCircle, MapPin, Quote, Loader2 } from "lucide-react";
import Image from "next/image";

const faqs = [
  {
    question: "Is my donation tax-deductible?",
    answer: "Yes, Pema Ga-tshal Foundation is a registered non-profit organization. All donations are tax-deductible to the extent allowed by law. You will receive an official receipt for your records."
  },
  {
    question: "Can I sponsor a specific student?",
    answer: "While we pool general funds to ensure all students' needs are met equally, we do offer a comprehensive long-term sponsorship program. Please contact us directly for more information."
  },
  {
    question: "How much of my donation goes directly to the students?",
    answer: "We are proud to state that 100% of public donations go directly toward student programs, meals, and essentials. Our administrative costs are completely covered by our board of directors."
  },
  {
    question: "Can I donate items instead of money?",
    answer: "Absolutely! We accept in-kind donations of books, educational materials, and new children's clothing. Please connect with our team to coordinate drop-off or shipping."
  }
];

const donationItems = [
  {
    title: "Hostel Apparel Fund",
    goal: "$18",
    unit: "per student",
    description: "Help our resident students feel at home. This donation provides a complete set of comfortable hostel wear, including a durable tracksuit, extra trousers, and breathable T-shirts for daily life outside the classroom.",
    icon: Shirt,
    color: "bg-blue-50 text-blue-600",
    borderColor: "hover:border-blue-200"
  },
  {
    title: "Official School Uniforms",
    goal: "$20",
    unit: "per student",
    description: "Pride and discipline start with a neat appearance. This fund covers a full academic uniform set: a crisp white shirt, formal black trousers, and the school tie, ensuring every student stands tall among their peers.",
    icon: GraduationCap,
    color: "bg-indigo-50 text-indigo-600",
    borderColor: "hover:border-indigo-200"
  },
  {
    title: "Academic Footwear (Black Shoes)",
    goal: "$6",
    unit: "per pair",
    description: "A sturdy pair of black leather shoes is a requirement for the daily school commute and formal assemblies. Your gift ensures students have reliable, polished footwear for the entire academic year.",
    icon: Footprints,
    color: "bg-slate-100 text-slate-700",
    borderColor: "hover:border-slate-300"
  },
  {
    title: "Hostel & Leisure Footwear (White Shoes)",
    goal: "$3",
    unit: "per pair",
    description: "For time spent in the hostel and during light morning drills, students require lightweight white canvas shoes. These provide the necessary comfort and hygiene for indoor and campus use.",
    icon: Footprints,
    color: "bg-slate-50 text-slate-500",
    borderColor: "hover:border-slate-200"
  },
  {
    title: "New Session Textbook Fund",
    goal: "$35",
    unit: "per grade set (LKG - Grade 12)",
    description: "Every new session brings the need for updated curriculum materials. We provide full sets of textbooks for students from Lower Kindergarten through Grade 12, putting the world of knowledge directly into their hands.",
    icon: BookOpen,
    color: "bg-amber-50 text-amber-600",
    borderColor: "hover:border-amber-200"
  },
  {
    title: "Stationery & Notebook Essentials",
    goal: "$4.20",
    unit: "per bundle",
    description: "Note-taking is the foundation of active learning. This donation supplies a bulk pack of high-quality writing copies and notebooks to last a student through an entire semester of lessons and homework.",
    icon: PenTool,
    color: "bg-emerald-50 text-emerald-600",
    borderColor: "hover:border-emerald-200"
  },
  {
    title: "Sponsor a Nutritious Lunch",
    goal: "$200",
    unit: "feeds entire student body",
    description: "A healthy meal is fuel for a bright mind. By sponsoring a one-time lunch, you provide a warm, nutritious, and balanced meal for all our students, celebrating a special occasion or simply supporting their well-being.",
    icon: Utensils,
    color: "bg-orange-50 text-orange-500",
    borderColor: "hover:border-orange-200"
  },
  {
    title: "Sports & Athletic Equipment",
    goal: "$250",
    unit: "per department/term",
    description: "Physical health is as vital as academic success. This fund goes toward replenishing footballs, basketballs, badminton sets, and other recreational gear that encourages teamwork, leadership, and a healthy lifestyle.",
    icon: Trophy,
    color: "bg-red-50 text-red-500",
    borderColor: "hover:border-red-200"
  }
];

export default function DonatePage() {
  const [selectedItem, setSelectedItem] = useState<typeof donationItems[0] | null>(null);
  const [spotlights, setSpotlights] = useState<any[]>([]);
  const [loadingSpotlights, setLoadingSpotlights] = useState(true);

  useEffect(() => {
    fetch("/api/donor-posts")
      .then(res => res.json())
      .then(data => {
        setSpotlights(data);
        setLoadingSpotlights(false);
      })
      .catch(() => setLoadingSpotlights(false));
  }, []);

  return (
    <div className="  min-h-screen bg-slate-100 pb-24">
      {selectedItem && (
        <DonationModal
          item={{ title: selectedItem.title, goal: selectedItem.goal, unit: selectedItem.unit }}
          onClose={() => setSelectedItem(null)}
        />
      )}
      {/* Modern Donate Hero Section */}
      <section className="relative h-[50vh] flex items-center overflow-hidden bg-slate-900 ">
        <div
          className="absolute inset-0 z-0 bg-cover bg-top transition-transform duration-1000 scale-105"
          style={{ backgroundImage: "url('/aboutschool.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/40 to-slate-900/90 z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <h1 className="text-2xl md:text-3xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            Donate to Pema Ga-Tshal Foundation
          </h1>
        </div>

        {/* Decorative wave at bottom */}
      </section>
      <div className="relative mx-auto px-6 md:px-12 lg:px-16">
        <div className="max-w-9xl mx-auto pt-24" id="catalog">

          {/* The Heart of Our Mission Section | Header section*/}
          <div className="relative lg:py-24 mx-auto overflow-hidden mb-20 ">
            <div className="relative z-10">
              <div className="text-left">
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-8 leading-tight">
                  The Heart of Our Mission <br className="hidden sm:block" /> Why Your Support Matters
                </h2>

                <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                  <p>
                    At the Pema Ga-tshal Foundation, we believe that education is the most powerful tool for transformation. However, for a student to truly excel, they need more than just a seat in a classroom—they need the dignity of a clean uniform, the nourishment of a warm meal, and the essential tools to record their dreams.
                  </p>
                  <p className="hidden md:block">
                    Many of our students come from humble beginnings, and the cost of basic necessities like textbooks, sturdy shoes, and seasonal clothing can become a barrier to their success. When you donate, you aren't just buying an item; you are removing a hurdle.
                  </p>
                  <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border-l-[6px] border-[var(--color-pgf-primary)] shadow-sm">
                    <p className="font-semibold text-slate-800 text-xl font-heading leading-snug">
                      "You are telling a student that their future is worth investing in. Together, we can ensure every child has the resources to turn potential into reality."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Giving Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 ">
          {donationItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`bg-white rounded-3xl p-8 shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${item.borderColor} flex flex-col h-full overflow-hidden relative group`}
              >
                {/* Background decorative accent */}
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300 pointer-events-none transform -rotate-12 translate-x-4 -translate-y-4">
                  <Icon size={120} />
                </div>

                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shrink-0 ${item.color}`}>
                  <Icon size={28} />
                </div>

                <h3 className={`text-xl md:text-2xl font-bold text-slate-900 mb-4 leading-tight`}>
                  {item.title}
                </h3>

                <div className="flex flex-wrap items-baseline gap-2 mb-6 pb-6 border-b border-slate-100">
                  <span style={{ color: item.color }} className="text-4xl font-black text-[var(--color-pgf-primary)]">{item.goal}</span>
                  <span className="text-sm font-semibold tracking-wide text-slate-500 uppercase">{item.unit}</span>
                </div>

                <p className="text-slate-600 text-base leading-relaxed mb-8 flex-grow">
                  {item.description}
                </p>

                <button
                  onClick={() => setSelectedItem(item)}
                  className="w-full py-4 px-6 bg-slate-50 hover:bg-[var(--color-pgf-secondary)] text-slate-700 hover:text-white rounded-xl font-bold transition-all duration-200 group/btn flex items-center justify-center gap-2 mt-auto border border-slate-200 hover:border-transparent">
                  Select Gift <ArrowRight size={18} className="opacity-0 -ml-4 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all duration-300" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Other Ways to Give Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">Other Ways to Give</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              If you prefer not to donate online, there are several other ways you can support the Pema Ga-tshal Foundation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Bank Transfer */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-6">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                <Landmark size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Bank Transfer</h3>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                  You can set up a direct wire transfer to our foundation's bank account. This is ideal for larger donations as it avoids credit card processing fees.
                </p>
                <div className="bg-slate-50 p-4 rounded-xl text-sm font-mono text-slate-700">
                  <p>Bank: PGF Foundation Bank</p>
                  <p>Account: 1234 5678 9000</p>
                  <p>Routing: 098765432</p>
                </div>
              </div>
            </div>

            {/* Check or Mail */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-6">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                <Mail size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Send a Check</h3>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                  We gratefully accept checks by mail. Please make checks payable to "Pema Ga-tshal Foundation" and include your return address for the tax receipt.
                </p>
                <div className="bg-slate-50 p-4 rounded-xl text-sm font-mono text-slate-700">
                  <p>Pema Ga-tshal Foundation</p>
                  <p>123 Education Way</p>
                  <p>Kathmandu, Nepal 44600</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Commitment to Transparency & FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
          {/* Transparency */}
          <div className="lg:col-span-5 bg-[var(--color-pgf-primary)] rounded-3xl p-10 md:p-12 text-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -m-8 opacity-10 pointer-events-none">
              <ShieldCheck size={250} />
            </div>
            <div className="relative z-10 w-full h-full flex flex-col">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8">
                <ShieldCheck size={32} className="text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">100% Transparency</h2>
              <p className="text-white/90 text-lg leading-relaxed mb-8">
                We take our responsibility to our donors seriously. Every dollar you contribute is meticulously tracked and allocated directly to the programs you choose to support.
              </p>
              <ul className="space-y-4 text-white">
                {[
                  "Annual public financial audits",
                  "Direct impact tracking",
                  "Zero administrative overhead from public donations"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[var(--color-pgf-secondary)] rounded-full shrink-0"></div>
                    <span className="font-medium text-white/95">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* FAQs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-8">
              <HelpCircle className="text-[var(--color-pgf-secondary)]" size={32} />
              <h2 className="text-3xl font-heading font-bold text-slate-900">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{faq.question}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Donor Spotlights Section */}
        <div className="mt-32 mb-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-yellow-50 text-yellow-600 rounded-2xl mb-4">
              <Trophy size={28} />
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-6">Our Supporters</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We are deeply grateful to the individuals and organizations who make our mission possible. Here are a few stories of impact.
            </p>
          </div>

          {loadingSpotlights ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-[var(--color-pgf-primary)]" size={32} />
            </div>
          ) : spotlights.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
              {spotlights.map((spot, i) => (
                <div key={spot.id} className="bg-white rounded-md p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:shadow-xl transition-all duration-300">
                  <div className="relative w-24 h-24 mb-6">
                    <div className="absolute inset-0 bg-[var(--color-pgf-primary)]/10 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500"></div>
                    {spot.photoUrl ? (
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                        <Image src={spot.photoUrl} alt={spot.donorName} fill sizes="96px" className="object-cover" />
                      </div>
                    ) : (
                      <div className="relative w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border-4 border-white shadow-md">
                        <Heart size={32} />
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900">{spot.donorName}</h3>
                    {spot.country && (
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center justify-center gap-1 mt-1">
                        <MapPin size={10} /> {spot.country}
                      </p>
                    )}
                  </div>

                  <div className="bg-slate-50 rounded-2xl px-4 py-2 mb-6 inline-flex items-center gap-2 border border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase">Donated</span>
                    <span className="text-[var(--color-pgf-primary)] font-black">${spot.amount}</span>
                    <span className="text-slate-300">|</span>
                    <span className="text-xs font-medium text-slate-500">{spot.giftTitle}</span>
                  </div>

                  {spot.message && (
                    <div className="relative">
                      <Quote size={32} className="text-slate-300 absolute -left-4 -top-2" />
                      <p className="text-slate-600 italic text-sm leading-relaxed relative z-10">
                        {spot.message}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-500">Your donation could be the next story of impact!</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
