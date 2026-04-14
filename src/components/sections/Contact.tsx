"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMsg("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 text-white relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Information */}
        <div>
          <span className="text-[var(--color-pgf-secondary)] font-bold tracking-wider uppercase text-sm mb-4 block">Get In Touch</span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-white">
            We'd Love to Hear From You
          </h2>
          <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-lg">
            Whether you have a question about our programs, want to volunteer, or are interested in partnering with us, our team is ready to answer all your questions.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-[var(--color-pgf-secondary)] shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">Our Location</h4>
                <p className="text-slate-400">Padmai Ga-tshal Choiling School<br />Kageshwori Manohara-01, Kathmandu, Nepal</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-[var(--color-pgf-secondary)] shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">Email Us</h4>
                <p className="text-slate-400">gatshalpema@gmail.com<br />support@pemagatshal.org</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-[var(--color-pgf-secondary)] shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">Call Us</h4>
                <p className="text-slate-400">+977 9749873419<br />Sunday to Friday, 9am - 5pm NPT</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-100 text-slate-900">
          <h3 className="text-2xl font-bold mb-6 font-heading">Send us a message</h3>

          {status === "success" ? (
            <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl text-center">
              <p className="font-bold text-lg mb-2">Message Sent!</p>
              <p>Thank you for reaching out. We will get back to you shortly.</p>
              <button onClick={() => setStatus("idle")} className="mt-4 text-green-700 font-semibold underline">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                  <input required value={formData.firstName} onChange={handleChange} type="text" id="firstName" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--color-pgf-primary)] focus:border-transparent outline-none transition-all" placeholder="Norbu" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                  <input required value={formData.lastName} onChange={handleChange} type="text" id="lastName" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--color-pgf-primary)] focus:border-transparent outline-none transition-all" placeholder="Lama" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <input required value={formData.email} onChange={handleChange} type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--color-pgf-primary)] focus:border-transparent outline-none transition-all" placeholder="norbu@example.com" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <textarea required value={formData.message} onChange={handleChange} id="message" rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[var(--color-pgf-primary)] focus:border-transparent outline-none transition-all" placeholder="How can we help you?"></textarea>
              </div>

              {status === "error" && <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl border border-red-100">{errorMsg || "An error occurred. Please try again."}</p>}

              <button disabled={status === "loading"} type="submit" className="w-full py-4 bg-[var(--color-pgf-accent)] hover:bg-[var(--color-pgf-accent)]/90 disabled:bg-slate-400 text-white rounded-xl font-bold text-lg shadow-lg transition-transform hover:translate-y-[-2px]">
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
