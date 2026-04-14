"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  X, Upload, User, MapPin, Globe, Phone, Users, Image as ImageIcon,
  CheckCircle, Loader2, QrCode
} from "lucide-react";

type DonationItem = {
  title: string;
  goal: string;
  unit: string;
};

type Props = {
  item: DonationItem;
  onClose: () => void;
};

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Argentina","Australia","Austria","Bangladesh","Belgium","Bhutan","Bolivia",
  "Brazil","Canada","Chile","China","Colombia","Czech Republic","Denmark","Egypt","Ethiopia","Finland",
  "France","Germany","Ghana","Greece","Hungary","India","Indonesia","Iran","Iraq","Ireland","Israel",
  "Italy","Japan","Jordan","Kenya","Malaysia","Mexico","Morocco","Myanmar","Nepal","Netherlands",
  "New Zealand","Nigeria","Norway","Pakistan","Peru","Philippines","Poland","Portugal","Romania",
  "Russia","Saudi Arabia","Singapore","South Africa","South Korea","Spain","Sri Lanka","Sweden",
  "Switzerland","Taiwan","Tanzania","Thailand","Turkey","Uganda","Ukraine","United Kingdom",
  "United States","Uruguay","Vietnam","Zimbabwe"
].sort();

export default function DonationModal({ item, onClose }: Props) {
  const goalValue = parseFloat(item.goal.replace("$", ""));

  const [form, setForm] = useState({
    donorName: "",
    address: "",
    country: "",
    phone: "",
    numberOfStudents: 1,
  });

  const [qrScreenshot, setQrScreenshot] = useState<File | null>(null);
  const [donorPhoto, setDonorPhoto]     = useState<File | null>(null);
  const [qrPreview, setQrPreview]       = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const qrRef    = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);

  const totalAmount = +(goalValue * form.numberOfStudents).toFixed(2);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "numberOfStudents" ? Math.max(1, parseInt(value) || 1) : value }));
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>, type: "qr" | "photo") {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (type === "qr") { setQrScreenshot(file); setQrPreview(url); }
    else               { setDonorPhoto(file);   setPhotoPreview(url); }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("donorName",        form.donorName);
      fd.append("address",          form.address);
      fd.append("country",          form.country);
      fd.append("phone",            form.phone);
      fd.append("giftTitle",        item.title);
      fd.append("goalPerUnit",      String(goalValue));
      fd.append("numberOfStudents", String(form.numberOfStudents));
      fd.append("totalAmount",      String(totalAmount));
      if (qrScreenshot) fd.append("qrScreenshot", qrScreenshot);
      if (donorPhoto)   fd.append("donorPhoto",   donorPhoto);

      const res = await fetch("/api/donations", { method: "POST", body: fd });
      if (!res.ok) throw new Error((await res.json()).error || "Submission failed");
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[95vh] overflow-y-auto shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 flex items-center justify-between p-6 border-b border-slate-100 rounded-t-3xl">
          <div>
            <p className="text-xs font-semibold tracking-wider uppercase text-[var(--color-pgf-primary)] mb-1">Giving Catalog</p>
            <h2 className="text-xl font-bold text-slate-900 font-heading">{item.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500"><X size={22} /></button>
        </div>

        {success ? (
          /* ─── Success State ─── */
          <div className="flex flex-col items-center justify-center p-12 text-center gap-6">
            <div className="relative w-64 h-40 mb-2 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <Image 
                src="/images/thank-you-donation.png" 
                alt="Thank you from a student" 
                fill 
                sizes="256px"
                className="object-cover"
              />
            </div>
            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center -mt-10 relative z-10 border-4 border-white shadow-md">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-heading">Thank You!</h3>
            <p className="text-slate-600 max-w-sm leading-relaxed">
              Your donation of <strong className="text-slate-800">${totalAmount}</strong> for <strong className="text-slate-800">{item.title}</strong> has been submitted successfully.
              We will review your payment and get back to you.
            </p>
            <button onClick={onClose} className="mt-4 px-8 py-3 bg-[var(--color-pgf-primary)] text-white rounded-xl font-bold hover:bg-[var(--color-pgf-primary)]/90 transition-colors">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-8">

            {/* ── QR Section ── */}
            <div className="bg-slate-50 rounded-2xl p-6 flex flex-col items-center gap-4 border border-slate-100">
              <div className="flex items-center gap-2 self-start">
                <QrCode size={20} className="text-[var(--color-pgf-primary)]" />
                <h3 className="font-bold text-slate-800">Scan to Pay</h3>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 inline-block overflow-hidden">
                <Image src="/pgf-qr.png" alt="Pema Ga-tshal Foundation donation QR code" width={180} height={180} className="object-contain" />
              </div>
              <p className="text-xs text-slate-500 text-center max-w-xs">
                Scan the QR code with your payment app, complete the payment, then upload a screenshot below.
              </p>
            </div>

            {/* ── Amount Summary ── */}
            <div className="bg-[var(--color-pgf-primary)]/5 border border-[var(--color-pgf-primary)]/20 rounded-2xl p-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Donation Amount</p>
                <p className="text-4xl font-black text-[var(--color-pgf-primary)]">${totalAmount}</p>
                <p className="text-xs text-slate-500 mt-1">{item.goal} × {form.numberOfStudents} {form.numberOfStudents === 1 ? "student" : "students"}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">{item.unit}</p>
                <p className="text-2xl font-bold text-slate-700">{item.goal}</p>
              </div>
            </div>

            {/* ── Donor Info ── */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 font-heading">Your Information</h3>

              {/* Name */}
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  required name="donorName" value={form.donorName} onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-[var(--color-pgf-primary)] focus:ring-2 focus:ring-[var(--color-pgf-primary)]/20 outline-none text-sm transition"
                />
              </div>

              {/* Address */}
              <div className="relative">
                <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  required name="address" value={form.address} onChange={handleChange}
                  placeholder="Street Address"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-[var(--color-pgf-primary)] focus:ring-2 focus:ring-[var(--color-pgf-primary)]/20 outline-none text-sm transition"
                />
              </div>

              {/* Country + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <select
                    required name="country" value={form.country} onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-[var(--color-pgf-primary)] focus:ring-2 focus:ring-[var(--color-pgf-primary)]/20 outline-none text-sm transition appearance-none bg-white"
                  >
                    <option value="">Select Country</option>
                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    required name="phone" value={form.phone} onChange={handleChange}
                    placeholder="Phone Number" type="tel"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-[var(--color-pgf-primary)] focus:ring-2 focus:ring-[var(--color-pgf-primary)]/20 outline-none text-sm transition"
                  />
                </div>
              </div>

              {/* Number of Students */}
              <div className="relative">
                <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  required type="number" min={1} name="numberOfStudents" value={form.numberOfStudents} onChange={handleChange}
                  placeholder="Number of Students to Sponsor"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-[var(--color-pgf-primary)] focus:ring-2 focus:ring-[var(--color-pgf-primary)]/20 outline-none text-sm transition"
                />
              </div>
            </div>

            {/* ── File Uploads ── */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 font-heading">Attach Documents</h3>

              {/* QR Screenshot */}
              <div
                onClick={() => qrRef.current?.click()}
                className="border-2 border-dashed border-slate-200 hover:border-[var(--color-pgf-primary)] rounded-2xl p-5 cursor-pointer transition-colors group"
              >
                <input ref={qrRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e, "qr")} />
                {qrPreview ? (
                  <div className="flex items-center gap-4">
                    <img src={qrPreview} alt="QR preview" className="w-16 h-16 rounded-lg object-cover border border-slate-100" />
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">QR Screenshot attached</p>
                      <p className="text-xs text-slate-500">Click to change</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 text-slate-400 group-hover:text-[var(--color-pgf-primary)] transition-colors">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[var(--color-pgf-primary)]/10">
                      <Upload size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Upload Payment Screenshot</p>
                      <p className="text-xs">Photo of your QR payment confirmation</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Donor Photo */}
              <div
                onClick={() => photoRef.current?.click()}
                className="border-2 border-dashed border-slate-200 hover:border-[var(--color-pgf-primary)] rounded-2xl p-5 cursor-pointer transition-colors group"
              >
                <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e, "photo")} />
                {photoPreview ? (
                  <div className="flex items-center gap-4">
                    <img src={photoPreview} alt="Donor preview" className="w-16 h-16 rounded-full object-cover border border-slate-200" />
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">Donor photo attached</p>
                      <p className="text-xs text-slate-500">Click to change</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 text-slate-400 group-hover:text-[var(--color-pgf-primary)] transition-colors">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[var(--color-pgf-primary)]/10">
                      <ImageIcon size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Upload Your Photo <span className="text-slate-400 font-normal">(optional)</span></p>
                      <p className="text-xs">A profile photo to accompany your donation</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── Error ── */}
            {error && (
              <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl border border-red-100">{error}</p>
            )}

            {/* ── Submit ── */}
            <button
              type="submit" disabled={loading}
              className="w-full py-4 bg-[var(--color-pgf-primary)] hover:bg-[var(--color-pgf-primary)]/90 disabled:opacity-60 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg shadow-[var(--color-pgf-primary)]/30"
            >
              {loading ? <><Loader2 size={22} className="animate-spin" /> Submitting…</> : <>Submit Donation · ${totalAmount}</>}
            </button>

            <p className="text-center text-xs text-slate-400">
              By submitting you agree to our privacy policy. Your data is used only for donation records.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
