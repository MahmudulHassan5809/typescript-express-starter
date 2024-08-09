/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "supertest";
import bcrypt from "bcrypt";
import { User } from "../../../modules/users/models";
import { testDataSource } from "../../../core/db/testConnector";

describe("Auth Integration Tests", () => {
    it("should return access and refresh tokens on successful login", async () => {
        const hashedPassword = await bcrypt.hash("password123", 10);
        const userRepository = testDataSource.getRepository(User);
        const user = userRepository.create({
            firstName: "John",
            lastName: "Doe",
            email: "test@example.com",
            password: hashedPassword,
        });
        await userRepository.save(user);

        const response = await request((global as any).app.getAppInstance())
            .post("/api/v1/auth/login")
            .send({
                email: "test@example.com",
                password: "password123",
            });

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty("accessToken");
        expect(response.body.data).toHaveProperty("refreshToken");
    });
});
