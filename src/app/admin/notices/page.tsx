"use client";

import { useState, useEffect } from "react";
import { Trash2, AlertCircle, Bell } from "lucide-react";

type Notice = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [form, setForm] = useState({ title: "", content: "" });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await fetch("/api/notices");
      const data = await res.json();
      if (Array.isArray(data)) setNotices(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    
    try {
      const res = await fetch("/api/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      
      if (res.ok) {
        setForm({ title: "", content: "" });
        fetchNotices();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this notice?")) return;
    
    try {
      const res = await fetch(`/api/notices?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setNotices(notices.filter(n => n.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 font-heading">Manage Notices</h1>
        <p className="text-slate-600 mt-2">Publish and manage news and updates for the foundation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Create Form */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit">
          <h2 className="text-lg font-bold mb-4 font-heading">Create Notice</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
              <input 
                required 
                value={form.title} 
                onChange={(e) => setForm({...form, title: e.target.value})}
                type="text" 
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" 
                placeholder="Notice title..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
              <textarea 
                required 
                value={form.content} 
                onChange={(e) => setForm({...form, content: e.target.value})}
                rows={5} 
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none" 
                placeholder="Notice details..." 
              />
            </div>
            <button 
              disabled={creating}
              type="submit" 
              className="w-full py-3 bg-[var(--color-pgf-primary)] hover:bg-[var(--color-pgf-primary)]/90 text-white font-medium rounded-lg disabled:bg-slate-300"
            >
              {creating ? "Publishing..." : "Publish Notice"}
            </button>
          </form>
        </div>

        {/* Notices List */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading notices...</div>
          ) : notices.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-100 text-center flex flex-col items-center">
              <AlertCircle size={48} className="text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">No active notices</h3>
              <p className="text-slate-500">Use the form to publish a new update.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notices.map((notice) => (
                <div key={notice.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4 transition-all hover:shadow-md">
                  <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center shrink-0">
                    <Bell size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-slate-900">{notice.title}</h3>
                      <button 
                        onClick={() => handleDelete(notice.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                        title="Delete notice"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-slate-600 whitespace-pre-wrap">{notice.content}</p>
                    <p className="text-xs text-slate-400 mt-4 font-medium uppercase tracking-wider">
                      {new Date(notice.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
