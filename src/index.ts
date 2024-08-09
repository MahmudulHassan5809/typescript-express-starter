import { init } from "./core/di";
import "./core/config";
import { cliLogger } from "./core/logger";

const port: number = Number(process.env.PORT);
init(port)
    .then(() => {
        cliLogger.info("Server started successfully");
    })
    .catch((err) => {
        cliLogger.error("Failed to start the application:", err);
    });
