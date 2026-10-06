import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DualSynergySection, PersonaMode } from './components/DualSynergySection';
import { BentoGrid } from './components/BentoGrid';
import { PipelineSimulator } from './components/PipelineSimulator';
import { ThreatDefensePlaybook } from './components/ThreatDefensePlaybook';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsRadar } from './components/SkillsRadar';
import { CertificationsShowcase } from './components/CertificationsShowcase';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LiveTerminal } from './components/LiveTerminal';
import { CommandPalette } from './components/CommandPalette';
import { RoleSelectionModal } from './components/RoleSelectionModal';
import { MultiCloudBackground, CloudFocus } from './components/MultiCloudBackground';
import { Terminal, Command, Sparkles, Compass } from 'lucide-react';
import { sound } from './utils/audio';

export function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cloudFocus, setCloudFocus] = useState<CloudFocus>('all');
  const [personaMode, setPersonaMode] = useState<PersonaMode>('unified');

  // Trigger Role Selection on first landing
  useEffect(() => {
    const hasChosenRole = sessionStorage.getItem('bharath_role_chosen');
    if (!hasChosenRole) {
      const timer = setTimeout(() => {
        setIsRoleModalOpen(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scroll = (totalScroll / windowHeight) * 100;
        setScrollProgress(scroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K for command palette, ~ or ` for terminal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        sound.click();
        setIsCommandPaletteOpen((prev) => !prev);
      } else if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        sound.click();
        setIsTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleRoleSelection = (mode: PersonaMode) => {
    setPersonaMode(mode);
    sessionStorage.setItem('bharath_role_chosen', mode);
    
    if (mode === 'devops') {
      setCloudFocus('azure');
    } else if (mode === 'security') {
      setCloudFocus('security');
    } else {
      setCloudFocus('all');
    }
  };

  return (
    <div className="min-h-screen bg-[#06070a] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 relative font-sans overflow-x-hidden">
      
      {/* Scroll Progress Bar at the top */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-dark-950 z-50">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-amber-500 to-emerald-500 shadow-[0_0_10px_#00f2fe]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Multi-Cloud Background Ambient Layer (Half Azure, Half AWS, Cloud Security) */}
      <MultiCloudBackground focus={cloudFocus} onFocusChange={setCloudFocus} />

      {/* Navigation Bar */}
      <Navbar
        personaMode={personaMode}
        onSelectPersona={handleRoleSelection}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Sections */}
      <main className="relative z-10 space-y-12">
        <HeroSection
          personaMode={personaMode}
          onSelectPersona={handleRoleSelection}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenRoleModal={() => setIsRoleModalOpen(true)}
        />
        <DualSynergySection
          personaMode={personaMode}
          onSelectPersona={handleRoleSelection}
        />
        <BentoGrid />
        <PipelineSimulator />
        <ThreatDefensePlaybook />
        <ExperienceSection />
        <SkillsRadar />
        <CertificationsShowcase />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Initial Entry Role Selection Modal (Choose Security vs DevOps) */}
      <RoleSelectionModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        onSelectRole={handleRoleSelection}
      />

      {/* Interactive Terminal Modal */}
      <LiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Global Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Floating Bottom Quick Launcher Pill */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center space-x-2 bg-dark-900/90 border border-cyan-500/30 rounded-full p-1.5 shadow-2xl backdrop-blur-xl">
        <button
          onClick={() => {
            sound.click();
            setIsRoleModalOpen(true);
          }}
          className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono transition-all"
          title="Change Track (SecOps / DevOps)"
        >
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>Role Track</span>
        </button>

        <button
          onClick={() => {
            sound.click();
            setIsTerminalOpen(true);
          }}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono transition-all"
          title="Open Terminal (`)"
        >
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span>CLI</span>
        </button>

        <button
          onClick={() => {
            sound.click();
            setIsCommandPaletteOpen(true);
          }}
          className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono transition-all"
          title="Command Palette (Cmd+K)"
        >
          <Command className="w-3.5 h-3.5 text-cyan-400" />
          <span>⌘K</span>
        </button>
      </div>

    </div>
  );
}

export default App;
