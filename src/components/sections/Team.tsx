import prisma from "@/lib/prisma";
import { Users, Quote } from "lucide-react";

export default async function Team() {
  const members = await prisma.teamMember.findMany({
    orderBy: { createdAt: "asc" },
  });

  if (members.length === 0) return null;

  return (
    <section id="team" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[var(--color-pgf-primary)] font-bold tracking-wider uppercase text-sm mb-4 block">Meet Our Team & Members</span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
            Our Dedicated Team
          </h2>
          <p className="text-slate-600 text-lg">
            The passionate individuals working tirelessly to provide education, shelter, and health to the communities of Nepal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {members.map((member: { id: string; name: string; position: string; message: string; photoUrl: string | null; createdAt: Date }) => (
            <div key={member.id} className="group relative bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300">
              {/* Photo */}
              <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-md">
                {member.photoUrl ? (
                  <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                    <Users size={32} />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 font-heading">{member.name}</h3>
                <p className="text-[var(--color-pgf-secondary)] font-medium text-sm mt-1">{member.position}</p>
              </div>

              {/* Message Blockquote */}
              <div className="relative bg-none p-6  mt-auto">
                <Quote className="absolute top-4 left-4 text-blue-50 opacity-50 w-12 h-12 -z-10" />
                <p className="text-slate-600 italic text-sm text-center leading-relaxed">
                  "{member.message}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
