import React, { useState } from 'react';
import { 
  Shield, 
  Code2, 
  GitMerge, 
  Cloud, 
  Server, 
  Search, 
  Layers, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const SkillsRadar: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCategories = SKILL_CATEGORIES.map((cat) => {
    if (activeCategory !== 'All' && cat.title !== activeCategory) {
      return null;
    }
    const matchingSkills = cat.skills.filter((s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (matchingSkills.length === 0) return null;
    return { ...cat, skills: matchingSkills };
  }).filter(Boolean);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield className="w-5 h-5 text-cyan-400" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-blue-400" />;
      case 'GitMerge': return <GitMerge className="w-5 h-5 text-emerald-400" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-purple-400" />;
      case 'Server': return <Server className="w-5 h-5 text-amber-400" />;
      default: return <Layers className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>TECHNICAL COMPETENCIES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Core Competency Matrix
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Engineered proficiency across modern cloud platforms, automated security governance, and multi-cloud infrastructure.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {['All', ...SKILL_CATEGORIES.map((c) => c.title)].map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  sound.click();
                  setActiveCategory(cat);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                  isSelected
                    ? 'bg-cyan-500 text-dark-950 font-bold shadow-lg shadow-cyan-500/20'
                    : 'bg-dark-900/80 text-slate-300 border border-white/10 hover:border-cyan-500/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search skills (e.g. Sentinel, K8s)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-900/90 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
          />
        </div>

      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCategories.map((cat) => {
          if (!cat) return null;
          return (
            <div
              key={cat.title}
              onMouseEnter={() => sound.hover()}
              className="bg-dark-900/90 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-xl space-y-5 hover:border-cyan-500/30 transition-all group"
            >
              {/* Category Header */}
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-dark-950 border border-white/10 group-hover:scale-105 transition-transform">
                  {getCategoryIcon(cat.iconName)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-200 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{cat.description}</p>
                </div>
              </div>

              {/* Skills List with Progress Bars */}
              <div className="space-y-3.5 pt-2">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-200 font-medium flex items-center space-x-1.5">
                        <span>{skill.name}</span>
                        {skill.badge && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                            {skill.badge}
                          </span>
                        )}
                      </span>
                      <span className="text-slate-400 text-[11px]">{skill.experience}</span>
                    </div>

                    {/* Progress Track */}
                    <div className="h-2 w-full bg-dark-950 rounded-full overflow-hidden p-[1px] border border-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 shadow-[0_0_8px_rgba(0,242,254,0.4)] transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

