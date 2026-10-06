import React, { useState, useEffect } from 'react';
import { Shield, Terminal, ArrowRight, CheckCircle2, Lock, Cpu, Cloud, Sparkles, Download, Layers, Zap, ShieldCheck, Compass } from 'lucide-react';
import { PERSONAL_INFO, CERTIFICATIONS } from '../data/portfolioData';
import { PersonaMode } from './DualSynergySection';
import { InteractiveFramePlayer } from './InteractiveFramePlayer';
import { sound } from '../utils/audio';

interface Props {
  personaMode: PersonaMode;
  onSelectPersona: (mode: PersonaMode) => void;
  onOpenTerminal: () => void;
  onOpenRoleModal: () => void;
}

export const HeroSection: React.FC<Props> = ({ personaMode, onSelectPersona, onOpenTerminal, onOpenRoleModal }) => {
  const [roleIndex, setRoleIndex] = useState(0);

  // Dynamic roles based on persona mode
  const currentRoles = personaMode === 'devops'
    ? [
        "Senior Azure & Multi-Cloud DevOps Engineer",
        "CI/CD Pipeline Automation Specialist",
        "Terraform & Landing Zone Architect",
        "Azure Kubernetes (AKS) & .NET Specialist"
      ]
    : personaMode === 'security'
    ? [
        "Senior Azure Cloud Security Engineer",
        "DevSecOps Shift-Left Architect",
        "Microsoft Sentinel SIEM/SOAR Specialist",
        "AI Security Analyst & Governance Lead"
      ]
    : PERSONAL_INFO.roles;

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % currentRoles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentRoles.length]);

  return (
    <section id="overview" className="relative min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 cyber-grid flex flex-col justify-center">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        
        {/* Left Column: Hero Text & Call to Actions */}
        <div className="lg:col-span-6 space-y-6 text-left">
          
          {/* Status Badge & Persona Pill & Choose Track Trigger */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-dark-900/90 border border-cyan-500/30 shadow-lg shadow-cyan-500/10 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono text-slate-300 font-medium tracking-wide">
                {personaMode === 'devops'
                  ? 'Senior Cloud DevOps • Ex-Carelon & SysBig'
                  : personaMode === 'security'
                  ? 'Senior Azure Security @ Volkswagen Group'
                  : PERSONAL_INFO.status}
              </span>
            </div>

            {/* Quick switcher buttons */}
            <div className="inline-flex items-center bg-dark-900/80 p-1 rounded-full border border-white/10 text-[11px] font-mono">
              <button
                onClick={() => onSelectPersona('devops')}
                className={`px-2.5 py-0.5 rounded-full transition-all ${
                  personaMode === 'devops' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-blue-300'
                }`}
              >
                ⚡ DevOps
              </button>
              <button
                onClick={() => onSelectPersona('security')}
                className={`px-2.5 py-0.5 rounded-full transition-all ${
                  personaMode === 'security' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-emerald-300'
                }`}
              >
                🛡️ SecOps
              </button>
            </div>

            {/* Choose Track Modal Trigger Button */}
            <button
              onClick={() => {
                sound.click();
                onOpenRoleModal();
              }}
              className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono transition-all"
            >
              <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
              <span>Choose Track</span>
            </button>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.1]">
              {personaMode === 'devops' ? (
                <>
                  Automating Cloud & <br />
                  <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                    CI/CD Velocity
                  </span>
                </>
              ) : personaMode === 'security' ? (
                <>
                  Securing Cloud & <br />
                  <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                    Shift-Left DevSecOps
                  </span>
                </>
              ) : (
                <>
                  Cloud Security & <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                    DevOps at Scale
                  </span>
                </>
              )}
            </h1>

            {/* Dynamic Role Subtitle */}
            <div className="h-8 flex items-center">
              <span className="text-base sm:text-lg text-slate-400 font-mono flex items-center space-x-2">
                <span className="text-cyan-400 font-bold">&gt;</span>
                <span className="text-slate-200 font-semibold transition-all duration-300">
                  {currentRoles[roleIndex % currentRoles.length]}
                </span>
                <span className="animate-pulse text-cyan-400 font-mono">_</span>
              </span>
            </div>
          </div>

          {/* Summary */}
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
            {personaMode === 'devops'
              ? "DevOps & Cloud Engineer with 6+ years specializing in Azure DevOps, Terraform IaC, Argo CD GitOps, 70+ enterprise application cloud migrations, and high-performance .NET/Java CI/CD automation."
              : personaMode === 'security'
              ? "Senior Azure Security & DevSecOps Engineer specializing in Microsoft Sentinel SIEM/SOAR, Defender for Cloud, custom AI security analyst agents, and shift-left SAST/DAST/SCA quality gating at Volkswagen Group."
              : PERSONAL_INFO.summary}
          </p>

          {/* Quick Metrics Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {PERSONAL_INFO.stats.map((stat) => (
              <div
                key={stat.label}
                onMouseEnter={() => sound.hover()}
                className="bg-dark-900/60 border border-white/10 rounded-xl p-3 backdrop-blur-md hover:border-cyan-500/30 transition-all group"
              >
                <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400 group-hover:scale-105 transition-transform">
                  {stat.value}
                </div>
                <div className="text-[11px] text-slate-400 leading-tight mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              onClick={() => {
                sound.click();
                onOpenRoleModal();
              }}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-dark-950 font-bold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span>Explore Roles & Synergy</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                sound.click();
                onOpenTerminal();
              }}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-dark-900/90 hover:bg-dark-850 text-emerald-400 border border-emerald-500/40 font-mono text-sm shadow-lg hover:shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch Terminal</span>
            </button>

            {/* Smart Resume Link matching persona */}
            <a
              href={personaMode === 'devops' ? "/Bharath_Koneru_Azure_DevOps_engineer.pdf" : "/Bharath_Sai_Subhakar_DevSecOps_AzureAI_6yearsexp.docx"}
              download
              onClick={() => sound.success()}
              className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-medium text-sm transition-all duration-200"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>{personaMode === 'devops' ? 'Download DevOps CV' : 'Download SecOps CV'}</span>
            </a>
          </div>

          {/* Quick Certifications Row */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono text-slate-400">
            <span className="text-slate-500">Verified Credentials:</span>
            {CERTIFICATIONS.map((cert) => (
              <span
                key={cert.name}
                className="px-2.5 py-1 rounded-md bg-dark-900/80 border border-white/10 text-slate-300 flex items-center space-x-1"
              >
                <span className="text-cyan-400">✓</span>
                <span>{cert.issuer} {cert.badgeCode}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive 3D Video Frame Visualizer */}
        <div className="lg:col-span-6 relative">
          <div className="relative mx-auto max-w-lg lg:max-w-none">
            {/* Outer Glow Halo */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500/30 via-blue-600/30 to-purple-600/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 -z-10 animate-pulse-slow" />
            
            {/* The 3D Interactive Canvas Frame Player */}
            <InteractiveFramePlayer
              className="h-[260px] sm:h-[400px] lg:h-[480px] w-full"
              isHero={true}
            />

            {/* Interactive Feature Callouts under canvas */}
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div className="p-2 rounded-lg bg-dark-900/70 border border-white/10 text-slate-300">
                <span className="text-cyan-400 font-bold">192</span> HD Frames
              </div>
              <div className="p-2 rounded-lg bg-dark-900/70 border border-white/10 text-slate-300">
                <span className="text-emerald-400 font-bold">24 FPS</span> Smooth Canvas
              </div>
              <div className="p-2 rounded-lg bg-dark-900/70 border border-white/10 text-slate-300">
                <span className="text-blue-400 font-bold">360°</span> Interactive Scrub
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
