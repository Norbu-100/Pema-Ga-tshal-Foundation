"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Image as ImageIcon, Bell, LogOut, ArrowLeft, Users, HandHeart, Trophy } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold font-heading text-white">Pema Ga-Tshal Admin</h2>
          <p className="text-slate-400 text-sm mt-1">Dashboard Panel</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            <LayoutDashboard size={20} />
            Overview
          </Link>
          <Link href="/admin/photos" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            <ImageIcon size={20} />
            Manage Photos
          </Link>
          <Link href="/admin/notices" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            <Bell size={20} />
            Manage Notices
          </Link>
          <Link href="/admin/team" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            <Users size={20} />
            Manage Team
          </Link>
          <Link href="/admin/donations" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            <HandHeart size={20} />
            Manage Donations
          </Link>
          <Link href="/admin/donor-posts" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            <Trophy size={20} />
            Donor Spotlights
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors mb-2">
            <ArrowLeft size={20} />
            Back to Site
          </Link>
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="text-left w-full">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto w-full">
        {children}
      </main>
    </div>
  );
}
