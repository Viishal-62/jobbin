import { NextRequest, NextResponse } from "next/server";
import  {prisma} from "@/lib/db"
 
export async function GET() {
  const jobs = await prisma.job.findMany({
    orderBy: {
      lastSeen: "desc",
    },
  });

  return NextResponse.json({
    total: jobs.length,
    jobs,
  });
}