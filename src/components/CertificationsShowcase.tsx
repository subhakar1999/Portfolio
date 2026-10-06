import React from 'react';
import { Award, ShieldCheck, Boxes, Database, GraduationCap, CheckCircle2, Sparkles } from 'lucide-react';
import { CERTIFICATIONS, EDUCATION } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const CertificationsShowcase: React.FC = () => {
  const getCertIcon = (icon: string) => {
    switch (icon) {
      case 'Boxes': return <Boxes className="w-6 h-6 text-purple-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-cyan-400" />;
      case 'Database': return <Database className="w-6 h-6 text-emerald-400" />;
      default: return <Award className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium">
          <Award className="w-3.5 h-3.5" />
          <span>CREDENTIALS & ACADEMICS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Verified Certifications & Education
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Industry-accredited certifications validating expertise in Cloud Security, Infrastructure as Code, and Cloud Fundamentals.
        </p>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {CERTIFICATIONS.map((cert) => (
          <div
            key={cert.name}
            onMouseEnter={() => sound.hover()}
            className="group relative rounded-2xl bg-dark-900/90 border border-white/10 p-6 shadow-xl backdrop-blur-xl hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-dark-950 border border-white/10 group-hover:scale-110 transition-transform">
                  {getCertIcon(cert.icon)}
                </div>
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-[11px] font-bold">
                  {cert.badgeCode}
                </span>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-400 block">{cert.issuer}</span>
                <h3 className="text-lg font-bold text-white mt-1 group-hover:text-cyan-200 transition-colors">
                  {cert.name}
                </h3>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <div className="text-[11px] font-mono text-slate-400">Validated Domains:</div>
                {cert.skillsVerified.map((s) => (
                  <div key={s} className="flex items-center space-x-2 text-xs text-slate-300 font-sans">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-emerald-400 flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                <span>Active & Verified</span>
              </span>
              <span>{cert.issueDate}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Education Card */}
      <div className="rounded-2xl bg-gradient-to-r from-dark-900/90 via-dark-850/90 to-dark-900/90 border border-white/10 p-7 shadow-xl backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Academic Background</div>
            <h3 className="text-xl font-bold text-white mt-0.5">{EDUCATION.degree}</h3>
            <p className="text-slate-300 text-sm font-mono mt-0.5">
              {EDUCATION.university} • Aggregate: <strong className="text-cyan-400">{EDUCATION.aggregate}</strong>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-300">
          {EDUCATION.highlights.map((h) => (
            <span key={h} className="px-3 py-1.5 rounded-lg bg-dark-950 border border-white/10">
              {h}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

