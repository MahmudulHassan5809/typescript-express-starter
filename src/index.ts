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

        const redisBackend = new RedisBackend("redis://default:foobared@localhost:6379/0");
        Cache.init(redisBackend);

        server.listen(8080, () => {
            cliLogger.info(`Server running on http://localhost:8080`);
        });
    } catch (error) {
        cliLogger.error(`Failed to initialize database and start server: ${error}`);
    }
};

startServer();
