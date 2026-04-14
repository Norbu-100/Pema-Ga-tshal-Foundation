"use client";

import { useState, useEffect } from "react";
import {
  HandHeart, CheckCircle, XCircle, Trash2, Eye,
  ExternalLink, Calendar, Users, MapPin, Loader2, Search, Trophy
} from "lucide-react";
import Image from "next/image";

type Donation = {
  id: string;
  donorName: string;
  address: string;
  country: string;
  phone: string;
  giftTitle: string;
  goalPerUnit: number;
  numberOfStudents: number;
  totalAmount: number;
  qrScreenshotUrl: string | null;
  donorPhotoUrl: string | null;
  status: string;
  adminNote: string | null;
  createdAt: string;
};

export default function ManageDonations() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [search, setSearch] = useState("");
  const [adminNote, setAdminNote] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await fetch("/api/donations");
      const data = await res.json();
      setDonations(data);
    } catch (error) {
      console.error("Failed to fetch donations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    setIsUpdating(true);
    try {
      const res = await fetch("/api/donations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, adminNote }),
      });
      if (res.ok) {
        setDonations(prev => prev.map(d => d.id === id ? { ...d, status, adminNote } : d));
        setSelectedDonation(null);
        setAdminNote("");
      }
    } catch (error) {
      console.error("Failed to update donation:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePromoteToSpotlight = async (donation: Donation) => {
    setIsUpdating(true);
    try {
      const fd = new FormData();
      fd.append("donorName", donation.donorName);
      fd.append("giftTitle", donation.giftTitle);
      fd.append("amount", String(donation.totalAmount));
      fd.append("country", donation.country);
      fd.append("message", donation.adminNote || `A generous gift of ${donation.giftTitle} to support ${donation.numberOfStudents} students.`);
      if (donation.donorPhotoUrl) {
        fd.append("photoUrl", donation.donorPhotoUrl);
      }

      // If there's a donor photo, we can't easily send the URL as a File, 
      // but our API can be updated to accept a photoUrl directly or we just skip the photo for now.
      // For now, let's just create the post without the photo file if it's a direct promote, 
      // or we can update the API to handle the URL.
      // Let's assume the API handles photoUrl or we just skip it to keep it simple for now.

      const res = await fetch("/api/donor-posts", {
        method: "POST",
        body: fd
      });

      if (res.ok) {
        alert("Donation promoted to Spotlight successfully!");
      }
    } catch (error) {
      console.error("Failed to promote donation:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this donation record?")) return;
    try {
      const res = await fetch(`/api/donations?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setDonations(prev => prev.filter(d => d.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete donation:", error);
    }
  };

  const filteredDonations = donations.filter(d =>
    d.donorName.toLowerCase().includes(search.toLowerCase()) ||
    d.giftTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-heading">Manage Donations</h1>
          <p className="text-slate-600 mt-2">Review and process student support gifts.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search donors or gifts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-pgf-primary)]/20 focus:border-[var(--color-pgf-primary)] w-full md:w-80"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-[var(--color-pgf-primary)]" size={40} />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Donor & Gifts</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Documents</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDonations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center text-slate-500">No donations found.</td>
                  </tr>
                ) : (
                  filteredDonations.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {d.donorPhotoUrl ? (
                            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-200">
                              <Image src={d.donorPhotoUrl} alt={d.donorName} width={40} height={40} className="object-cover w-full h-full" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                              <Users size={20} />
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-slate-900">{d.donorName}</p>
                            <p className="text-xs text-slate-500">{d.giftTitle} ({d.numberOfStudents} Students)</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900">${d.totalAmount}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wide">Paid via QR</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {d.qrScreenshotUrl ? (
                            <button
                              onClick={() => window.open(d.qrScreenshotUrl || '', '_blank')}
                              className="p-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors title='View QR Screenshot'"
                            >
                              <Eye size={16} />
                            </button>
                          ) : (
                            <span className="text-xs text-slate-400 italic">No proof</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${d.status === 'accepted' ? 'bg-green-100 text-green-700' :
                            d.status === 'rejected' ? 'bg-red-100 text-red-700' :
                              'bg-yellow-100 text-yellow-700'
                          }`}>
                          {d.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setSelectedDonation(d)}
                            className="p-2 text-slate-400 hover:text-[var(--color-pgf-primary)] transition-colors"
                          >
                            <ExternalLink size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(d.id)}
                            className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Donation Detail Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setSelectedDonation(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500"
            >
              <XCircle size={24} />
            </button>

            <div className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 font-heading">Donation Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Donor Name</p>
                    <p className="text-lg font-bold text-slate-900">{selectedDonation.donorName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Location</p>
                    <p className="text-slate-700 flex items-center gap-2"><MapPin size={14} /> {selectedDonation.address}, {selectedDonation.country}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Contact</p>
                    <p className="text-slate-700">{selectedDonation.phone}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Gift Selection</p>
                    <p className="text-lg font-bold text-[var(--color-pgf-primary)]">{selectedDonation.giftTitle}</p>
                    <p className="text-sm text-slate-500">Sponsoring {selectedDonation.numberOfStudents} students</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Amount Paid</p>
                    <p className="text-2xl font-black text-slate-900">${selectedDonation.totalAmount}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Date Submitted</p>
                    <p className="text-slate-700 flex items-center gap-2"><Calendar size={14} /> {new Date(selectedDonation.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {selectedDonation.qrScreenshotUrl && (
                <div className="mb-8">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">QR Payment Proof</p>
                  <div className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50 inline-block">
                    <img
                      src={selectedDonation.qrScreenshotUrl}
                      alt="Payment proof"
                      className="max-h-60 object-contain cursor-zoom-in"
                      onClick={() => window.open(selectedDonation.qrScreenshotUrl || '', '_blank')}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-4 pt-6 border-t border-slate-100">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Admin Note (Internal)</label>
                  <textarea
                    value={adminNote === "" && selectedDonation.adminNote ? selectedDonation.adminNote : adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    placeholder="Add a private note about this donation..."
                    className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-pgf-primary)]/20 text-sm h-24"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    disabled={isUpdating || selectedDonation.status === 'accepted'}
                    onClick={() => handleUpdateStatus(selectedDonation.id, 'accepted')}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                  >
                    <CheckCircle size={20} /> Accept Donation
                  </button>
                  <button
                    disabled={isUpdating || selectedDonation.status === 'rejected'}
                    onClick={() => handleUpdateStatus(selectedDonation.id, 'rejected')}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                  >
                    <XCircle size={20} /> Reject
                  </button>
                </div>

                {selectedDonation.status === 'accepted' && (
                  <button
                    onClick={() => handlePromoteToSpotlight(selectedDonation)}
                    className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-yellow-500/20"
                  >
                    <Trophy size={20} /> Promote to Spotlight
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
