/* eslint-disable @typescript-eslint/no-explicit-any */
import { RedisBackend } from "./redisBackend";
import { cliLogger } from "../logger";
import { stringify, parse } from "flatted";

export class CacheManager {
    private backend: RedisBackend | null = null;

    init(backend: RedisBackend): void {
        this.backend = backend;
    }

    private getBackend(): RedisBackend {
        if (!this.backend) {
            throw new Error("Cache backend is not initialized.");
        }
        return this.backend;
    }

    async get<T>(key: string): Promise<T | null> {
        try {
            const data = await this.getBackend().get(key);
            return data ? parse(data) : null;
        } catch (error) {
            cliLogger.error("Error getting cache data:", error);
            return null;
        }
    }

    async hGet<T>(key: string): Promise<Record<string, T>> {
        try {
            const data = await this.getBackend().hGet(key);
            const result: Record<string, T> = {};
            for (const [k, v] of Object.entries(data)) {
                result[k] = parse(v);
            }
            return result;
        } catch (error) {
            cliLogger.error("Error getting hash cache data:", error);
            return {};
        }
    }

    async set<T>(key: string, value: T, ttl?: number): Promise<void> {
        try {
            await this.getBackend().set(key, stringify(value), ttl);
        } catch (error) {
            cliLogger.error("Error setting cache data:", error);
        }
    }

    async delete(key: string): Promise<void> {
        try {
            await this.getBackend().delete(key);
        } catch (error) {
            cliLogger.error("Error deleting cache data:", error);
        }
    }

    async getDelete<T>(key: string): Promise<T | null> {
        try {
            const data = await this.getBackend().getDelete(key);
            return data ? parse(data) : null;
        } catch (error) {
            cliLogger.error("Error getting and deleting cache data:", error);
            return null;
        }
    }

    async updateCache<T>(key: string, updatedValue: T): Promise<void> {
        try {
            await this.set(key, updatedValue);
        } catch (error) {
            cliLogger.error("Error updating cache data:", error);
        }
    }

    Cacheable(key: string, ttl?: number) {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            const originalMethod = descriptor.value;
            descriptor.value = async function (...args: any[]) {
                const cacheManager = CacheManager.instance;
                const cacheKey = key;
                const cachedResult = await cacheManager.get(cacheKey);

                if (cachedResult !== null) {
                    args[1].json(cachedResult);
                    return;
                }
                const res = args[1];
                const originalJson = res.json.bind(res);
                res.json = (body: any) => {
                    cacheManager.set(cacheKey, body, ttl);
                    return originalJson(body);
                };
                await originalMethod.apply(this, args);
            };

            return descriptor;
        };
    }

    private static _instance: CacheManager;

    private constructor() {}

    public static get instance(): CacheManager {
        if (!this._instance) {
            this._instance = new CacheManager();
        }
        return this._instance;
    }
}

export const Cache = CacheManager.instance;
