import { init } from "./core/di";
import { ENV } from "./core/config";
import { cliLogger } from "./core/logger";

const port: number = Number(ENV.PORT);
cliLogger.info(`Starting server on port ${port}`);
init(port)
    .then(() => {
        cliLogger.info("Server started successfully");
    })
    .catch((err) => {
        cliLogger.debug("Failed to start the application:", err);
    });
