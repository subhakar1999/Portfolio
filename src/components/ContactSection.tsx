import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  Send, 
  Copy, 
  Check, 
  ShieldCheck, 
  Sparkles,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const ContactSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const copyToClipboard = (text: string, field: string) => {
    sound.success();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.success();
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>CONNECT & COLLABORATE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Get in Touch
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Let's discuss Senior Cloud Security, DevSecOps architecture, or enterprise cloud automation opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Contact Details & Quick Copy & Direct CV Downloads */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Contact Cards */}
          <div className="bg-dark-900/90 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              Direct Contact Details
            </h3>

            {/* Email Card */}
            <div className="p-4 rounded-xl bg-dark-950/80 border border-white/5 flex items-center justify-between group">
              <div className="flex items-center space-x-3 truncate">
                <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-mono text-slate-400">Email Address</div>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-xs sm:text-sm font-semibold text-white hover:text-cyan-300 transition-colors truncate block"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                aria-label={copiedField === 'email' ? "Email copied to clipboard" : "Copy email to clipboard"}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                title="Copy Email"
              >
                {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-4 rounded-xl bg-dark-950/80 border border-white/5 flex items-center justify-between group">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400">Phone Number</div>
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="text-xs sm:text-sm font-semibold text-white hover:text-emerald-300 transition-colors"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                aria-label={copiedField === 'phone' ? "Phone number copied to clipboard" : "Copy phone number to clipboard"}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                title="Copy Phone"
              >
                {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Location & LinkedIn */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-dark-950/80 border border-white/5">
                <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>Location</span>
                </div>
                <div className="text-sm font-bold text-white">{PERSONAL_INFO.location}</div>
              </div>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.hover()}
                className="p-4 rounded-xl bg-dark-950/80 border border-white/5 hover:border-blue-500/40 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-blue-400 text-xs font-mono mb-1">
                  <div className="flex items-center space-x-1.5">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 0 0 1.66-1.66 1.66 1.66 0 1 0-1.66 1.66m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                    </svg>
                    <span>LinkedIn</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs font-bold text-slate-200">Connect Profile</div>
              </a>
            </div>
          </div>

          {/* Direct Resume Downloads Box */}
          <div className="bg-gradient-to-r from-dark-900/90 to-dark-850/90 border border-cyan-500/30 rounded-2xl p-6 shadow-xl backdrop-blur-xl space-y-3">
            <div className="flex items-center space-x-2">
              <Download className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                Download Official Resumes
              </h4>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <a
                href="/Bharath_Koneru_Azure_DevOps_engineer.pdf"
                download
                onClick={() => sound.success()}
                className="flex items-center justify-between p-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 transition-all text-xs font-mono"
              >
                <div>
                  <div className="font-bold">Azure DevOps CV</div>
                  <div className="text-[10px] text-slate-400">PDF Document</div>
                </div>
                <Download className="w-4 h-4" />
              </a>

              <a
                href="/Bharath_Sai_Subhakar_DevSecOps_AzureAI_6yearsexp.docx"
                download
                onClick={() => sound.success()}
                className="flex items-center justify-between p-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 transition-all text-xs font-mono"
              >
                <div>
                  <div className="font-bold">DevSecOps & AI</div>
                  <div className="text-[10px] text-slate-400">DOCX Document</div>
                </div>
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Right: Interactive Message Box */}
        <div className="lg:col-span-7 bg-dark-900/90 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-xl">
          <h3 className="text-xl font-bold text-white mb-2">Send a Message</h3>
          <p className="text-xs text-slate-400 font-mono mb-6">
            Direct dispatch channel to Bharath Sai Subhakar K.
          </p>

          {isSubmitted ? (
            <div className="p-8 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-3 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Message Dispatched!</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Thank you for reaching out. Bharath will respond directly to your email shortly.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormState({ name: '', email: '', subject: '', message: '' });
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-400">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-400">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-slate-400">Subject / Topic</label>
                <input
                  type="text"
                  required
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  placeholder="Senior Azure Security / DevSecOps Opportunity"
                  className="w-full bg-dark-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-slate-400">Message</label>
                <textarea
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Hi Bharath, I reviewed your cloud security and DevSecOps background..."
                  className="w-full bg-dark-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-sans resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-dark-950 font-bold text-xs tracking-wide shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-200"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>
            </form>
          )}

        </div>

      </div>
    </section>
  );
};
