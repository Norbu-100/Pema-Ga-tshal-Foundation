import prisma from "@/lib/prisma";
import { Bell } from "lucide-react";

export default async function Notices() {
  const notices = await prisma.notice.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  if (notices.length === 0) return null;

  return (
    <section id="notices" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-[var(--color-pgf-secondary)] font-bold tracking-wider uppercase text-sm mb-4 block">Latest Updates</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900">
              News & Notices
            </h2>
          </div>
          <a href="#contact" className="text-[var(--color-pgf-primary)] font-semibold hover:underline flex items-center gap-2">
            Subscribe for updates &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {notices.map((notice: { id: string; title: string; content: string; createdAt: Date }) => (
            <div key={notice.id} className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white shadow-sm text-[var(--color-pgf-secondary)] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bell size={20} />
              </div>
              <p className="text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">
                {new Date(notice.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
              <h3 className="text-xl font-bold text-slate-900 mb-4 font-heading group-hover:text-[var(--color-pgf-primary)] transition-colors">
                {notice.title}
              </h3>
              <p className="text-slate-600 line-clamp-3">
                {notice.content}
              </p>
              <button className="mt-6 text-[var(--color-pgf-primary)] font-semibold hover:text-[var(--color-pgf-accent)] transition-colors">
                Read more
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
