"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Trophy, Trash2, Plus, X, Upload, 
  MapPin, Gift, DollarSign, Loader2, Image as ImageIcon
} from "lucide-react";
import Image from "next/image";

type DonorPost = {
  id: string;
  donorName: string;
  giftTitle: string;
  amount: number;
  message: string | null;
  photoUrl: string | null;
  country: string | null;
  createdAt: string;
};

export default function DonorSpotlights() {
  const [posts, setPosts] = useState<DonorPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    donorName: "",
    giftTitle: "",
    amount: "",
    country: "",
    message: ""
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/donor-posts");
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch donor posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("donorName", form.donorName);
      fd.append("giftTitle", form.giftTitle);
      fd.append("amount", form.amount);
      fd.append("country", form.country);
      fd.append("message", form.message);
      if (photo) fd.append("photo", photo);

      const res = await fetch("/api/donor-posts", {
        method: "POST",
        body: fd
      });

      if (res.ok) {
        const newPost = await res.json();
        setPosts([newPost, ...posts]);
        setShowAddModal(false);
        setForm({ donorName: "", giftTitle: "", amount: "", country: "", message: "" });
        setPhoto(null);
        setPreview(null);
      }
    } catch (error) {
      console.error("Failed to create donor post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this donor spotlight?")) return;
    try {
      const res = await fetch(`/api/donor-posts?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setPosts(prev => prev.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-heading">Donor Spotlights</h1>
          <p className="text-slate-600 mt-2">Share the stories of your generous supporters.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-[var(--color-pgf-primary)] hover:bg-[var(--color-pgf-primary)]/90 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-[var(--color-pgf-primary)]/20"
        >
          <Plus size={20} /> Add Spotlight
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-[var(--color-pgf-primary)]" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length === 0 ? (
            <div className="col-span-full bg-white p-20 text-center rounded-2xl border border-dashed border-slate-200">
              <Trophy className="mx-auto text-slate-200 mb-4" size={48} />
              <p className="text-slate-500">No donor spotlights yet. Share a story!</p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group">
                <div className="aspect-video relative overflow-hidden bg-slate-100">
                  {post.photoUrl ? (
                    <Image src={post.photoUrl} alt={post.donorName} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <ImageIcon size={48} />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="p-2 bg-white/90 backdrop-blur-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors shadow-sm"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <span className="bg-white/20 backdrop-blur-md text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                      Donor Story
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-xl text-slate-900">{post.donorName}</h3>
                    <p className="font-black text-[var(--color-pgf-primary)]">${post.amount}</p>
                  </div>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Gift size={14} className="text-slate-400" /> {post.giftTitle}
                    </div>
                    {post.country && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin size={14} className="text-slate-400" /> {post.country}
                      </div>
                    )}
                  </div>
                  {post.message && (
                    <p className="text-slate-600 text-sm italic line-clamp-3">"{post.message}"</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Add Spotlight Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900 font-heading">New Donor Spotlight</h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Donor Name</label>
                  <input 
                    required type="text"
                    value={form.donorName}
                    onChange={(e) => setForm({...form, donorName: e.target.value})}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[var(--color-pgf-primary)]/20 outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Gift Title</label>
                  <input 
                    required type="text"
                    value={form.giftTitle}
                    onChange={(e) => setForm({...form, giftTitle: e.target.value})}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[var(--color-pgf-primary)]/20 outline-none"
                    placeholder="Hostel Apparel"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Amount ($)</label>
                  <input 
                    required type="number"
                    value={form.amount}
                    onChange={(e) => setForm({...form, amount: e.target.value})}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[var(--color-pgf-primary)]/20 outline-none"
                    placeholder="50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Country</label>
                  <input 
                    type="text"
                    value={form.country}
                    onChange={(e) => setForm({...form, country: e.target.value})}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[var(--color-pgf-primary)]/20 outline-none"
                    placeholder="USA"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Spotlight Message</label>
                <textarea 
                  value={form.message}
                  onChange={(e) => setForm({...form, message: e.target.value})}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[var(--color-pgf-primary)]/20 outline-none h-24"
                  placeholder="Share a brief message or quote from the donor..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Spotlight Photo</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-[var(--color-pgf-primary)] transition-colors cursor-pointer group"
                >
                  <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  {preview ? (
                    <div className="flex items-center justify-center">
                      <img src={preview} alt="Preview" className="max-h-32 rounded-lg" />
                    </div>
                  ) : (
                    <div className="text-slate-400 group-hover:text-[var(--color-pgf-primary)] transition-colors">
                      <Upload className="mx-auto mb-2" size={24} />
                      <p className="text-sm font-medium">Click to upload photo</p>
                    </div>
                  )}
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[var(--color-pgf-primary)] hover:bg-[var(--color-pgf-primary)]/90 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-[var(--color-pgf-primary)]/20 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Create Spotlight Post"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
