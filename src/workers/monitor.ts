import { BullMonitorExpress } from "@bull-monitor/express";
import { BullMQAdapter } from "@bull-monitor/root/dist/bullmq-adapter";
import { Queue } from "bullmq";
import { redisConnection } from "./connecction";

export const monitor = new BullMonitorExpress({
    queues: [
        new BullMQAdapter(
            new Queue("appQueue", {
                connection: redisConnection,
            }),
        ),
    ],
    gqlIntrospection: true,
    metrics: {
        collectInterval: { hours: 1 },
        maxMetrics: 100,
        blacklist: ["1"],
    },
});
