/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { DataSource } from "typeorm";

import { TYPES } from "../core/di/type";
import { repositoryModule } from "../core/di/modules/repositoryModule";
import { serviceModule } from "../core/di/modules/serviceModule";
import { controllerModule } from "../core/di/modules/controllerModule";
import { testDataSource } from "../core/db/testConnector";
import { getContainer } from "../core/di";
import { ExpressApp } from "../App";

jest.mock("../core/logger", () => {
    const mockLogger = {
        log: jest.fn(),
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
        debug: jest.fn(),
        verbose: jest.fn(),
    };

    return {
        httpLogger: mockLogger,
        cliLogger: mockLogger,
    };
});

jest.mock("@bull-monitor/express", () => {
    const express = require("express");
    return {
        BullMonitorExpress: jest.fn().mockImplementation(() => ({
            init: jest.fn().mockResolvedValue(undefined),
            router: express.Router(),
        })),
    };
});

jest.mock("ioredis", () => {
    return jest.fn().mockImplementation(() => ({
        quit: jest.fn().mockResolvedValue(Promise.resolve()),
        setex: jest.fn().mockResolvedValue(Promise.resolve()),
    }));
});

jest.mock("bullmq", () => {
    const mQueue = {
        add: jest.fn(),
        getJob: jest.fn(),
    };

    return {
        Queue: jest.fn(() => mQueue),
    };
});

jest.mock("@bull-monitor/root/dist/bullmq-adapter", () => {
    return {
        BullMQAdapter: jest.fn().mockImplementation(() => ({})),
    };
});

beforeAll(async () => {
    await testDataSource.initialize();

    const testContainer = getContainer();
    testContainer.bind<DataSource>(TYPES.TypeORMDataSource).toConstantValue(testDataSource);
    testContainer.load(repositoryModule);
    testContainer.load(serviceModule);
    testContainer.load(controllerModule);

    (global as any).app = new ExpressApp();
});

afterAll(async () => {
    await testDataSource.destroy();
    jest.clearAllMocks();
});

afterEach(async () => {
    const entities = testDataSource.entityMetadatas;
    for (const entity of entities) {
        const repository = testDataSource.getRepository(entity.name);
        await repository.clear();
    }
});
