"use client";
import React, { useState, useMemo } from 'react';
import { 
  Search,
  MapPin, 
  DollarSign, 
  Bookmark,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function JobGrid({ initialJobs }: { initialJobs: any[] }) {
  const [saved, setSaved] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
 
  const filteredJobs = useMemo(() => {
    return initialJobs.filter(job => 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, initialJobs]);

  const toggleSave = (id: number) => {
    const newSaved = new Set(saved);
    if (newSaved.has(id)) newSaved.delete(id);
    else newSaved.add(id);
    setSaved(newSaved);
  };


  const handleApply = (applyUrl: any) => {

    if(!applyUrl) window.alert("Apply URL not found");
    window.open(applyUrl, "_blank");
  };
  return (
    <>
      {/* Search Bar - Now controlled by state */}
      <div className="relative max-w-2xl mx-auto mb-20 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 rounded-3xl blur opacity-20 group-focus-within:opacity-100 transition-opacity duration-700"></div>
        <div className="relative flex items-center bg-zinc-900/50 border border-white/5 rounded-2xl backdrop-blur-2xl">
          <Search className="absolute left-5 text-zinc-600 w-4 h-4" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by role, company, or tech..."
            className="w-full pl-12 pr-6 py-5 bg-transparent text-sm focus:outline-none placeholder:text-zinc-700 text-white"
          />
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 fill-current" /> Open Positions
        </h2>
        <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
          <span>Grid View</span>
          <div className="w-8 h-[1px] bg-zinc-800"></div>
          <span>{filteredJobs.length} results</span>
        </div>
      </div>

      {/* Job Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div 
              key={job.id} 
              className="group relative bg-zinc-900/30 border border-white/[0.03] p-6 rounded-[28px] hover:border-white/10 hover:bg-zinc-900/60 transition-all duration-500 flex flex-col justify-between"
            >
              <div className="relative">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-white/[0.05] flex items-center justify-center text-2xl shadow-2xl group-hover:scale-110 transition-transform duration-500">
                    {"💼"}
                  </div>
                  <button 
                    onClick={() => toggleSave(job.id)}
                    className={`p-2.5 rounded-xl transition-all ${saved.has(job.id) ? 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20' : 'bg-white/[0.02] text-zinc-600 hover:text-zinc-400 border border-white/[0.05]'}`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${saved.has(job.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-bold text-white group-hover:text-indigo-300 transition-colors duration-300 tracking-tight leading-tight mb-1">
                    {job.title}
                  </h3>
                  <p className="font-bold text-zinc-500 text-xs uppercase tracking-wider">{job.company}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {/* <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/5 px-2 py-1 rounded-md border border-emerald-500/10">
                    <DollarSign className="w-2.5 h-2.5" /> {job.salary}
                  </span> */}
                  <span className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                    <MapPin className="w-2.5 h-2.5" /> {job.location}
                  </span>
                </div>
              </div>

              <div
              
              className="pt-5 border-t border-white/[0.03]">
                <button
                 onClick={() => handleApply(job?.applyUrl)}
                className="w-full py-3 bg-white/[0.04] hover:bg-indigo-600 border border-white/[0.05] hover:border-indigo-400 text-white rounded-xl transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] group/btn shadow-xl active:scale-[0.98]">
                  Apply 
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-zinc-600 font-bold uppercase tracking-widest text-xs">
            No positions found matching your search.
          </div>
        )}
      </div>
    </>
  );
}