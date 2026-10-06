import React, { useState, useEffect } from 'react';
import { Shield, Terminal, Volume2, VolumeX, Download, Menu, X, Command, Sparkles, Zap, Layers } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { PersonaMode } from './DualSynergySection';
import { sound } from '../utils/audio';

interface Props {
  personaMode: PersonaMode;
  onSelectPersona: (mode: PersonaMode) => void;
  onOpenTerminal: () => void;
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<Props> = ({
  personaMode,
  onSelectPersona,
  onOpenTerminal,
  onOpenCommandPalette
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeDropdown, setResumeDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    sound.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) sound.click();
  };

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Synergy', href: '#synergy' },
    { label: 'Architecture', href: '#bento' },
    { label: 'Pipeline Sim', href: '#pipeline' },
    { label: 'Threat SOAR', href: '#threat-soar' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#overview"
          onClick={() => sound.hover()}
          className="flex items-center space-x-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
            <div className="w-full h-full bg-dark-900 rounded-xl flex items-center justify-center group-hover:bg-dark-850 transition-colors">
              <Shield className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-wide text-slate-100 group-hover:text-cyan-300 transition-colors flex items-center space-x-1.5">
              <span>BHARATH SAI</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono border ${
                personaMode === 'devops'
                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                  : personaMode === 'security'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
              }`}>
                {personaMode === 'devops' ? 'DEVOPS' : personaMode === 'security' ? 'SEC.OPS' : 'DUAL'}
              </span>
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              {personaMode === 'devops' ? 'Azure & CI/CD Engineer' : personaMode === 'security' ? 'Cloud Security & Sentinel' : 'DevOps & Cloud Security'}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-1 bg-dark-900/60 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => sound.hover()}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Controls & Utilities */}
        <div className="hidden md:flex items-center space-x-2">
          
          {/* Quick Persona Mode Switcher in Navbar */}
          <div className="flex items-center bg-dark-900/80 p-1 rounded-lg border border-white/10 text-[11px] font-mono">
            <button
              onClick={() => {
                sound.click();
                onSelectPersona('devops');
              }}
              title="Switch to DevOps profile"
              className={`px-2 py-1 rounded-md transition-all ${
                personaMode === 'devops' ? 'bg-blue-600 text-white font-bold shadow' : 'text-slate-400 hover:text-blue-300'
              }`}
            >
              DevOps
            </button>
            <button
              onClick={() => {
                sound.click();
                onSelectPersona('security');
              }}
              title="Switch to Cloud Security profile"
              className={`px-2 py-1 rounded-md transition-all ${
                personaMode === 'security' ? 'bg-emerald-600 text-white font-bold shadow' : 'text-slate-400 hover:text-emerald-300'
              }`}
            >
              SecOps
            </button>
            <button
              onClick={() => {
                sound.click();
                onSelectPersona('unified');
              }}
              title="Switch to Unified Dual profile"
              className={`px-2 py-1 rounded-md transition-all ${
                personaMode === 'unified' ? 'bg-cyan-600 text-white font-bold shadow' : 'text-slate-400 hover:text-cyan-300'
              }`}
            >
              Both
            </button>
          </div>

          {/* Command Palette Trigger */}
          <button
            onClick={() => {
              sound.click();
              onOpenCommandPalette();
            }}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-dark-900/80 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-all"
            title="Quick Navigation (Cmd/Ctrl + K)"
          >
            <Command className="w-3.5 h-3.5 text-cyan-400" />
            <kbd className="text-[10px] px-1 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label={soundEnabled ? "Mute interactive audio effects" : "Enable interactive audio effects"}
            className={`p-2 rounded-lg border transition-all ${
              soundEnabled
                ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_10px_rgba(0,242,254,0.15)]'
                : 'bg-white/5 text-slate-500 border-white/10'
            }`}
            title={soundEnabled ? 'Audio FX Enabled' : 'Audio FX Muted'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Terminal Launcher */}
          <button
            onClick={() => {
              sound.click();
              onOpenTerminal();
            }}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono transition-all duration-200"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>CLI</span>
          </button>

          {/* Resume Download Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                sound.click();
                setResumeDropdown(!resumeDropdown);
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs transition-all duration-200 shadow-lg ${
                personaMode === 'devops'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-blue-500/20'
                  : personaMode === 'security'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-dark-950 font-bold shadow-emerald-500/20'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-dark-950 font-bold shadow-cyan-500/20'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>

            {resumeDropdown && (
              <div
                className="absolute right-0 mt-2 w-56 bg-dark-900 border border-white/10 rounded-xl p-2 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseLeave={() => setResumeDropdown(false)}
              >
                <div className="px-2 py-1.5 text-[10px] font-mono text-slate-400 border-b border-white/10 uppercase tracking-wider">
                  Download Official CV
                </div>
                <a
                  href="/Bharath_Koneru_Azure_DevOps_engineer.pdf"
                  download
                  onClick={() => sound.success()}
                  className={`flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors mt-1 font-mono ${
                    personaMode === 'devops' ? 'bg-blue-500/20 text-blue-300 font-bold' : 'text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <span>Azure DevOps CV (PDF)</span>
                  <span className="text-[10px] text-cyan-400">PDF</span>
                </a>
                <a
                  href="/Bharath_Sai_Subhakar_DevSecOps_AzureAI_6yearsexp.docx"
                  download
                  onClick={() => sound.success()}
                  className={`flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors font-mono ${
                    personaMode === 'security' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <span>DevSecOps & AI (DOCX)</span>
                  <span className="text-[10px] text-emerald-400">DOCX</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => {
              sound.click();
              onOpenTerminal();
            }}
            className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs"
          >
            <Terminal className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="p-2 rounded-lg bg-white/5 text-slate-300 border border-white/10"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dark-950/95 border-b border-white/10 px-4 py-4 space-y-2 backdrop-blur-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-xs font-mono text-slate-400">Role Focus:</span>
            <div className="flex gap-1">
              <button
                onClick={() => onSelectPersona('devops')}
                className={`px-2 py-1 rounded text-xs font-mono ${personaMode === 'devops' ? 'bg-blue-600 text-white' : 'bg-dark-900 text-slate-400'}`}
              >
                DevOps
              </button>
              <button
                onClick={() => onSelectPersona('security')}
                className={`px-2 py-1 rounded text-xs font-mono ${personaMode === 'security' ? 'bg-emerald-600 text-white' : 'bg-dark-900 text-slate-400'}`}
              >
                SecOps
              </button>
              <button
                onClick={() => onSelectPersona('unified')}
                className={`px-2 py-1 rounded text-xs font-mono ${personaMode === 'unified' ? 'bg-cyan-600 text-white' : 'bg-dark-900 text-slate-400'}`}
              >
                Both
              </button>
            </div>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                sound.hover();
                setMobileMenuOpen(false);
              }}
              className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-white/10"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <a
              href="/Bharath_Koneru_Azure_DevOps_engineer.pdf"
              download
              className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-cyan-500 text-dark-950 font-semibold text-xs font-mono"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Resume (DevOps)</span>
            </a>
            <a
              href="/Bharath_Sai_Subhakar_DevSecOps_AzureAI_6yearsexp.docx"
              download
              className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-dark-800 text-slate-200 border border-white/10 font-semibold text-xs font-mono"
            >
              <Download className="w-4 h-4" />
              <span>Download DOCX Resume (DevSecOps)</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
