module.exports = {
    setupFilesAfterEnv: ["<rootDir>/src/tests/jest.setup.ts"],
    testMatch: ["**/src/tests/unit/**/*.test.ts", "**/src/tests/integration/**/*.test.ts"],
    preset: "ts-jest",
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    clearMocks: true,
    detectOpenHandles: true,
    verbose: false,
    cache: false,
};
