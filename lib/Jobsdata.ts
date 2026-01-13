import { NextRequest, NextResponse } from "next/server";
import { greenhouse, lever, workable } from "@/lib/constants";
import { APIsCalls } from "@/lib/calls";
import makeHash from "@/lib/hash";
import { prisma } from "@/lib/db";

const { fetchGreenhouse, fetchLever, fetchWorkable } = APIsCalls;

export async function fetchJobs() {
  const [gh, lv, wk] = await Promise.all([
    Promise.all(greenhouse.map(c => fetchGreenhouse(c.slug, c.name))),
    Promise.all(lever.map(c => fetchLever(c.slug, c.name))),
    Promise.all(workable.map(c => fetchWorkable(c.slug, c.name))),
  ]);

  const allJobs = [...gh.flat(), ...lv.flat(), ...wk.flat()];

  let created = 0;
  let updated = 0;

  for (const job of allJobs) {
    const hash = makeHash(job);

    const res = await prisma.job.upsert({
      where: { hash },
      create: {
        hash,
        ats: job.ats,
        company: job.company,
        title: job.title,
        location: job.location,
        description: job.description,
        applyUrl: job.applyUrl,
        postedAt: job.postedAt ? new Date(job.postedAt) : null,
        firstSeen: new Date(),
        lastSeen: new Date(),
        isActive: true,
      },
      update: {
        lastSeen: new Date(),
        isActive: true,
      },
    });

    if (res.firstSeen.getTime() === res.lastSeen.getTime()) created++;
    else updated++;
  }

   // 7 days htao pelam pel
  await prisma.job.updateMany({
    where: {
      lastSeen: {
        lt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      },
    },
    data: { isActive: false },
  });

  return NextResponse.json({
    fetched: allJobs.length,
    created,
    updated,
    activeJobs: await prisma.job.count({ where: { isActive: true } }),
    status: "synced",
  });
}