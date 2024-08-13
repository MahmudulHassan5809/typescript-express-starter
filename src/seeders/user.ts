import bcrypt from "bcrypt";
import { User } from "../modules/users/models";
import { AppDataSource } from "../core/db";

export class UserSeeder {
    public async run(): Promise<void> {
        await AppDataSource.initialize();
        const userRepository = AppDataSource.getRepository(User);
        const existingUsers = await userRepository.find();
        if (existingUsers.length > 0) {
            console.log("Users already exist. Deleting existing users.");
            await userRepository.clear();
        }
        const users = [
            new User("John", "Doe", "john.doe@example.com", "password123", false, false),
            new User("Jane", "Doe", "jane.doe@example.com", "password123", false, false),
            new User("Admin", "User", "admin@example.com", "admin123", true, true),
        ];

        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            const newUser = new User(
                user.firstName,
                user.lastName,
                user.email,
                hashedPassword,
                user.is_staff,
                user.is_superuser,
            );
            await userRepository.save(newUser);
        }
        console.log("User seeding completed.");
    }
}
