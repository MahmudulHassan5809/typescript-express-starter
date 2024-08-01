import { Queue } from "bullmq";
import Redis from "ioredis";
import { ENV } from "../core/config";

const redisConnection = new Redis(ENV.REDIS_URL!, { maxRetriesPerRequest: null });

const appQueue = new Queue("appQueue", {
    connection: redisConnection,
});

export { appQueue, redisConnection };
