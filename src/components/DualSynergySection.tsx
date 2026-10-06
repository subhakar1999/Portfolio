import React, { useState } from 'react';
import { 
  ShieldCheck, 
  GitBranch, 
  Boxes, 
  Lock, 
  Cpu, 
  Zap, 
  Server, 
  CheckCircle2, 
  ArrowRight, 
  Terminal, 
  Sparkles,
  Bot,
  Layers,
  Activity
} from 'lucide-react';
import { sound } from '../utils/audio';

export type PersonaMode = 'unified' | 'devops' | 'security';

interface Props {
  personaMode: PersonaMode;
  onSelectPersona: (mode: PersonaMode) => void;
}

interface SynergyDomain {
  id: string;
  title: string;
  devopsFocus: {
    title: string;
    metrics: string;
    points: string[];
    tech: string[];
  };
  securityFocus: {
    title: string;
    metrics: string;
    points: string[];
    tech: string[];
  };
  synergyResult: string;
}

const SYNERGY_DOMAINS: SynergyDomain[] = [
  {
    id: 'cicd',
    title: 'CI/CD & Release Automation',
    devopsFocus: {
      title: 'Automated Build & Deployment Velocity',
      metrics: 'Zero-Downtime Releases',
      points: [
        'Multi-stage Azure Pipelines (YAML & Classic) across Dev, QA, Staging & Prod',
        'Automated .NET Core compilation, MSBuild, and private NuGet feeds',
        'GitOps continuous delivery with Argo CD & OpenShift (OCP) Pipelines'
      ],
      tech: ['Azure DevOps', 'Argo CD', 'GitHub Actions', 'Bamboo', 'MSBuild']
    },
    securityFocus: {
      title: 'Shift-Left Security & Vulnerability Gating',
      metrics: '95% CVEs Blocked Pre-Prod',
      points: [
        'Automated SAST, SCA & secrets scanning embedded at PR & commit time',
        'Strict build-breaking quality gates preventing critical CVE deployments',
        'Quay container image vulnerability scans & cryptographic signing'
      ],
      tech: ['Snyk', 'Checkmarx', 'SonarQube', 'GitGuardian', 'Trivy']
    },
    synergyResult: 'Builds deploy rapidly without skipping stringent zero-trust security checks.'
  },
  {
    id: 'iac',
    title: 'Infrastructure as Code & Landing Zones',
    devopsFocus: {
      title: 'Automated Multi-Cloud Provisioning',
      metrics: '120+ Subscriptions Vended',
      points: [
        'Modular Terraform & Terraform Cloud architecture for repeatable environments',
        'AWS Landing Zone account vending & ARM template modules',
        'Automated cloud provisioning via Python (Boto3) scripts'
      ],
      tech: ['Terraform Cloud', 'ARM / Bicep', 'AWS CloudFormation', 'Python Boto3']
    },
    securityFocus: {
      title: 'Policy-as-Code & Identity Governance',
      metrics: '100% Policy Compliance',
      points: [
        'Azure Policy-as-Code rules enforcing encryption and private endpoints',
        'AWS Service Control Policies (SCPs) and IAM least-privilege boundaries',
        'Azure Key Vault secrets injection and RBAC access governance'
      ],
      tech: ['Azure Policy', 'AWS SCPs', 'Entra ID (Azure AD)', 'Azure Key Vault']
    },
    synergyResult: 'Infrastructure deploys in minutes while strictly conforming to enterprise security standards.'
  },
  {
    id: 'k8s',
    title: 'Containers & Orchestration',
    devopsFocus: {
      title: 'High-Availability Cluster Management',
      metrics: '99.9% Uptime',
      points: [
        'Production Azure Kubernetes Service (AKS) cluster architecture',
        'Managed cluster lifecycle, multi-zone availability, and autoscaling',
        'Containerized microservices deployments with zero-downtime rolling updates'
      ],
      tech: ['Azure AKS', 'Docker', 'Kubernetes Helm', 'Red Hat OpenShift']
    },
    securityFocus: {
      title: 'Container Hardening & Runtime Defense',
      metrics: 'Hardened Baseline',
      points: [
        'Calico NetworkPolicies enforcing strict pod-to-pod isolation',
        'Rootless container configurations and minimal Alpine/distroless images',
        'Defender for DevOps and Trivy image scanning before cluster admission'
      ],
      tech: ['Defender for Containers', 'Calico CNI', 'Trivy', 'Azure Defender']
    },
    synergyResult: 'Kubernetes workloads deliver maximum elasticity with full isolation against lateral attacks.'
  },
  {
    id: 'ops-ai',
    title: 'Cloud Operations & AI Automation',
    devopsFocus: {
      title: 'Environment & Web Server Administration',
      metrics: '80% Manual Effort Cut',
      points: [
        'IIS 8.5/10 server hardening, application pool recycling, and SSL bindings',
        'Automated web.config and appsettings.json transformations across stages',
        'PowerShell automation for log archival and release sanity checks'
      ],
      tech: ['IIS 8.5/10', 'PowerShell', 'Log Analytics', 'Azure Monitor']
    },
    securityFocus: {
      title: 'SIEM/SOAR & Autonomous AI Triage',
      metrics: '65% Faster Triage',
      points: [
        'Microsoft Sentinel SIEM incident monitoring and custom KQL hunting rules',
        'Autonomous LLM security analyst agents utilizing Azure AI endpoints & Python',
        'Azure Logic Apps SOAR playbooks auto-remediating cloud drifts in real time'
      ],
      tech: ['Microsoft Sentinel', 'Defender for Cloud', 'Azure AI Agents', 'Logic Apps']
    },
    synergyResult: 'Proactive incident detection and autonomous remediation eliminate operational downtime.'
  }
];

export const DualSynergySection: React.FC<Props> = ({ personaMode, onSelectPersona }) => {
  const [activeTab, setActiveTab] = useState<string>('cicd');

  const activeDomain = SYNERGY_DOMAINS.find((d) => d.id === activeTab) || SYNERGY_DOMAINS[0];

  return (
    <section id="synergy" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      
      {/* Background ambient split */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>DUAL SPECIALIZATION MATRIX</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          DevOps Velocity <span className="text-cyan-400">×</span> Cloud Security Defense
        </h2>
        
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Why choose between speed and security when you can engineer both? Explore how 6+ years of DevOps engineering and Azure Cloud Security converge into unified, enterprise-grade cloud systems.
        </p>

        {/* Persona Mode Switcher Pills */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
          <button
            onClick={() => {
              sound.click();
              onSelectPersona('unified');
            }}
            className={`px-4 py-2 rounded-xl transition-all duration-200 flex items-center space-x-2 ${
              personaMode === 'unified'
                ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold shadow-lg shadow-cyan-500/20 border border-white/20'
                : 'bg-dark-900/80 text-slate-300 border border-white/10 hover:border-white/30'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Unified Dual Mastery</span>
          </button>

          <button
            onClick={() => {
              sound.click();
              onSelectPersona('devops');
            }}
            className={`px-4 py-2 rounded-xl transition-all duration-200 flex items-center space-x-2 ${
              personaMode === 'devops'
                ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/30 border border-blue-400'
                : 'bg-dark-900/80 text-slate-300 border border-white/10 hover:border-blue-500/40 hover:text-blue-300'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span>DevOps & CI/CD Focus</span>
          </button>

          <button
            onClick={() => {
              sound.click();
              onSelectPersona('security');
            }}
            className={`px-4 py-2 rounded-xl transition-all duration-200 flex items-center space-x-2 ${
              personaMode === 'security'
                ? 'bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-500/30 border border-emerald-400'
                : 'bg-dark-900/80 text-slate-300 border border-white/10 hover:border-emerald-500/40 hover:text-emerald-300'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cloud Security & DevSecOps Focus</span>
          </button>
        </div>
      </div>

      {/* Domain Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 font-mono text-xs">
        {SYNERGY_DOMAINS.map((domain) => {
          const isSelected = activeTab === domain.id;
          return (
            <button
              key={domain.id}
              onClick={() => {
                sound.click();
                setActiveTab(domain.id);
              }}
              className={`px-4 py-2 rounded-xl transition-all duration-200 border ${
                isSelected
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 font-bold shadow-md shadow-cyan-500/10'
                  : 'bg-dark-900/70 text-slate-400 border-white/10 hover:border-white/20 hover:text-slate-200'
              }`}
            >
              {domain.title}
            </button>
          );
        })}
      </div>

      {/* Side-by-Side Dual Comparison Card */}
      <div className="bg-dark-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6">
        
        {/* Domain Title */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
              Architectural Domain
            </span>
            <h3 className="text-2xl font-bold text-white mt-0.5">{activeDomain.title}</h3>
          </div>

          <div className="p-2.5 rounded-xl bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-emerald-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            {activeDomain.synergyResult}
          </div>
        </div>

        {/* The Two Pillars Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Pillar 1: DevOps & Automation */}
          <div className={`p-6 rounded-2xl border transition-all duration-300 space-y-4 ${
            personaMode === 'devops'
              ? 'bg-blue-950/40 border-blue-400 shadow-xl shadow-blue-500/10 ring-1 ring-blue-400'
              : 'bg-dark-950/80 border-blue-500/20'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  <GitBranch className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">DevOps & Cloud Engineering</h4>
                  <span className="text-[11px] font-mono text-blue-400">Velocity • Delivery • Infrastructure</span>
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/30 font-bold">
                {activeDomain.devopsFocus.metrics}
              </span>
            </div>

            <div className="text-sm font-semibold text-slate-200">
              {activeDomain.devopsFocus.title}
            </div>

            <ul className="space-y-2 text-xs text-slate-300">
              {activeDomain.devopsFocus.points.map((pt, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-blue-400 font-bold mt-0.5">▸</span>
                  <span className="leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
              {activeDomain.devopsFocus.tech.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-300">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Pillar 2: Cloud Security & DevSecOps */}
          <div className={`p-6 rounded-2xl border transition-all duration-300 space-y-4 ${
            personaMode === 'security'
              ? 'bg-emerald-950/40 border-emerald-400 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-400'
              : 'bg-dark-950/80 border-emerald-500/20'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Cloud Security & DevSecOps</h4>
                  <span className="text-[11px] font-mono text-emerald-400">Governance • Defense • AI Triage</span>
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-bold">
                {activeDomain.securityFocus.metrics}
              </span>
            </div>

            <div className="text-sm font-semibold text-slate-200">
              {activeDomain.securityFocus.title}
            </div>

            <ul className="space-y-2 text-xs text-slate-300">
              {activeDomain.securityFocus.points.map((pt, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold mt-0.5">▸</span>
                  <span className="leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
              {activeDomain.securityFocus.tech.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-300">
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Enterprise Value Summary Footer */}
        <div className="p-4 rounded-2xl bg-dark-950 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center space-x-3 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>The Competitive Edge: <strong>Full-Lifecycle DevSecOps Architecture</strong></span>
          </div>

          <a
            href="#contact"
            onClick={() => sound.hover()}
            className="flex items-center space-x-1.5 text-cyan-400 hover:text-cyan-300 font-bold"
          >
            <span>Discuss Role Alignment with Bharath</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

    </section>
  );
};

