import { Worker, Job } from "bullmq";
import { redisConnection } from "../connecction";
const worker = new Worker(
    "appQueue",
    async (job: Job) => {
        if (job.name === "sendEmail") {
            console.log("Processing job: sendEmail", job.data);
            console.log("Email send");
        }
    },
    { connection: redisConnection },
);

worker.on("completed", (job) => {
    console.log(`Job ${job.id} has been completed`);
});

worker.on("failed", (job, err) => {
    console.error(`Job ${job} has failed with error ${err.message}`);
});

worker.on("error", (err) => {
    console.error("Worker error:", err);
});
