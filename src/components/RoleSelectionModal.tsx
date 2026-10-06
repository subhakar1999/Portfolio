import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Layers, 
  ArrowRight, 
  Sparkles, 
  X
} from 'lucide-react';
import { PersonaMode } from './DualSynergySection';
import { sound } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (mode: PersonaMode) => void;
}

export const RoleSelectionModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelectRole,
}) => {
  const [selectedMode, setSelectedMode] = useState<PersonaMode | null>(null);

  if (!isOpen) return null;

  const handleChoose = (mode: PersonaMode) => {
    sound.success();
    setSelectedMode(mode);
    onSelectRole(mode);

    // Smooth scroll directly to the relevant skills & synergy section
    setTimeout(() => {
      onClose();
      const targetElement = document.getElementById('synergy') || document.getElementById('bento');
      targetElement?.scrollIntoView({ behavior: 'smooth' });
    }, 250);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-dark-950/85 backdrop-blur-2xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="max-w-4xl w-full bg-dark-900 border border-cyan-500/30 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-cyan-500/15 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close track selector"
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          title="Explore Full Site"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 pt-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CUSTOMIZE YOUR EXPERIENCE</span>
          </div>

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Select Your Role Exploration Track
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm">
            Bharath holds 6+ years of specialized dual mastery. Choose the architectural profile you want to evaluate:
          </p>
        </div>

        {/* 3 Interactive Pathway Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          
          {/* Option 1: Cloud Security & DevSecOps */}
          <div
            onClick={() => handleChoose('security')}
            onMouseEnter={() => sound.hover()}
            className="group relative rounded-2xl bg-dark-950/90 border border-emerald-500/30 hover:border-emerald-400 p-5 sm:p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:shadow-emerald-500/20 hover:scale-[1.02] cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  VOLKSWAGEN
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Cloud Security & DevSecOps
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Microsoft Sentinel SIEM/SOAR, Azure AI Security Agents, Shift-Left SAST/DAST, and Zero-Trust Governance.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-white/10 font-mono text-[11px] text-slate-300">
                <div className="flex items-center space-x-1.5 text-emerald-400">
                  <span>✓</span>
                  <span>Autonomous AI Threat Triage</span>
                </div>
                <div className="flex items-center space-x-1.5 text-emerald-400">
                  <span>✓</span>
                  <span>Snyk & Checkmarx CI Gates</span>
                </div>
                <div className="flex items-center space-x-1.5 text-emerald-400">
                  <span>✓</span>
                  <span>Defender for Cloud & AKS</span>
                </div>
              </div>
            </div>

            <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform">
              <span>Launch SecOps Track</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Option 2: DevOps & Cloud Architecture */}
          <div
            onClick={() => handleChoose('devops')}
            onMouseEnter={() => sound.hover()}
            className="group relative rounded-2xl bg-dark-950/90 border border-blue-500/30 hover:border-blue-400 p-5 sm:p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:shadow-blue-500/20 hover:scale-[1.02] cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 sm:p-3 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  CARELON & SYSBIG
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                  Azure & Multi-Cloud DevOps
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Azure Pipelines, Terraform IaC, Argo CD GitOps, 70+ App Cloud Migrations, and .NET/IIS Automation.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-white/10 font-mono text-[11px] text-slate-300">
                <div className="flex items-center space-x-1.5 text-blue-400">
                  <span>✓</span>
                  <span>120+ Subscriptions Vended</span>
                </div>
                <div className="flex items-center space-x-1.5 text-blue-400">
                  <span>✓</span>
                  <span>70+ Zero-Downtime Apps</span>
                </div>
                <div className="flex items-center space-x-1.5 text-blue-400">
                  <span>✓</span>
                  <span>Terraform & AWS Landing Zone</span>
                </div>
              </div>
            </div>

            <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-blue-400 font-semibold group-hover:translate-x-0.5 transition-transform">
              <span>Launch DevOps Track</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Option 3: Unified Dual Mastery */}
          <div
            onClick={() => handleChoose('unified')}
            onMouseEnter={() => sound.hover()}
            className="group relative rounded-2xl bg-gradient-to-b from-dark-950/90 to-dark-900/90 border border-purple-500/30 hover:border-purple-400 p-5 sm:p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:shadow-purple-500/20 hover:scale-[1.02] cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 sm:p-3 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 group-hover:scale-110 transition-transform">
                  <Layers className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  RECOMMENDED
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                  Unified Dual Master
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Full synergy of building high-velocity delivery pipelines hardened with zero-trust security from day one.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-white/10 font-mono text-[11px] text-slate-300">
                <div className="flex items-center space-x-1.5 text-purple-400">
                  <span>✓</span>
                  <span>Full 6+ Years Breadth</span>
                </div>
                <div className="flex items-center space-x-1.5 text-purple-400">
                  <span>✓</span>
                  <span>DevOps × SecOps Synergy</span>
                </div>
                <div className="flex items-center space-x-1.5 text-purple-400">
                  <span>✓</span>
                  <span>Both Resumes Available</span>
                </div>
              </div>
            </div>

            <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-purple-400 font-semibold group-hover:translate-x-0.5 transition-transform">
              <span>Explore Complete Suite</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

        </div>

        {/* Footer Note */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-[11px] font-mono text-slate-500 border-t border-white/5">
          <span>You can switch tracks at any time via the top navbar</span>
          <button
            onClick={onClose}
            className="text-cyan-400 hover:text-cyan-300 underline font-semibold"
          >
            Skip to full site overview &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};
