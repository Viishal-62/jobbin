import React from 'react';
import { Zap } from 'lucide-react';
import JobGrid from './api/components/JobsGrid';

async function getJobs() {
  try {
    const res = await fetch("https://jobbin-9luf.vercel.app/api/jobs", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  } catch (e) {
    return { jobs: [], total: 0 };
  }
}

export default async function Page() {
  const { jobs } = await getJobs();

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden relative">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
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

    
        <JobGrid initialJobs={jobs} />

        <footer className="text-center pb-12">
           <p className="text-zinc-800 text-[9px] font-black tracking-[0.4em] uppercase">Designed for the 1% of talent</p>
        </footer>
      </div>
    </div>
  );
}