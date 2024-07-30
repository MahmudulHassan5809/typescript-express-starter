// src/swagger.ts
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import yaml from "yamljs";
import path from "path";

const swaggerDocument = yaml.load(path.resolve(__dirname, "./swagger.yaml"));

const swaggerDocs = (app: Express, PORT: number) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.get("/api-docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerDocument);
    });

    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
};

export { swaggerDocs };
