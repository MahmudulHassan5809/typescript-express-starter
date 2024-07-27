import { UserSeeder } from "./user";

async function runSeeders() {
    try {
        const userSeeder = new UserSeeder();
        await userSeeder.run();
        console.log("All seeders have been executed successfully.");
    } catch (error) {
        console.error("Error running seeders:", error);
    }
}

runSeeders();
