import crypto from "crypto";

function makeHash(job: {
  ats: string;
  company: string;
  title: string;
  applyUrl: string;
}) {
  return crypto
    .createHash("sha1")
    .update(`${job.ats}|${job.company}|${job.title}|${job.applyUrl}`)
    .digest("hex");
}

export default makeHash;