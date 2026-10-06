import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Terminal, 
  Briefcase, 
  Shield, 
  Award, 
  Download, 
  Mail, 
  ExternalLink,
  Sparkles,
  Command as CmdIcon,
  X
} from 'lucide-react';
import { sound } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
}

interface ActionItem {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<Props> = ({ isOpen, onClose, onOpenTerminal }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        sound.click();
        if (isOpen) onClose();
        else {
          // Open handled by parent or shortcut
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions: ActionItem[] = [
    {
      id: 'terminal',
      title: 'Open Interactive DevSecOps Terminal',
      category: 'Simulators',
      icon: <Terminal className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onClose();
        onOpenTerminal();
      }
    },
    {
      id: 'pipeline',
      title: 'Launch Shift-Left CI/CD Pipeline Simulator',
      category: 'Simulators',
      icon: <Shield className="w-4 h-4 text-cyan-400" />,
      action: () => {
        onClose();
        document.getElementById('pipeline')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'threat-soar',
      title: 'Simulate AI Security & Sentinel SOAR Triage',
      category: 'Simulators',
      icon: <Sparkles className="w-4 h-4 text-purple-400" />,
      action: () => {
        onClose();
        document.getElementById('threat-soar')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'download-pdf',
      title: 'Download Azure DevOps Resume (PDF)',
      category: 'Downloads',
      icon: <Download className="w-4 h-4 text-cyan-400" />,
      action: () => {
        onClose();
        const a = document.createElement('a');
        a.href = '/Bharath_Koneru_Azure_DevOps_engineer.pdf';
        a.download = 'Bharath_Koneru_Azure_DevOps_engineer.pdf';
        a.click();
      }
    },
    {
      id: 'download-docx',
      title: 'Download DevSecOps & AI Resume (DOCX)',
      category: 'Downloads',
      icon: <Download className="w-4 h-4 text-blue-400" />,
      action: () => {
        onClose();
        const a = document.createElement('a');
        a.href = '/Bharath_Sai_Subhakar_DevSecOps_AzureAI_6yearsexp.docx';
        a.download = 'Bharath_Sai_Subhakar_DevSecOps_AzureAI_6yearsexp.docx';
        a.click();
      }
    },
    {
      id: 'experience',
      title: 'View Career Experience (Volkswagen, Carelon, SysBig)',
      category: 'Navigation',
      icon: <Briefcase className="w-4 h-4 text-blue-400" />,
      action: () => {
        onClose();
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'skills',
      title: 'Browse Skills & Competency Matrix',
      category: 'Navigation',
      icon: <Award className="w-4 h-4 text-amber-400" />,
      action: () => {
        onClose();
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'contact',
      title: 'Contact Bharath (Email, Phone, Form)',
      category: 'Contact',
      icon: <Mail className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onClose();
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-dark-950/80 backdrop-blur-xl animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="max-w-xl w-full bg-dark-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className="p-3.5 border-b border-white/10 flex items-center space-x-3 bg-dark-950/80">
          <Search className="w-4 h-4 text-cyan-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command, tool, or section..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            aria-label="Close command palette"
            className="p-1 rounded-md text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-500">
              No matching commands found for "{query}".
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  sound.click();
                  item.action();
                }}
                onMouseEnter={() => sound.hover()}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 cursor-pointer text-xs group transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 rounded-lg bg-dark-950 border border-white/10 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-slate-200 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                  {item.category}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 bg-dark-950 border-t border-white/10 text-[10px] text-slate-500 flex items-center justify-between px-4">
          <span>Press ESC or click outside to dismiss</span>
          <span>Bharath Quick Navigator</span>
        </div>
      </div>
    </div>
  );
};

