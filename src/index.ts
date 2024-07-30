import "express-async-errors";
import express, { Express } from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import { initializeDatabase } from "./core/db";
import { cliLogger } from "./core/logger";
import { responseInterceptor } from "./core/middlewares/routerLog";
import { responseRendererMiddleware } from "./core/middlewares/responseRenderer";
import "./core/di";
import { router } from "./routers";
import { errorMiddleware } from "./core/middlewares/errorHandler";
import { RedisBackend, Cache } from "./core/cache";
import { swaggerDocs } from "./core/swagger";
import { env } from "./core/config";
import "./workers/connecction";
import { monitor } from "./workers/monitor";

const app: Express = express();

app.use(
    cors({
        credentials: true,
        origin: true, // Adjust the origin as needed
    }),
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(responseInterceptor);
app.use(responseRendererMiddleware);

app.get("/", (req, res) => {
    res.json({ data: "Chat Api Service" });
});

app.use("/api/v1", router);

app.use(errorMiddleware);

const server: http.Server = http.createServer(app);

const startServer = async () => {
    try {
        await initializeDatabase();
        cliLogger.info("Database initialized successfully");

        const redisBackend = new RedisBackend(env.REDIS_URL!);
        Cache.init(redisBackend);

        const PORT = env.PORT;
        swaggerDocs(app, Number(PORT));

        await monitor.init();
        app.use("/task-monitor", monitor.router);

        server.listen(8080, () => {
            cliLogger.info(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        cliLogger.error(`Failed to initialize database and start server: ${error}`);
    }
};

startServer();
