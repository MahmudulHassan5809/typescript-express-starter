import express, { Express } from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import { initializeDatabase } from "./core/db";
import { logger } from "./core/logger";
import { responseInterceptor } from "./core/middlewares/routerLog";

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

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const server: http.Server = http.createServer(app);

const startServer = async () => {
    try {
        await initializeDatabase();
        logger.info("DB: ", { msg: "Database initialized successfully" });

        server.listen(8080, () => {
            logger.info("server start", { msg: `Server running on http://localhost:8080` });
        });
    } catch (error) {
        logger.error("DB Error", { msg: `Failed to initialize database and start server: ${error}` });
    }
};

startServer();
