import express, { Express } from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import { initializeDatabase } from "./core/db";

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

const server: http.Server = http.createServer(app);

const startServer = async () => {
    try {
        await initializeDatabase();
        console.log("Database initialized successfully");

        server.listen(8080, () => {
            console.log(`Server running on http://localhost:8080`);
        });
    } catch (error) {
        console.error("Failed to initialize database and start server:", error);
    }
};

startServer();
