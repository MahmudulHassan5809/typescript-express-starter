/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcrypt";
import { IUserRepository } from "../../../modules/users/repositories/IUserRepository";
import { AuthService } from "../../../modules/auth/service";
import { BadRequestException } from "../../../core/errors/exceptions";
import { User } from "../../../modules/users/models";
import { jest } from "@jest/globals";
import { Cache } from "../../../core/cache";

describe("AuthService", () => {
    let authService: AuthService;
    let userRepository: jest.Mocked<IUserRepository>;

    beforeEach(() => {
        userRepository = {
            get: jest.fn(),
            findAll: jest.fn(),
            createUser: jest.fn(),
        } as jest.Mocked<IUserRepository>;
        authService = new AuthService(userRepository);
    });

    it("should call createUser on the userRepository", async () => {
        const userDto = {
            email: "test@example.com",
            password: "password123",
            firstName: "John",
            lastName: "Doe",
        };

        const hashedPassword = "$2b$10$eIkFVsgQenpzp.v1Dmpwnu1sgnALgl2Z/uXgl3AusA7gt2pK2n1P6";
        const userWithAdditionalFields = {
            ...userDto,
            password: hashedPassword,
            id: 1,
            is_staff: false,
            is_superuser: false,
        };

        userRepository.createUser.mockResolvedValueOnce(userWithAdditionalFields);
        const result = await authService.register(userDto);

        expect(userRepository.createUser).toHaveBeenCalledWith(
            expect.objectContaining({
                email: userDto.email,
                firstName: userDto.firstName,
                lastName: userDto.lastName,
            }),
        );

        expect(result).toEqual({
            email: userDto.email,
            firstName: userDto.firstName,
            lastName: userDto.lastName,
            id: 1,
            is_staff: false,
            is_superuser: false,
        });
    });

    it("should throw BadRequestException if email already exists", async () => {
        const existingUser = new User("John", "Doe", "test@example.com", "hashedPassword123");
        userRepository.get.mockResolvedValueOnce(existingUser);

        const userDto = {
            firstName: "John",
            lastName: "Doe",
            email: "test@example.com",
            password: "password123",
        };

        await expect(authService.register(userDto)).rejects.toThrow(BadRequestException);
        expect(userRepository.get).toHaveBeenCalledWith({ where: { email: userDto.email } });
        expect(userRepository.createUser).not.toHaveBeenCalled();
    });

    it("should throw BadRequestException if user does not exist", async () => {
        userRepository.get.mockResolvedValueOnce(null);

        const userDto = {
            email: "test@example.com",
            password: "password123",
        };

        await expect(authService.login(userDto)).rejects.toThrow(BadRequestException);
        expect(userRepository.get).toHaveBeenCalledWith({ where: { email: userDto.email } });
    });

    it("should throw BadRequestException if password is invalid", async () => {
        const user = new User("John", "Doe", "test@example.com", "hashedPassword123");
        userRepository.get.mockResolvedValueOnce(user);
        const userDto = {
            email: "test@example.com",
            password: "wrongpassword",
        };

        await expect(authService.login(userDto)).rejects.toThrow(BadRequestException);
        expect(userRepository.get).toHaveBeenCalledWith({ where: { email: userDto.email } });
    });

    it("should return access and refresh tokens on successful login", async () => {
        jest.spyOn(Cache as any, "set").mockImplementation(async () => {});

        const hashedPassword = await bcrypt.hash("password123", 10);
        const user = new User("John", "Doe", "test@example.com", hashedPassword);
        user.id = 1;
        userRepository.get.mockResolvedValueOnce(user);

        const accessToken = "accessToken";
        const refreshToken = "refreshToken";

        jest.spyOn(authService as any, "generateToken").mockImplementation((user, type) =>
            type === "access" ? accessToken : refreshToken,
        );

        const result = await authService.login({
            email: "test@example.com",
            password: "password123",
        });

        expect(result).toEqual({ accessToken, refreshToken });
        expect(userRepository.get).toHaveBeenCalledWith({ where: { email: "test@example.com" } });
    });
});
