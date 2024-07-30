import { Queue } from "bullmq";
import Redis from "ioredis";
import { env } from "../core/config";

const redisConnection = new Redis(env.REDIS_URL!, { maxRetriesPerRequest: null });

const appQueue = new Queue("appQueue", {
    connection: redisConnection,
});

export { appQueue, redisConnection };
