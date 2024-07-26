import Redis from "ioredis";

export class RedisBackend {
    private redisClient: Redis;

    constructor(url: string) {
        this.redisClient = new Redis(url);
    }

    async get(key: string): Promise<string | null> {
        return await this.redisClient.get(key);
    }

    async hGet(key: string): Promise<Record<string, string>> {
        return await this.redisClient.hgetall(key);
    }

    async getDelete(key: string): Promise<string | null> {
        const pipeline = this.redisClient.pipeline();
        pipeline.get(key);
        pipeline.del(key);
        const result = await pipeline.exec();
        return result ? (result[0][1] as string) : null;
    }

    async set(key: string, value: string, expireTime?: number): Promise<void> {
        if (expireTime) {
            await this.redisClient.setex(key, expireTime, value);
        } else {
            await this.redisClient.set(key, value);
        }
    }

    async delete(key: string): Promise<void> {
        await this.redisClient.del(key);
    }
}
