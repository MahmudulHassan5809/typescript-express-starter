import winston from "winston";

const { combine, timestamp, json, printf, label, colorize } = winston.format;
const timestampFormat = "MMM-DD-YYYY HH:mm:ss";
const appVersion = "1.1";

export const httpLogger = winston.createLogger({
    format: combine(
        timestamp({ format: timestampFormat }),
        json(),
        printf(({ timestamp, level, message, ...data }) => {
            const response = {
                level,
                timestamp,
                message,
                data,
            };

            return JSON.stringify(response, null, 2);
        }),
    ),
    transports: [new winston.transports.Console()],
});

export const cliLogger = winston.createLogger({
    format: combine(
        label({ label: appVersion }),
        timestamp({ format: timestampFormat }),
        colorize({ level: true }),
        printf(({ level, message, label, timestamp }) => `[${timestamp}] ${level} (${label}): ${message}`),
    ),
    transports: [new winston.transports.Console()],
});
