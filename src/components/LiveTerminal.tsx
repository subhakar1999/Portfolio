import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TermIcon, X, Maximize2, Minimize2, Sparkles, Copy, Check } from 'lucide-react';
import { PERSONAL_INFO, CERTIFICATIONS, EXPERIENCES, SKILL_CATEGORIES } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandOutput {
  command: string;
  response: React.ReactNode;
  time: string;
}

export const LiveTerminal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isMaximized, setIsMaximized] = useState(false);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [outputs, setOutputs] = useState<CommandOutput[]>([
    {
      command: 'init',
      time: new Date().toLocaleTimeString(),
      response: (
        <div className="space-y-1.5 text-xs text-slate-300">
          <div className="text-cyan-400 font-bold">
            🛡️ BHARATH SAI SUBHAKAR K — CLOUD SECURITY & DEVSECOPS CLI [v2.6.4]
          </div>
          <div className="text-slate-400">
            Type <span className="text-cyan-300 font-bold">help</span> to view available cloud inspection commands.
          </div>
        </div>
      )
    }
  ]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [outputs]);

  if (!isOpen) return null;

  const handleCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    sound.terminalKey();
    const [command, ...args] = raw.toLowerCase().split(' ');
    const time = new Date().toLocaleTimeString();

    setHistory((prev) => [...prev, raw]);
    setHistoryIndex(-1);

    let res: React.ReactNode = null;

    switch (command) {
      case 'help':
        res = (
          <div className="space-y-1 text-xs text-slate-300">
            <div className="text-cyan-400 font-bold">Available Commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 font-mono text-[11px] pt-1">
              <div><span className="text-cyan-300">whoami</span> - Display profile & current role</div>
              <div><span className="text-cyan-300">skills</span> - Dump full tech competency matrix</div>
              <div><span className="text-cyan-300">terraform plan</span> - Simulate landing zone IaC</div>
              <div><span className="text-cyan-300">sentinel scan</span> - Trigger Microsoft Sentinel audit</div>
              <div><span className="text-cyan-300">kubectl get pods</span> - View AKS cluster runtime</div>
              <div><span className="text-cyan-300">certifications</span> - List verified HashiCorp & Azure certs</div>
              <div><span className="text-cyan-300">experience</span> - View 6+ years career history</div>
              <div><span className="text-cyan-300">download</span> - Trigger resume download</div>
              <div><span className="text-cyan-300">contact</span> - Get direct email & phone info</div>
              <div><span className="text-cyan-300">clear</span> - Clear terminal window</div>
              <div><span className="text-cyan-300">exit</span> - Close terminal console</div>
            </div>
          </div>
        );
        break;

      case 'whoami':
        res = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="text-cyan-300 font-bold">{PERSONAL_INFO.name}</div>
            <div className="text-slate-400">{PERSONAL_INFO.title}</div>
            <div className="text-emerald-400 font-semibold">{PERSONAL_INFO.status}</div>
            <div className="text-slate-300 text-[11px] pt-1 leading-relaxed">{PERSONAL_INFO.summary}</div>
          </div>
        );
        break;

      case 'skills':
      case 'cat':
        res = (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-purple-400 font-bold">// Skill Matrix JSON Export</div>
            <pre className="text-slate-300 text-[11px] bg-dark-950 p-2.5 rounded-lg overflow-x-auto border border-white/5">
              {JSON.stringify(
                SKILL_CATEGORIES.map(c => ({
                  category: c.title,
                  skills: c.skills.map(s => `${s.name} (${s.experience})`)
                })),
                null,
                2
              )}
            </pre>
          </div>
        );
        break;

      case 'terraform':
        res = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <div className="text-purple-400 font-bold">$ terraform plan -out=tfplan</div>
            <div className="text-slate-400">Refreshing Terraform state in Terraform Cloud...</div>
            <div className="text-cyan-300">+ azurerm_resource_group.rg_secops</div>
            <div className="text-cyan-300">+ azurerm_sentinel_alert_rule_scheduled.threat_triage</div>
            <div className="text-cyan-300">+ azurerm_kubernetes_cluster.aks_hardened</div>
            <div className="text-emerald-400 font-bold pt-1">
              Plan: 3 to add, 0 to change, 0 to destroy.
            </div>
            <div className="text-slate-400 text-[11px]">Zero-Trust Policy-as-Code checks: 100% PASSED</div>
          </div>
        );
        break;

      case 'sentinel':
        res = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <div className="text-cyan-400 font-bold">[SENTINEL] Ingesting cloud telemetry from 120+ subscriptions...</div>
            <div className="text-slate-300">✓ Defender for Cloud: Active Posture 99.8%</div>
            <div className="text-slate-300">✓ Entra ID Protection: 0 Compromised Identities</div>
            <div className="text-slate-300">✓ AKS NetworkPolicies: Strict Deny-All baseline enforced</div>
            <div className="text-emerald-400 font-bold pt-1">Status: SECURE — No critical anomalies unmitigated.</div>
          </div>
        );
        break;

      case 'kubectl':
        res = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <div className="text-cyan-400 font-bold">$ kubectl get pods -A</div>
            <div className="grid grid-cols-4 gap-2 text-[10px] text-slate-400 border-b border-white/10 pb-1">
              <span>NAMESPACE</span>
              <span>NAME</span>
              <span>READY</span>
              <span>STATUS</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-[10px] text-slate-300">
              <span className="text-cyan-300">secops-ai</span>
              <span>agent-triage-7f98d</span>
              <span className="text-emerald-400">1/1</span>
              <span className="text-emerald-400">Running</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-[10px] text-slate-300">
              <span className="text-cyan-300">gate-system</span>
              <span>snyk-scanner-4a11c</span>
              <span className="text-emerald-400">1/1</span>
              <span className="text-emerald-400">Running</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-[10px] text-slate-300">
              <span className="text-cyan-300">production</span>
              <span>enterprise-api-5b29f</span>
              <span className="text-emerald-400">3/3</span>
              <span className="text-emerald-400">Running</span>
            </div>
          </div>
        );
        break;

      case 'certifications':
      case 'certs':
        res = (
          <div className="space-y-1.5 text-xs text-slate-300 font-mono">
            <div className="text-cyan-400 font-bold">Verified Industry Credentials:</div>
            {CERTIFICATIONS.map(c => (
              <div key={c.name} className="flex justify-between items-center text-xs">
                <span className="text-slate-200">★ {c.issuer} {c.name} ({c.badgeCode})</span>
                <span className="text-emerald-400 font-bold">VERIFIED</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'experience':
      case 'history':
        res = (
          <div className="space-y-2 text-xs text-slate-300 font-mono">
            <div className="text-cyan-400 font-bold">Career Timeline (6+ Years):</div>
            {EXPERIENCES.map(e => (
              <div key={e.company} className="border-l-2 border-cyan-500/40 pl-2">
                <div className="text-white font-bold">{e.company} ({e.period})</div>
                <div className="text-cyan-300 text-[11px]">{e.role}</div>
                <div className="text-slate-400 text-[10px]">{e.project}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'download':
        res = (
          <div className="space-y-1 text-xs text-slate-300 font-mono">
            <div className="text-emerald-400 font-bold">Initiating CV Download...</div>
            <a
              href="/Bharath_Koneru_Azure_DevOps_engineer.pdf"
              download
              className="text-cyan-400 underline block"
            >
              Click to download: Bharath_Koneru_Azure_DevOps_engineer.pdf
            </a>
          </div>
        );
        break;

      case 'contact':
        res = (
          <div className="space-y-1 text-xs text-slate-300 font-mono">
            <div className="text-cyan-400 font-bold">Direct Contact Channels:</div>
            <div>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-cyan-300 underline">{PERSONAL_INFO.email}</a></div>
            <div>Phone: <span className="text-slate-200">{PERSONAL_INFO.phone}</span></div>
            <div>Location: <span className="text-slate-200">{PERSONAL_INFO.location}</span></div>
            <div>LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 underline">{PERSONAL_INFO.linkedin}</a></div>
          </div>
        );
        break;

      case 'clear':
      case 'cls':
        setOutputs([]);
        setInput('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        res = (
          <div className="text-xs text-red-400 font-mono">
            Command not recognized: <span className="text-white">{raw}</span>. Type <span className="text-cyan-300 font-bold">help</span> for available commands.
          </div>
        );
    }

    setOutputs((prev) => [...prev, { command: raw, response: res, time }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInput(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < history.length) {
          setHistoryIndex(nextIdx);
          setInput(history[nextIdx]);
        } else {
          setHistoryIndex(-1);
          setInput('');
        }
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-dark-950/80 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className={`bg-dark-950 border border-cyan-500/40 rounded-2xl shadow-2xl flex flex-col font-mono overflow-hidden transition-all duration-300 ${
          isMaximized ? 'w-full h-full' : 'max-w-4xl w-full h-[88vh] sm:h-[580px]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Title Bar */}
        <div className="bg-dark-900 px-4 py-3 border-b border-white/10 flex items-center justify-between select-none">
          <div className="flex items-center space-x-2 text-xs text-slate-300">
            <TermIcon className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-white">secops@bharath-cloud:~</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              aria-label={isMaximized ? "Restore terminal window" : "Maximize terminal window"}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              aria-label="Close terminal"
              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Console Outputs */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs select-text">
          {outputs.map((out, idx) => (
            <div key={idx} className="space-y-1.5">
              {out.command !== 'init' && (
                <div className="flex items-center space-x-2 text-cyan-400 font-semibold">
                  <span className="text-slate-500">[{out.time}]</span>
                  <span className="text-emerald-400">secops@azure:~$</span>
                  <span>{out.command}</span>
                </div>
              )}
              <div className="pl-2 border-l border-white/5">{out.response}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Row */}
        <div className="p-3 bg-dark-900/90 border-t border-white/10 flex items-center space-x-2">
          <span className="text-emerald-400 text-xs font-bold pl-2">secops@azure:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or any command..."
            className="flex-1 bg-transparent text-slate-100 text-xs font-mono focus:outline-none placeholder:text-slate-600"
          />
          <button
            onClick={() => handleCommand(input)}
            className="px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-md text-xs"
          >
            Execute
          </button>
        </div>
      </div>
    </div>
  );
};

