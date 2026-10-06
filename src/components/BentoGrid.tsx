import React, { useState } from 'react';
import { 
  Bot, 
  ShieldCheck, 
  GitPullRequest, 
  Boxes, 
  Server, 
  Trophy, 
  ArrowUpRight, 
  Terminal, 
  CheckCircle, 
  Lock, 
  Flame, 
  Layers,
  Cpu,
  Sparkles
} from 'lucide-react';
import { BENTO_PROJECTS, AWARDS } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const BentoGrid: React.FC = () => {
  const [activeProjectModal, setActiveProjectModal] = useState<string | null>(null);

  const selectedProject = BENTO_PROJECTS.find((p) => p.id === activeProjectModal);

  return (
    <section id="bento" className="py-20 px-4 sm:px-6 lg:px-8 relative max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ENGINEERING ARCHITECTURES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Interactive Architecture Bento
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Production-grade systems engineered across Azure Cloud Security, DevSecOps shift-left automation, and autonomous AI agents.
        </p>
      </div>

      {/* Bento 3D Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Large Featured AI Security Operations Agent */}
        <div
          onClick={() => {
            sound.click();
            setActiveProjectModal('ai-sec-ops');
          }}
          onMouseEnter={() => sound.hover()}
          className="lg:col-span-2 group relative rounded-2xl bg-gradient-to-b from-dark-900/90 to-dark-950/90 p-7 border border-cyan-500/20 hover:border-cyan-400/50 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:shadow-cyan-500/10 cursor-pointer overflow-hidden flex flex-col justify-between"
        >
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-500" />
          
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                    Volkswagen Group Digital Solutions
                  </span>
                  <span className="text-xs text-slate-400 font-mono">2024 – Present</span>
                </div>
              </div>

              <div className="flex items-center space-x-1 text-slate-400 group-hover:text-cyan-300 text-xs font-mono transition-colors">
                <span>View Specs</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                Autonomous AI Security Operations & Triage Agent
              </h3>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                Engineered custom LLM-powered security analyst agents leveraging Azure AI endpoints and Python. Autonomously analyzes posture misconfigurations, automates KQL query authoring, and executes automated SOAR remediation playbooks.
              </p>
            </div>

            {/* Architecture Pipeline Mini-Diagram */}
            <div className="p-3.5 rounded-xl bg-dark-950/80 border border-white/10 font-mono text-xs text-slate-300 space-y-2">
              <div className="text-[11px] text-slate-400 flex items-center justify-between">
                <span>SEC-OPS FLOW</span>
                <span className="text-emerald-400 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>AUTONOMOUS ACTIVE</span>
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                <div className="p-2 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                  Defender Alert
                </div>
                <div className="p-2 rounded bg-blue-500/10 border border-blue-500/30 text-blue-300">
                  Sentinel SIEM
                </div>
                <div className="p-2 rounded bg-purple-500/10 border border-purple-500/30 text-purple-300">
                  Azure AI Agent
                </div>
                <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  Logic Apps SOAR
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 mt-6">
            <div className="flex flex-wrap gap-1.5">
              {['Azure AI', 'Security Copilot', 'Microsoft Sentinel', 'Logic Apps', 'KQL', 'Python'].map((tech) => (
                <span key={tech} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-3 text-xs font-mono">
              <span className="text-cyan-400 font-bold">65% Triage Faster</span>
              <span className="text-slate-600">|</span>
              <span className="text-emerald-400 font-bold">80% Noise Cut</span>
            </div>
          </div>
        </div>

        {/* Card 2: Shift-Left DevSecOps Pipeline */}
        <div
          onClick={() => {
            sound.click();
            setActiveProjectModal('shift-left-pipeline');
          }}
          onMouseEnter={() => sound.hover()}
          className="group relative rounded-2xl bg-gradient-to-b from-dark-900/90 to-dark-950/90 p-7 border border-white/10 hover:border-blue-400/50 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:shadow-blue-500/10 cursor-pointer overflow-hidden flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-300 transition-colors" />
            </div>

            <div>
              <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block">
                Carelon Global Solutions
              </span>
              <h3 className="text-xl font-bold text-white mt-1 group-hover:text-blue-200 transition-colors">
                Shift-Left DevSecOps CI/CD
              </h3>
              <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                Automated SAST, SCA, and secrets scanning embedded with strict build-breaking quality gates across 70+ applications using Snyk, Checkmarx, and SonarQube.
              </p>
            </div>

            {/* Quality Gates Badge Row */}
            <div className="space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between items-center p-2 rounded-lg bg-dark-950/60 border border-white/5">
                <span className="text-slate-300">Snyk & Checkmarx SAST</span>
                <span className="text-emerald-400 font-bold">PASS (0 CVEs)</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-dark-950/60 border border-white/5">
                <span className="text-slate-300">GitGuardian Secrets Scan</span>
                <span className="text-emerald-400 font-bold">CLEAN</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 mt-4 flex justify-between items-center text-xs font-mono">
            <span className="text-slate-400">70+ Workloads</span>
            <span className="text-blue-400 font-bold">&lt; 3m Scan Gate</span>
          </div>
        </div>

        {/* Card 3: Multi-Account Landing Zone & Terraform */}
        <div
          onClick={() => {
            sound.click();
            setActiveProjectModal('landing-zone-iac');
          }}
          onMouseEnter={() => sound.hover()}
          className="group relative rounded-2xl bg-gradient-to-b from-dark-900/90 to-dark-950/90 p-7 border border-white/10 hover:border-purple-400/50 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:shadow-purple-500/10 cursor-pointer overflow-hidden flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <Boxes className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-purple-300 transition-colors" />
            </div>

            <div>
              <span className="text-xs font-mono text-purple-400 uppercase tracking-wider block">
                Infrastructure as Code
              </span>
              <h3 className="text-xl font-bold text-white mt-1 group-hover:text-purple-200 transition-colors">
                Landing Zone Vending & IaC
              </h3>
              <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                Standardized multi-tier cloud landing zones using Terraform Cloud, AWS SCPs, and Azure Policy-as-Code modules with zero-trust permissions.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-dark-950/60 border border-white/5 font-mono text-[11px] text-slate-300 space-y-1">
              <div className="text-purple-400 font-semibold">$ terraform apply -auto-approve</div>
              <div className="text-slate-400">Plan: 120+ Subscriptions Vended</div>
              <div className="text-emerald-400">Apply complete! Resources: 100% Compliant</div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 mt-4 flex justify-between items-center text-xs font-mono">
            <span className="text-slate-400">120+ Accounts</span>
            <span className="text-purple-400 font-bold">15m Vending Time</span>
          </div>
        </div>

        {/* Card 4: .NET & IIS Server Automation */}
        <div
          onClick={() => {
            sound.click();
            setActiveProjectModal('dotnet-iis-automation');
          }}
          onMouseEnter={() => sound.hover()}
          className="group relative rounded-2xl bg-gradient-to-b from-dark-900/90 to-dark-950/90 p-7 border border-white/10 hover:border-emerald-400/50 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:shadow-emerald-500/10 cursor-pointer overflow-hidden flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Server className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-300 transition-colors" />
            </div>

            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block">
                SYSBIG (Dick's Sporting Goods)
              </span>
              <h3 className="text-xl font-bold text-white mt-1 group-hover:text-emerald-200 transition-colors">
                .NET CI/CD & IIS Automation
              </h3>
              <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                Multi-stage Azure Pipelines for .NET Core and ASP.NET apps with automated IIS website management, config transforms, and Key Vault tokenization.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {['.NET Core', 'MSBuild', 'IIS 10', 'PowerShell', 'Key Vault'].map((t) => (
                <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 mt-4 flex justify-between items-center text-xs font-mono">
            <span className="text-slate-400">80% Manual Effort Cut</span>
            <span className="text-emerald-400 font-bold">99.9% Reliability</span>
          </div>
        </div>

        {/* Card 5: Awards & Honors Showcase */}
        <div
          onMouseEnter={() => sound.hover()}
          className="group relative rounded-2xl bg-gradient-to-b from-dark-900/90 to-dark-950/90 p-7 border border-amber-500/20 hover:border-amber-400/50 shadow-2xl backdrop-blur-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Trophy className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">5x Honors</span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-amber-200 transition-colors">
                Honors & Industry Awards
              </h3>
              <p className="text-slate-300 text-xs mt-1">
                Recognized repeatedly for zero-defect quality releases and peer collaboration.
              </p>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {AWARDS.map((award) => (
                <div key={award.title} className="p-2.5 rounded-xl bg-dark-950/70 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-amber-300 font-semibold text-[11px]">
                    <span>{award.title}</span>
                    <span className="text-[10px] text-slate-400">{award.issuer}</span>
                  </div>
                  <div className="text-[10px] text-slate-400">{award.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 mt-4 text-center text-xs font-mono text-amber-400/90">
            ★ Best Performer & 3x Impact Recipient
          </div>
        </div>

      </div>

      {/* Interactive Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setActiveProjectModal(null)}
        >
          <div 
            className="max-w-2xl w-full bg-dark-900 border border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  {selectedProject.company} • {selectedProject.period}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">{selectedProject.title}</h3>
              </div>
              <button
                onClick={() => setActiveProjectModal(null)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              {selectedProject.description}
            </p>

            <div className="space-y-3">
              <h4 className="text-xs font-mono text-cyan-300 uppercase tracking-wider">
                Technical Highlights & Architectural Decisions:
              </h4>
              <ul className="space-y-2 text-xs text-slate-300 font-sans">
                {selectedProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start space-x-2.5">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {selectedProject.metrics.map((m) => (
                <div key={m.label} className="p-3 rounded-xl bg-dark-950/80 border border-white/10 text-center">
                  <div className="text-lg font-bold font-mono text-cyan-400">{m.value}</div>
                  <div className="text-[10px] text-slate-400">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
              {selectedProject.techStack.map((tech) => (
                <span key={tech} className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

