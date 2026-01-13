import { NextResponse } from "next/server";
import { greenhouse , lever , workable } from "@/lib/constants";
import { APIsCalls } from "@/lib/calls";
const {fetchGreenhouse , fetchLever , fetchWorkable} = APIsCalls;



export async function GET() {
  
  const [gh, lv, wk] = await Promise.all([
    Promise.all(greenhouse.map(c => fetchGreenhouse(c.slug, c.name))),
    Promise.all(lever.map(c => fetchLever(c.slug, c.name))),
    Promise.all(workable.map(c => fetchWorkable(c.slug, c.name)))
  ]);

 
  const allJobs = [...gh.flat(), ...lv.flat(), ...wk.flat()];
  
 
  const shuffledJobs = allJobs
    .map(job => ({ job, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ job }) => job);

  return NextResponse.json({
    total: shuffledJobs.length,
    companies: greenhouse.length + lever.length + workable.length,
    jobs: shuffledJobs,
  });
}