import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Cpu, 
  Bot, 
  Zap, 
  CheckCircle2, 
  Radio, 
  AlertOctagon, 
  Terminal, 
  Server, 
  Lock,
  ArrowRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { sound } from '../utils/audio';

interface ThreatScenario {
  id: string;
  name: string;
  severity: 'Critical' | 'High' | 'Medium';
  source: string;
  description: string;
  kqlQuery: string;
  aiTriageSummary: string;
  remediationAction: string;
  targetAsset: string;
}

const SCENARIOS: ThreatScenario[] = [
  {
    id: 's3-blob-public',
    name: 'Unauthorized Public Blob Exposure & IAM Escalation',
    severity: 'Critical',
    source: 'Microsoft Defender for Cloud',
    description: 'Storage account container "prod-db-backups" detected with public anonymous read access enabled and abnormal role assignment change.',
    kqlQuery: `AzureDiagnostics\n| where Category == "StorageRead" and AuthenticationType == "Anonymous"\n| summarize RequestCount = count() by CallerIPAddress, bin(TimeGenerated, 5m)\n| order by RequestCount desc`,
    aiTriageSummary: 'AI Agent analysis: Confirmed anomalous unauthenticated egress from IP 198.51.100.42. Matched MITRE ATT&CK T1530 (Data from Cloud Storage). Severity elevated to Critical.',
    remediationAction: 'Azure Logic App triggered: Enforced Azure Policy "Deny Public Access", revoked SAS token, and alerted SecOps on Microsoft Teams.',
    targetAsset: 'sa-prod-backup-eastus-01'
  },
  {
    id: 'k8s-pod-escape',
    name: 'AKS Privileged Container Drift Detected',
    severity: 'High',
    source: 'Microsoft Sentinel SIEM',
    description: 'Pod in namespace "payment-gateway" spawned with root privileges and hostPID enabled, violating cluster baseline security policy.',
    kqlQuery: `KubeEvents\n| where ObjectKind == "Pod" and Message contains "Privileged container launched"\n| project TimeGenerated, ClusterName, Namespace = ObjectNamespace, Pod = ObjectName`,
    aiTriageSummary: 'AI Agent analysis: Container configuration drifted from GitOps manifest in ArgoCD. Probable supply-chain tamper or manual kubectl exec.',
    remediationAction: 'Azure Logic App automated SOAR: Pod immediately isolated via Calico NetworkPolicy deny-all, node cordoned for forensic memory dump.',
    targetAsset: 'aks-prod-weu-node-04'
  },
  {
    id: 'anomalous-login',
    name: 'Impossible Travel & Entra ID Credential Compromise',
    severity: 'High',
    source: 'Microsoft Entra ID Protection',
    description: 'User account logged in from Frankfurt and Tokyo within a 12-minute interval without registered corporate VPN certificate.',
    kqlQuery: `SigninLogs\n| where RiskLevelDuringSignIn in ("high", "medium")\n| summarize Count = count() by UserPrincipalName, Location, IPAddress`,
    aiTriageSummary: 'AI Agent analysis: Geolocation delta impossible via commercial flight. Active session tokens risk hijacked session cookie.',
    remediationAction: 'Azure Logic App SOAR: Revoked all active OAuth refresh tokens, triggered MFA re-challenge, and forced password reset policy.',
    targetAsset: 'bharath.sec@enterprise.corp'
  }
];

export const ThreatDefensePlaybook: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<ThreatScenario>(SCENARIOS[0]);
  const [playbookStep, setPlaybookStep] = useState<number>(3); // 0: detect, 1: sentinel, 2: ai triage, 3: remediated
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const triggerSimulation = (scenario: ThreatScenario) => {
    sound.alert();
    setActiveScenario(scenario);
    setIsSimulating(true);
    setPlaybookStep(0);

    const step1 = setTimeout(() => {
      sound.terminalKey();
      setPlaybookStep(1);
    }, 1200);

    const step2 = setTimeout(() => {
      sound.terminalKey();
      setPlaybookStep(2);
    }, 2500);

    const step3 = setTimeout(() => {
      sound.success();
      setPlaybookStep(3);
      setIsSimulating(false);
    }, 4000);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
    };
  };

  return (
    <section id="threat-soar" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium">
          <Bot className="w-3.5 h-3.5" />
          <span>AUTONOMOUS THREAT TRIAGE & SOAR</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          AI Cloud Security Operations Playground
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Interactive simulation of the Autonomous LLM Security Agent & Microsoft Sentinel SOAR architecture engineered at Volkswagen Group Digital Solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Threat Scenario Picker */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider px-1">
            Select Cloud Threat Scenario:
          </div>
          {SCENARIOS.map((sc) => {
            const isSelected = activeScenario.id === sc.id;
            return (
              <div
                key={sc.id}
                onClick={() => {
                  if (!isSimulating) triggerSimulation(sc);
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'bg-dark-900 border-cyan-400 shadow-xl shadow-cyan-500/10'
                    : 'bg-dark-950/60 border-white/10 hover:border-cyan-500/40 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-red-500/20 text-red-400 border border-red-500/30">
                    {sc.severity}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{sc.source}</span>
                </div>
                <h4 className="text-sm font-bold text-white mt-2 group-hover:text-cyan-300">
                  {sc.name}
                </h4>
                <div className="flex items-center justify-between mt-3 text-xs font-mono">
                  <span className="text-slate-400 truncate max-w-[180px]">{sc.targetAsset}</span>
                  <span className="text-cyan-400 font-semibold flex items-center space-x-1">
                    <span>Simulate</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Interactive 4-Stage SOAR Visualizer */}
        <div className="lg:col-span-8 bg-dark-900/90 border border-cyan-500/30 rounded-2xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl space-y-6">
          
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                Active Threat Case Study
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">{activeScenario.name}</h3>
            </div>

            <button
              disabled={isSimulating}
              onClick={() => triggerSimulation(activeScenario)}
              className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-dark-950 font-bold text-xs font-mono shadow-md shadow-cyan-500/20 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
              <span>{isSimulating ? 'Triage in Progress...' : 'Re-Run Simulation'}</span>
            </button>
          </div>

          {/* 4 Interactive Orchestration Nodes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-center">
            
            {/* Step 0: Defender Signal */}
            <div className={`p-3 rounded-xl border transition-all duration-300 ${
              playbookStep >= 0 ? 'bg-red-950/30 border-red-500/50' : 'bg-dark-950 border-white/5 opacity-40'
            }`}>
              <div className="w-8 h-8 mx-auto rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center mb-1.5">
                <AlertOctagon className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-white">1. Cloud Alert</div>
              <div className="text-[10px] font-mono text-slate-400 mt-0.5">Defender Signal</div>
            </div>

            {/* Step 1: Sentinel SIEM */}
            <div className={`p-3 rounded-xl border transition-all duration-300 ${
              playbookStep >= 1 ? 'bg-blue-950/30 border-blue-500/50' : 'bg-dark-950 border-white/5 opacity-40'
            }`}>
              <div className="w-8 h-8 mx-auto rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-1.5">
                <Radio className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-white">2. SIEM Ingest</div>
              <div className="text-[10px] font-mono text-slate-400 mt-0.5">Microsoft Sentinel</div>
            </div>

            {/* Step 2: AI Security Agent */}
            <div className={`p-3 rounded-xl border transition-all duration-300 ${
              playbookStep >= 2 ? 'bg-purple-950/30 border-purple-500/50' : 'bg-dark-950 border-white/5 opacity-40'
            }`}>
              <div className="w-8 h-8 mx-auto rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-1.5">
                <Bot className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-white">3. LLM Triage</div>
              <div className="text-[10px] font-mono text-slate-400 mt-0.5">Azure AI Agent</div>
            </div>

            {/* Step 3: Logic Apps SOAR */}
            <div className={`p-3 rounded-xl border transition-all duration-300 ${
              playbookStep >= 3 ? 'bg-emerald-950/30 border-emerald-500/50' : 'bg-dark-950 border-white/5 opacity-40'
            }`}>
              <div className="w-8 h-8 mx-auto rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-1.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-white">4. SOAR Fix</div>
              <div className="text-[10px] font-mono text-slate-400 mt-0.5">Logic Apps Action</div>
            </div>
          </div>

          {/* Real-time Dynamic Code & AI Analysis Terminal */}
          <div className="space-y-3 font-mono text-xs">
            
            {/* KQL Query Box */}
            <div className="p-3.5 rounded-xl bg-dark-950 border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-cyan-400">
                <span className="flex items-center space-x-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Automated KQL Hunting Query (Microsoft Sentinel)</span>
                </span>
                <span className="text-slate-500 text-[10px]">Log Analytics Workspace</span>
              </div>
              <pre className="text-slate-300 text-[11px] overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {activeScenario.kqlQuery}
              </pre>
            </div>

            {/* AI Agent Triage Output */}
            {playbookStep >= 2 && (
              <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-1 animate-in fade-in duration-300">
                <div className="text-purple-300 font-bold text-[11px] flex items-center space-x-1.5">
                  <Bot className="w-3.5 h-3.5" />
                  <span>Custom Azure AI Security Analyst Agent Summary</span>
                </div>
                <p className="text-slate-200 text-xs font-sans leading-relaxed">
                  {activeScenario.aiTriageSummary}
                </p>
              </div>
            )}

            {/* Automated Remediation Output */}
            {playbookStep >= 3 && (
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/40 space-y-1 animate-in fade-in duration-300">
                <div className="text-emerald-300 font-bold text-[11px] flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Azure Logic App SOAR Execution Confirmed</span>
                </div>
                <p className="text-slate-200 text-xs font-sans leading-relaxed">
                  {activeScenario.remediationAction}
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

