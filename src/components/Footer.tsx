import React from 'react';
import { Shield, ArrowUp, Mail, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-dark-950/90 py-12 px-4 sm:px-6 lg:px-8 font-mono relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Status */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white tracking-wide">
              {PERSONAL_INFO.name}
            </div>
            <div className="text-[10px] text-slate-400 flex items-center space-x-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Active Security Posture: 99.8%</span>
            </div>
          </div>
        </div>

        {/* Links & Socials */}
        <div className="flex items-center space-x-6 text-xs text-slate-400">
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            onClick={() => sound.hover()}
            className="hover:text-cyan-300 transition-colors flex items-center space-x-1.5"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 0 0 1.66-1.66 1.66 1.66 0 1 0-1.66 1.66m1.39 9.74v-8.37H5.07v8.37h2.78z" />
            </svg>
            <span>LinkedIn</span>
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            onClick={() => sound.hover()}
            className="hover:text-cyan-300 transition-colors flex items-center space-x-1"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center space-x-1"
            title="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span className="text-[10px]">Top</span>
          </button>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 text-center text-[11px] text-slate-500">
        © {new Date().getFullYear()} Bharath Sai Subhakar K. Engineered with React, TypeScript, Tailwind CSS & 3D Interactive Canvas.
      </div>
    </footer>
  );
};

