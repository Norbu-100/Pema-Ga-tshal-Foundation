"use client";

import { useState, useEffect } from "react";
import { Trash2, Users, ImageIcon } from "lucide-react";

type TeamMember = {
  id: string;
  name: string;
  position: string;
  message: string;
  photoUrl: string | null;
  createdAt: string;
};

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [form, setForm] = useState({ name: "", position: "", message: "" });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await fetch("/api/team");
      const data = await res.json();
      if (Array.isArray(data)) setMembers(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("position", form.position);
    formData.append("message", form.message);
    if (file) formData.append("file", file);

    try {
      const res = await fetch("/api/team", {
        method: "POST",
        body: formData,
      });
      
      if (res.ok) {
        setForm({ name: "", position: "", message: "" });
        setFile(null);
        fetchMembers();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this member from the team?")) return;
    
    try {
      const res = await fetch(`/api/team?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMembers(members.filter(m => m.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 font-heading">Manage Team Members</h1>
        <p className="text-slate-600 mt-2">Add or remove members from the foundation's public team page.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Create Form */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit sticky top-8">
          <h2 className="text-lg font-bold mb-4 font-heading">Add Team Member</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <input 
                required 
                value={form.name} 
                onChange={(e) => setForm({...form, name: e.target.value})}
                type="text" 
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" 
                placeholder="e.g. Tenzin Choedron" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Position / Role</label>
              <input 
                required 
                value={form.position} 
                onChange={(e) => setForm({...form, position: e.target.value})}
                type="text" 
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" 
                placeholder="e.g. Principal / Founder" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Message / Bio</label>
              <textarea 
                required 
                value={form.message} 
                onChange={(e) => setForm({...form, message: e.target.value})}
                rows={3} 
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none" 
                placeholder="A short message or bio..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Profile Photo (Optional)</label>
              <input 
                type="file" 
                accept="image/*" 
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-colors"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>
            <button 
              disabled={creating}
              type="submit" 
              className="w-full py-3 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg disabled:bg-slate-300 transition-colors"
            >
              {creating ? "Adding..." : "Add Member"}
            </button>
          </form>
        </div>

        {/* Members List Grid */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading team...</div>
          ) : members.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-100 text-center flex flex-col items-center">
              <Users size={48} className="text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">No team members</h3>
              <p className="text-slate-500">Add members to display them in the team section.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {members.map((member) => (
                <div key={member.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                  {member.photoUrl ? (
                    <div className="h-48 w-full bg-slate-100">
                      <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover object-top" />
                    </div>
                  ) : (
                    <div className="h-48 w-full bg-slate-100 flex items-center justify-center">
                      <ImageIcon size={48} className="text-slate-300" />
                    </div>
                  )}
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                        <p className="text-[var(--color-pgf-primary)] font-medium text-sm">{member.position}</p>
                      </div>
                      <button 
                        onClick={() => handleDelete(member.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1 bg-slate-50 rounded-full"
                        title="Delete member"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-slate-600 mt-2 flex-1 text-sm italic">"{member.message}"</p>
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
