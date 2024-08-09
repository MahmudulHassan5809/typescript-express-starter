import { BullMonitorExpress } from "@bull-monitor/express";
import { BullMQAdapter } from "@bull-monitor/root/dist/bullmq-adapter";
import { Queue } from "bullmq";
import { redisConnection } from "./connection";

const appQueue = new Queue("appQueue", {
    connection: redisConnection,
});

const monitor = new BullMonitorExpress({
    queues: [new BullMQAdapter(appQueue)],
    gqlIntrospection: true,
    metrics: {
        collectInterval: { hours: 1 },
        maxMetrics: 100,
        blacklist: ["1"],
    },
});

const closeMonitor = async () => {
    // await appQueue.close();
    await redisConnection.quit();
};

export { monitor, closeMonitor };
