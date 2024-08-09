import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import { responseInterceptor } from "./core/middlewares/routerLog";
import { errorMiddleware } from "./core/middlewares/errorHandler";
import { responseRendererMiddleware } from "./core/middlewares/responseRenderer";
import { createRouter } from "./routers";
import { getContainer } from "./core/di";
import { RedisBackend, Cache } from "./core/cache";
import { ENV } from "./core/config";
import { swaggerDocs } from "./core/swagger";
import { monitor } from "./workers/monitor";
import { cliLogger } from "./core/logger";

export class ExpressApp {
    private app: Application;

    constructor() {
        this.app = express();
        this.useMiddleware();
        this.useRoutes();
        this.initCache();
        this.initSwagger();
        this.initTaskMonitor();
    }
    private async initTaskMonitor() {
        await monitor.init();
        this.app.use("/task-monitor", monitor.router);
    }
    private initSwagger() {
        swaggerDocs(this.app, Number(ENV.PORT));
    }
    private initCache() {
        const redisBackend = new RedisBackend(ENV.REDIS_URL!);
        Cache.init(redisBackend);
    }
    private useRoutes() {
        const container = getContainer();
        const router = createRouter(container);
        this.app.use("/api/v1", router);
        this.app.use(errorMiddleware);
    }
    private useMiddleware() {
        this.app.use(
            cors({
                credentials: true,
                origin: true,
            }),
        );

        this.app.use(compression());
        this.app.use(cookieParser());
        this.app.use(bodyParser.json());
        this.app.use(responseInterceptor);
        this.app.use(responseRendererMiddleware);
    }

    public getAppInstance(): Application {
        return this.app;
    }

    public listen(port: number): void {
        this.app.listen(port, () => {
            cliLogger.info(`Server listening on port ${port}`);
        });
    }
}
