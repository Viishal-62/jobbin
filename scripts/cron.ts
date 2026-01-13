import cron from "node-cron"
import { fetchJobs } from "../lib/Jobsdata";

export const startCron = () => {
    cron.schedule("* * * * *", async() => {
        console.log("running a task every minute");
         
        await fetchJobs()


    });
}

 