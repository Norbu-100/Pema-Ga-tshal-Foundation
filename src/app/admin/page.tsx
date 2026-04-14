import prisma from "@/lib/prisma";
export const dynamic = "force-dynamic";
import Link from "next/link";
import { Users, Mail, Image as ImageIcon, Bell, HandHeart, Trophy } from "lucide-react";

export default async function AdminDashboard() {
  const [messagesCount, photosCount, noticesCount, donationsCount] = await Promise.all([
    prisma.contactMessage.count(),
    (prisma as any).photo.count(),
    (prisma as any).notice.count(),
    (prisma as any).donation.count({ where: { status: "pending" } }),
  ]);

  const recentMessages = await prisma.contactMessage.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  const recentDonations = await (prisma as any).donation.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 font-heading">Dashboard Overview</h1>
        <p className="text-slate-600 mt-2">Welcome to the Pema Ga-Tshal Foundation administration panel.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Mail size={24} />
          </div>
          <div>
            <p className="text-slate-500 font-medium">Messages</p>
            <p className="text-3xl font-bold text-slate-900">{messagesCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
            <ImageIcon size={24} />
          </div>
          <div>
            <p className="text-slate-500 font-medium">Gallery Photos</p>
            <p className="text-3xl font-bold text-slate-900">{photosCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center">
            <Bell size={24} />
          </div>
          <div>
            <p className="text-slate-500 font-medium">Active Notices</p>
            <p className="text-3xl font-bold text-slate-900">{noticesCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
            <HandHeart size={24} />
          </div>
          <div>
            <p className="text-slate-500 font-medium">Pending Donations</p>
            <p className="text-3xl font-bold text-slate-900">{donationsCount}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Recent Messages */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-lg text-slate-900">Recent Messages</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {recentMessages.length === 0 ? (
              <p className="p-6 text-slate-500 text-center">No messages yet.</p>
            ) : (
              recentMessages.map((msg: { id: string; firstName: string; lastName: string; createdAt: Date; message: string; email: string }) => (
                <div key={msg.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-900">{msg.firstName} {msg.lastName}</h4>
                    <span className="text-xs text-slate-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-slate-600 truncate">{msg.message}</p>
                  <p className="text-xs text-blue-600 mt-2 font-medium">{msg.email}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Shortcuts */}
        <div className="space-y-6">
          <Link href="/admin/photos" className="block w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                  <ImageIcon size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Upload New Photo</h4>
                  <p className="text-sm text-slate-500">Update the public gallery.</p>
                </div>
              </div>
              <div className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all">
                &rarr;
              </div>
            </div>
          </Link>

          <Link href="/admin/notices" className="block w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center group-hover:bg-yellow-100 transition-colors">
                  <Bell size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Publish Notice</h4>
                  <p className="text-sm text-slate-500">Broadcast news and updates.</p>
                </div>
              </div>
              <div className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all">
                &rarr;
              </div>
            </div>
          </Link>

          <Link href="/admin/donations" className="block w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center group-hover:bg-red-100 transition-colors">
                  <HandHeart size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Review Donations</h4>
                  <p className="text-sm text-slate-500">Approve or reject pending gifts.</p>
                </div>
              </div>
              <div className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all">
                &rarr;
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Donations Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-lg text-slate-900">Recent Donations</h3>
          <Link href="/admin/donations" className="text-sm text-[var(--color-pgf-primary)] font-semibold hover:underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Donor</th>
                <th className="px-6 py-4 font-semibold">Gift</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentDonations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No donations yet.</td>
                </tr>
              ) : (
                recentDonations.map((d: any) => (
                  <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">{d.donorName}</p>
                      <p className="text-xs text-slate-500">{d.country}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-700">{d.giftTitle}</p>
                      <p className="text-xs text-slate-500">{d.numberOfStudents} Students</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">${d.totalAmount}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        d.status === 'accepted' ? 'bg-green-100 text-green-700' :
                        d.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-xs text-slate-500">{new Date(d.createdAt).toLocaleDateString()}</p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
