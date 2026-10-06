import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight, Sparkles, Building2 } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const ExperienceSection: React.FC = () => {
  const [selectedExp, setSelectedExp] = useState<number>(0);

  const active = EXPERIENCES[selectedExp];

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-medium">
          <Briefcase className="w-3.5 h-3.5" />
          <span>CAREER TIMELINE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          6+ Years of Proven Industry Impact
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          From high-throughput e-commerce CI/CD to enterprise cloud migrations and autonomous AI security governance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Navigation: Companies List */}
        <div className="lg:col-span-4 space-y-3">
          {EXPERIENCES.map((exp, index) => {
            const isSelected = selectedExp === index;
            return (
              <div
                key={exp.company}
                onClick={() => {
                  sound.click();
                  setSelectedExp(index);
                }}
                onMouseEnter={() => sound.hover()}
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden ${
                  isSelected
                    ? 'bg-dark-900 border-cyan-400 shadow-xl shadow-cyan-500/10 scale-[1.02]'
                    : 'bg-dark-950/60 border-white/10 hover:border-cyan-500/30 opacity-75 hover:opacity-100'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-blue-500" />
                )}

                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400 font-semibold">{exp.period}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90 text-cyan-400' : 'text-slate-600'}`} />
                </div>

                <h3 className="text-base font-bold text-white mt-1.5">{exp.company}</h3>
                <p className="text-xs text-slate-300 font-mono mt-0.5">{exp.role}</p>

                <div className="flex items-center space-x-3 text-[11px] text-slate-400 font-mono mt-3">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span>{exp.location}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Detail Panel: Experience Responsibilities, Environment, and Key Achievements */}
        <div className="lg:col-span-8 bg-dark-900/90 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
          
          <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-cyan-400" />
                <h3 className="text-2xl font-bold text-white">{active.company}</h3>
              </div>
              <div className="text-sm font-semibold text-cyan-300 mt-1 font-mono">{active.role}</div>
            </div>

            <div className="text-right text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 inline-block font-semibold">
                {active.period}
              </span>
              <div className="text-slate-400 mt-1">{active.location}</div>
            </div>
          </div>

          {/* Project Title & Overview */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              Project: {active.project}
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {active.summary}
            </p>
          </div>

          {/* Key Achievements */}
          {active.achievements && active.achievements.length > 0 && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/30 to-cyan-950/20 border border-emerald-500/30 space-y-2">
              <div className="text-xs font-mono text-emerald-300 font-bold flex items-center space-x-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Impact Highlights</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {active.achievements.map((ach, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">★</span>
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Detailed Responsibilities List */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Engineering Responsibilities:
            </div>
            <ul className="space-y-2.5">
              {active.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Environment & Tech Stack Tags */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <div className="text-xs font-mono text-slate-400">Environment & Tools:</div>
            <div className="flex flex-wrap gap-1.5">
              {active.environment.map((env) => (
                <span
                  key={env}
                  className="px-2.5 py-1 rounded-md bg-dark-950 border border-white/10 text-xs font-mono text-slate-300 hover:text-cyan-300 hover:border-cyan-500/30 transition-colors"
                >
                  {env}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

