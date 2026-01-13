

function clean(html: string) {
  return html?.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().slice(0, 400);
}
export const APIsCalls = {
    fetchGreenhouse : async function (slug: string, company: string) {
  try {
    const res = await fetch(
      `https://boards-api.greenhouse.io/v1/boards/${slug}/jobs`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];

    const data = await res.json();

    return data.jobs.slice(0, 10).map((job: any) => ({
      ats: "greenhouse",
      company,
      title: job.title,
      location: job.location?.name || "Remote / Unknown",
      description: clean(job.content),
      applyUrl: job.absolute_url,
      postedAt: null,
    }));
  } catch {
    return [];
  }
},

fetchLever : async function (slug: string, company: string) {
  try {
    const res = await fetch(
      `https://jobs.lever.co/v0/postings/${slug}`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];

    const data = await res.json();

    return data.slice(0, 10).map((job: any) => ({
      ats: "lever",
      company,
      title: job.text,
      location: job.categories?.location || "Remote / Unknown",
      description: job.descriptionPlain?.slice(0, 400),
      applyUrl: job.hostedUrl,
      postedAt: new Date(job.createdAt).toISOString(),
    }));
  } catch {
    return [];
  }
},

  fetchWorkable : async function (slug: string, company: string) {
  try {
    const res = await fetch(
      `https://${slug}.workable.com/api/v3/jobs?state=published`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];

    const data = await res.json();

    return data.results.slice(0, 10).map((job: any) => ({
      ats: "workable",
      company,
      title: job.title,
      location: job.remote ? "Remote" : job.location?.country || "Remote / Unknown",
      description: clean(job.description),
      applyUrl: `https://${slug}.workable.com/jobs/${job.id}`,
      postedAt: new Date(job.created_at).toISOString(),
    }));
  } catch {
    return [];
  }
}
}




