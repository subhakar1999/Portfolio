import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Terminal, 
  Cpu, 
  Layers, 
  Lock, 
  GitBranch, 
  Activity,
  AlertTriangle
} from 'lucide-react';
import { sound } from '../utils/audio';

interface PipelineStage {
  id: string;
  name: string;
  tool: string;
  duration: number; // ms
  successLog: string[];
  failureLog?: string[];
}

const STAGES: PipelineStage[] = [
  {
    id: 'checkout',
    name: 'Source & SCM Checkout',
    tool: 'Azure Repos / Git',
    duration: 800,
    successLog: [
      '[INFO] Initializing git repository checkout...',
      '[INFO] Branch: refs/heads/main | Commit: sha-e4a89f2',
      '[SUCCESS] Repository checked out successfully (0.42s)'
    ]
  },
  {
    id: 'sast',
    name: 'Shift-Left SAST & SCA',
    tool: 'Snyk & Checkmarx',
    duration: 1200,
    successLog: [
      '[SCAN] Running Snyk dependency SCA analyzer...',
      '[SCAN] Analyzing 148 NuGet and npm dependencies...',
      '[SCAN] Checkmarx static code analysis scanning .NET & Python sources...',
      '[PASS] 0 Critical CVEs | 0 High CVEs detected.',
      '[SUCCESS] Shift-left SAST gate passed with Grade A+'
    ],
    failureLog: [
      '[SCAN] Snyk detected Critical CVE-2026-3819 in dependency tree!',
      '[ALERT] CVSS 9.8 Remote Code Execution risk identified.',
      '[BLOCKED] Quality Gate enforced: Pipeline terminated to protect staging.'
    ]
  },
  {
    id: 'secrets',
    name: 'Secrets & Key Scanning',
    tool: 'GitGuardian & Azure Key Vault',
    duration: 900,
    successLog: [
      '[SCAN] Scanning diffs for hardcoded API keys, JWTs, and passwords...',
      '[INFO] Verifying secret injection via Azure Key Vault CSI driver...',
      '[SUCCESS] Zero credentials exposed in plaintext. Secrets gate CLEAN.'
    ]
  },
  {
    id: 'container',
    name: 'Container Hardening',
    tool: 'Docker & Trivy Scanner',
    duration: 1100,
    successLog: [
      '[DOCKER] Building minimal hardened alpine-based container image...',
      '[TRIVY] Scanning container filesystem and OS layers...',
      '[PASS] Base image verified. Container signed and pushed to Quay registry.'
    ]
  },
  {
    id: 'iac',
    name: 'Policy-as-Code & IaC',
    tool: 'Terraform & Azure Policy',
    duration: 1000,
    successLog: [
      '[IAC] terraform init & terraform validate running...',
      '[POLICY] Evaluating Azure Policy compliance rules...',
      '[PASS] VNet peering, private endpoints, and NSG rules conform to baseline.'
    ]
  },
  {
    id: 'gitops',
    name: 'GitOps Deployment',
    tool: 'Argo CD & Azure AKS',
    duration: 1000,
    successLog: [
      '[ARGOCD] Syncing application manifest to target AKS cluster...',
      '[K8S] Rolling update: 3/3 pods healthy across availability zones.',
      '[SUCCESS] Zero-downtime release completed successfully.'
    ]
  }
];

export const PipelineSimulator: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(-1);
  const [failedStageIdx, setFailedStageIdx] = useState<number>(-1);
  const [simulateFailure, setSimulateFailure] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([
    'Pipeline Simulator ready. Click "Execute Live Pipeline" to start DevSecOps gating.'
  ]);

  const runPipeline = (forceFailure: boolean = false) => {
    sound.click();
    setIsRunning(true);
    setCurrentStageIdx(0);
    setFailedStageIdx(-1);
    setSimulateFailure(forceFailure);
    setLogs([
      `[INIT] Starting Enterprise DevSecOps CI/CD Pipeline #${Math.floor(1000 + Math.random() * 9000)}...`,
      `[MODE] ${forceFailure ? 'SIMULATING THREAT / VULNERABILITY DETECTION' : 'RUNNING CLEAN ZERO-TRUST BUILD'}`
    ]);
  };

  useEffect(() => {
    if (!isRunning || currentStageIdx < 0) return;

    if (currentStageIdx >= STAGES.length) {
      setIsRunning(false);
      sound.success();
      setLogs((prev) => [
        ...prev,
        '==================================================',
        '🚀 [DEPLOYED] All 6 DevSecOps Gates Passed! Application Live on AKS.'
      ]);
      return;
    }

    const stage = STAGES[currentStageIdx];

    // Check if we should fail at SAST stage
    if (simulateFailure && stage.id === 'sast') {
      const timer = setTimeout(() => {
        sound.alert();
        setFailedStageIdx(currentStageIdx);
        setIsRunning(false);
        if (stage.failureLog) {
          setLogs((prev) => [...prev, ...stage.failureLog!]);
        }
      }, stage.duration);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      sound.terminalKey();
      setLogs((prev) => [...prev, ...stage.successLog]);
      setCurrentStageIdx((prev) => prev + 1);
    }, stage.duration);

    return () => clearTimeout(timer);
  }, [isRunning, currentStageIdx, simulateFailure]);

  const resetPipeline = () => {
    sound.click();
    setIsRunning(false);
    setCurrentStageIdx(-1);
    setFailedStageIdx(-1);
    setLogs(['Pipeline reset. Ready for next DevSecOps execution.']);
  };

  return (
    <section id="pipeline" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
          <Activity className="w-3.5 h-3.5" />
          <span>INTERACTIVE DEVSECOPS SIMULATOR</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Shift-Left CI/CD Pipeline Simulator
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Experience real-world automated security quality gates in action. Watch how Snyk, SonarQube, Trivy, and Argo CD enforce zero-trust security before reaching production.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Interactive Stages Flow */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-dark-900/90 border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-xl space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                Security Gates Flow (6 Steps)
              </span>
              <div className="flex items-center space-x-2">
                <button
                  disabled={isRunning}
                  onClick={() => runPipeline(false)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-dark-950 font-bold text-xs font-mono transition-all shadow-md shadow-emerald-500/20"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run Clean</span>
                </button>

                <button
                  disabled={isRunning}
                  onClick={() => runPipeline(true)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 disabled:opacity-50 text-xs font-mono transition-all"
                  title="Simulate Vulnerability Detection"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Test Threat Gate</span>
                </button>

                <button
                  onClick={resetPipeline}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  title="Reset Simulator"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Stages Stack */}
            <div className="space-y-2.5">
              {STAGES.map((stage, idx) => {
                const isPassed = currentStageIdx > idx && failedStageIdx === -1;
                const isCurrent = currentStageIdx === idx && isRunning;
                const isFailed = failedStageIdx === idx;

                return (
                  <div
                    key={stage.id}
                    className={`p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                      isFailed
                        ? 'bg-red-950/30 border-red-500/50 shadow-lg shadow-red-500/10'
                        : isPassed
                        ? 'bg-emerald-950/20 border-emerald-500/40'
                        : isCurrent
                        ? 'bg-cyan-950/30 border-cyan-400 shadow-lg shadow-cyan-500/20 animate-pulse'
                        : 'bg-dark-950/50 border-white/5 opacity-70'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold bg-dark-900 border border-white/10">
                        {isPassed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : isFailed ? (
                          <XCircle className="w-4 h-4 text-red-400" />
                        ) : isCurrent ? (
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                        ) : (
                          <span className="text-slate-500">{idx + 1}</span>
                        )}
                      </div>

                      <div>
                        <div className="text-sm font-semibold text-white flex items-center space-x-2">
                          <span>{stage.name}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                            {stage.tool}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs font-mono">
                      {isPassed && <span className="text-emerald-400 font-bold">PASSED</span>}
                      {isFailed && <span className="text-red-400 font-bold">BLOCKED (CVE)</span>}
                      {isCurrent && <span className="text-cyan-300 font-bold">SCANNING...</span>}
                      {!isPassed && !isFailed && !isCurrent && <span className="text-slate-600">WAITING</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Live Telemetry Terminal Output */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-dark-950 border border-cyan-500/30 rounded-2xl p-5 shadow-2xl backdrop-blur-xl h-[480px] flex flex-col justify-between font-mono">
            {/* Terminal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
              <div className="flex items-center space-x-2 text-slate-400">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-200 font-semibold">devsecops-pipeline.log</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
              </div>
            </div>

            {/* Scrollable Logs Output */}
            <div className="flex-1 overflow-y-auto py-3 space-y-1.5 text-xs text-slate-300 select-text font-mono">
              {logs.map((log, i) => {
                const isErr = log.includes('[BLOCKED]') || log.includes('[ALERT]') || log.includes('Critical CVE');
                const isSuccess = log.includes('[SUCCESS]') || log.includes('[PASS]') || log.includes('[DEPLOYED]');
                const isHeader = log.includes('===');
                return (
                  <div
                    key={i}
                    className={`leading-relaxed ${
                      isErr
                        ? 'text-red-400 font-semibold bg-red-950/30 p-1 rounded'
                        : isSuccess
                        ? 'text-emerald-300 font-semibold'
                        : isHeader
                        ? 'text-cyan-400 font-bold'
                        : 'text-slate-400'
                    }`}
                  >
                    {log}
                  </div>
                );
              })}
              {isRunning && (
                <div className="flex items-center space-x-2 text-cyan-400 text-xs animate-pulse">
                  <span>Executing gate tests</span>
                  <span className="inline-block animate-bounce">...</span>
                </div>
              )}
            </div>

            {/* Terminal Footer Status */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center space-x-1">
                <Lock className="w-3 h-3 text-cyan-400" />
                <span>Zero-Trust Gate Engine</span>
              </span>
              <span className="text-cyan-400 font-semibold">
                {currentStageIdx >= STAGES.length ? '100% COMPLETE' : isRunning ? 'PIPELINE ACTIVE' : 'STANDBY'}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

