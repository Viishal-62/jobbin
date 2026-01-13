 "use client"
import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  DollarSign, 
  Clock, 
  Zap, 
  Bookmark,
  ExternalLink,
  Mail,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const JOBS = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    company: "Lumina AI",
    logo: "⚡",
    location: "Remote",
    salary: "$140k - $190k",
    postedDate: "2h ago",
    tags: ["React", "TypeScript"],
  },
  {
    id: 2,
    title: "Product Designer",
    company: "FlowState",
    logo: "🌊",
    location: "New York",
    salary: "$120k - $160k",
    postedDate: "5h ago",
    tags: ["Figma", "UI/UX"],
  },
  {
    id: 3,
    title: "Growth Marketer",
    company: "Sparkly",
    logo: "✨",
    location: "Remote",
    salary: "$90k - $130k",
    postedDate: "1d ago",
    tags: ["SEO", "Ads"],
  },
  {
    id: 4,
    title: "Backend Architect",
    company: "Nebula",
    logo: "☁️",
    location: "Austin",
    salary: "$160k - $220k",
    postedDate: "3d ago",
    tags: ["Go", "AWS"],
  },
  {
    id: 5,
    title: "Mobile Lead",
    company: "Swiftly",
    logo: "📱",
    location: "Remote",
    salary: "$150k - $200k",
    postedDate: "4h ago",
    tags: ["Swift", "Kotlin"],
  },
  {
    id: 6,
    title: "Data Scientist",
    company: "Orbit",
    logo: "🪐",
    location: "SF / Remote",
    salary: "$130k - $180k",
    postedDate: "6h ago",
    tags: ["Python", "PyTorch"],
  },
  {
    id: 7,
    title: "DevOps Lead",
    company: "Shield",
    logo: "🛡️",
    location: "Chicago",
    salary: "$170k - $210k",
    postedDate: "8h ago",
    tags: ["Docker", "K8s"],
  },
  {
    id: 8,
    title: "Content Strategist",
    company: "Echo",
    logo: "📢",
    location: "London",
    salary: "$80k - $110k",
    postedDate: "12h ago",
    tags: ["Copy", "Social"],
  }
];

export default function App() {
  const [saved, setSaved] = useState(new Set());

  const toggleSave = (id) => {
    const newSaved = new Set(saved);
    if (newSaved.has(id)) newSaved.delete(id);
    else newSaved.add(id);
    setSaved(newSaved);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden relative">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full"></div>
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-violet-600/5 blur-[100px] pointer-events-none rounded-full"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        
        {/* Refined Header */}
        <nav className="flex items-center justify-between mb-20">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 blur-md opacity-40 group-hover:opacity-80 transition-opacity"></div>
              <div className="relative bg-zinc-900 border border-white/10 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Zap className="text-indigo-400 w-5 h-5 fill-current" />
              </div>
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">Jobbin</span>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-zinc-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.2em]">Post Job</button>
            <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2 rounded-full text-xs font-bold text-white transition-all backdrop-blur-sm">Login</button>
          </div>
        </nav>

        {/* Search Bar - Center aligned for grid layout */}
        <div className="relative max-w-2xl mx-auto mb-20 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 rounded-3xl blur opacity-20 group-focus-within:opacity-100 transition-opacity duration-700"></div>
          <div className="relative flex items-center bg-zinc-900/50 border border-white/5 rounded-2xl backdrop-blur-2xl">
            <Search className="absolute left-5 text-zinc-600 w-4 h-4" />
            <input 
              type="text"
              placeholder="Find your next startup move..."
              className="w-full pl-12 pr-6 py-5 bg-transparent text-sm focus:outline-none placeholder:text-zinc-700 text-white"
            />
          </div>
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 fill-current" /> Open Positions
          </h2>
          <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            <span>Grid View</span>
            <div className="w-8 h-[1px] bg-zinc-800"></div>
            <span>8 results</span>
          </div>
        </div>

        {/* Job Grid - 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {JOBS.map(job => (
            <div 
              key={job.id} 
              className="group relative bg-zinc-900/30 border border-white/[0.03] p-6 rounded-[28px] hover:border-white/10 hover:bg-zinc-900/60 transition-all duration-500 flex flex-col justify-between"
            >
              <div className="relative">
                {/* Top: Logo & Save */}
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-white/[0.05] flex items-center justify-center text-2xl shadow-2xl group-hover:scale-110 transition-transform duration-500">
                    {job.logo}
                  </div>
                  <button 
                    onClick={() => toggleSave(job.id)}
                    className={`p-2.5 rounded-xl transition-all ${saved.has(job.id) ? 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20' : 'bg-white/[0.02] text-zinc-600 hover:text-zinc-400 border border-white/[0.05]'}`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${saved.has(job.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                
                {/* Middle: Info */}
                <div className="mb-6">
                  <h3 className="font-bold text-white group-hover:text-indigo-300 transition-colors duration-300 tracking-tight leading-tight mb-1">
                    {job.title}
                  </h3>
                  <p className="font-bold text-zinc-500 text-xs uppercase tracking-wider">{job.company}</p>
                </div>

                {/* Metadata Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/5 px-2 py-1 rounded-md border border-emerald-500/10">
                    <DollarSign className="w-2.5 h-2.5" /> {job.salary.split(' - ')[1]}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                    <MapPin className="w-2.5 h-2.5" /> {job.location}
                  </span>
                </div>
              </div>

              {/* Bottom: Action */}
              <div className="pt-5 border-t border-white/[0.03]">
                <button className="w-full py-3 bg-white/[0.04] hover:bg-indigo-600 border border-white/[0.05] hover:border-indigo-400 text-white rounded-xl transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] group/btn shadow-xl active:scale-[0.98]">
                  Apply 
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Compact Newsletter - Redesigned for full width */}
        <div className="relative overflow-hidden bg-zinc-900/50 border border-white/[0.05] rounded-[40px] p-10 group/news mb-20">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px]"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full mb-4">
                <Sparkles className="w-3 h-3 text-indigo-400" />
                <span className="text-[9px] font-black uppercase tracking-widest text-indigo-300">Exclusive Feed</span>
              </div>
              <h4 className="font-bold text-white text-3xl mb-3 tracking-tighter">Never miss a launch.</h4>
              <p className="text-zinc-500 text-sm max-w-sm font-medium">
                The world's best startup roles, hand-curated and delivered to your inbox every Friday.
              </p>
            </div>
            
            <div className="w-full max-w-md flex items-center bg-black/40 p-2 rounded-2xl border border-white/[0.05] focus-within:border-indigo-500/50 transition-all shadow-inner">
              <input 
                type="email" 
                placeholder="yourname@domain.com"
                className="bg-transparent border-none outline-none px-5 py-3 text-sm text-white placeholder:text-zinc-700 w-full"
              />
              <button className="bg-white text-black px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all hover:bg-indigo-400 hover:text-white shadow-xl active:scale-95">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Polished Minimal Footer */}
        <footer className="text-center">
          <div className="flex justify-center gap-12 mb-8">
            {['Twitter', 'LinkedIn', 'Github', 'Status'].map(link => (
              <span key={link} className="text-[10px] font-black text-zinc-600 hover:text-indigo-400 transition-colors cursor-pointer uppercase tracking-[0.2em]">{link}</span>
            ))}
          </div>
          <p className="text-zinc-800 text-[9px] font-black tracking-[0.4em] uppercase">
            Designed for the 1% of talent
          </p>
        </footer>

      </div>
    </div>
  );
}