import React, { useState, useEffect } from 'react';
import { Shield, Cloud, Lock, Server, Cpu, Database, Network, Key, Layers, Bot } from 'lucide-react';
import { sound } from '../utils/audio';

export type CloudFocus = 'all' | 'azure' | 'aws' | 'security';

interface Props {
  focus?: CloudFocus;
  onFocusChange?: (focus: CloudFocus) => void;
}

export const MultiCloudBackground: React.FC<Props> = ({
  focus = 'all',
  onFocusChange,
}) => {
  const [activeFocus, setActiveFocus] = useState<CloudFocus>(focus);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setActiveFocus(focus);
  }, [focus]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSelectFocus = (mode: CloudFocus) => {
    sound.click();
    setActiveFocus(mode);
    if (onFocusChange) onFocusChange(mode);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      
      {/* 1. AZURE SECTOR (Deep Blue / Cyan - Left / Top) */}
      <div
        className={`absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full blur-[140px] transition-all duration-700 ${
          activeFocus === 'aws'
            ? 'opacity-15'
            : activeFocus === 'azure'
            ? 'opacity-80 scale-110'
            : 'opacity-40'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(0, 120, 212, 0.45) 0%, rgba(2, 132, 199, 0.25) 50%, transparent 70%)',
          transform: `translate(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px)`,
        }}
      />

      {/* 2. AWS SECTOR (Orange / Amber / Gold - Right / Mid) */}
      <div
        className={`absolute top-1/4 -right-32 w-[650px] h-[650px] rounded-full blur-[140px] transition-all duration-700 ${
          activeFocus === 'azure'
            ? 'opacity-15'
            : activeFocus === 'aws'
            ? 'opacity-80 scale-110'
            : 'opacity-40'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(255, 153, 0, 0.4) 0%, rgba(217, 119, 6, 0.25) 50%, transparent 70%)',
          transform: `translate(${-mousePos.x * 0.6}px, ${mousePos.y * 0.6}px)`,
        }}
      />

      {/* 3. CLOUD SECURITY & DEVSECOPS CORE (Emerald & Violet - Center / Bottom) */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[750px] h-[550px] rounded-full blur-[150px] transition-all duration-700 ${
          activeFocus === 'security'
            ? 'opacity-80 scale-110'
            : 'opacity-35'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, rgba(139, 92, 246, 0.25) 50%, transparent 70%)',
          transform: `translate(${mousePos.x * 0.4}px, ${-mousePos.y * 0.4}px)`,
        }}
      />

      {/* Floating Architecture Hologram Nodes in Background */}
      <div className="absolute inset-0 max-w-7xl mx-auto hidden lg:block opacity-40">
        
        {/* Azure Floating Badges (Left) */}
        <div 
          className="absolute top-36 left-8 p-3 rounded-2xl bg-dark-900/60 border border-cyan-500/30 backdrop-blur-md text-[11px] font-mono text-cyan-300 space-y-1 shadow-lg shadow-cyan-500/10 transition-transform duration-300"
          style={{ transform: `translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px)` }}
        >
          <div className="flex items-center space-x-2">
            <Cloud className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold">MICROSOFT AZURE</span>
          </div>
          <div className="text-[10px] text-slate-400">AKS • Sentinel SIEM • Entra ID</div>
        </div>

        {/* AWS Floating Badges (Right) */}
        <div 
          className="absolute top-48 right-8 p-3 rounded-2xl bg-dark-900/60 border border-amber-500/30 backdrop-blur-md text-[11px] font-mono text-amber-300 space-y-1 shadow-lg shadow-amber-500/10 transition-transform duration-300"
          style={{ transform: `translate(${-mousePos.x * 0.8}px, ${mousePos.y * 0.8}px)` }}
        >
          <div className="flex items-center space-x-2">
            <Server className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold">AMAZON WEB SERVICES</span>
          </div>
          <div className="text-[10px] text-slate-400">Landing Zone • SCPs • S3 • Lambda</div>
        </div>

        {/* Cloud Security Central Shield */}
        <div 
          className="absolute bottom-40 left-12 p-3 rounded-2xl bg-dark-900/60 border border-emerald-500/30 backdrop-blur-md text-[11px] font-mono text-emerald-300 space-y-1 shadow-lg shadow-emerald-500/10 transition-transform duration-300"
          style={{ transform: `translate(${mousePos.x * 0.5}px, ${-mousePos.y * 0.5}px)` }}
        >
          <div className="flex items-center space-x-2">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-bold">DEVSECOPS & ZERO-TRUST</span>
          </div>
          <div className="text-[10px] text-slate-400">Snyk • Checkmarx • Trivy • Policy-as-Code</div>
        </div>

        {/* AI Security Agent Node */}
        <div 
          className="absolute bottom-52 right-16 p-3 rounded-2xl bg-dark-900/60 border border-purple-500/30 backdrop-blur-md text-[11px] font-mono text-purple-300 space-y-1 shadow-lg shadow-purple-500/10 transition-transform duration-300"
          style={{ transform: `translate(${-mousePos.x * 0.5}px, ${-mousePos.y * 0.5}px)` }}
        >
          <div className="flex items-center space-x-2">
            <Bot className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-bold">AZURE AI AGENTS</span>
          </div>
          <div className="text-[10px] text-slate-400">LLM Triage • Logic Apps SOAR</div>
        </div>

      </div>

      {/* Cyber Grid overlay */}
      <div className="absolute inset-0 cyber-grid opacity-20" />

      {/* Ambient Multi-Cloud Interactive Pill Selector at the Top Right of the page */}
      <div className="absolute top-20 right-6 z-30 pointer-events-auto hidden xl:flex items-center space-x-1.5 p-1 rounded-full bg-dark-950/80 border border-white/10 backdrop-blur-xl shadow-2xl font-mono text-[11px]">
        <span className="px-2 text-slate-400 text-[10px]">THEME RADAR:</span>
        <button
          onClick={() => handleSelectFocus('all')}
          className={`px-2.5 py-1 rounded-full transition-all ${
            activeFocus === 'all'
              ? 'bg-white/10 text-white font-bold border border-white/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Multi-Cloud
        </button>
        <button
          onClick={() => handleSelectFocus('azure')}
          className={`px-2.5 py-1 rounded-full transition-all ${
            activeFocus === 'azure'
              ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-cyan-300'
          }`}
        >
          Azure Cloud
        </button>
        <button
          onClick={() => handleSelectFocus('aws')}
          className={`px-2.5 py-1 rounded-full transition-all ${
            activeFocus === 'aws'
              ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 shadow-sm'
              : 'text-slate-400 hover:text-amber-300'
          }`}
        >
          AWS Cloud
        </button>
        <button
          onClick={() => handleSelectFocus('security')}
          className={`px-2.5 py-1 rounded-full transition-all ${
            activeFocus === 'security'
              ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-emerald-300'
          }`}
        >
          Cloud Security
        </button>
      </div>

    </div>
  );
};

