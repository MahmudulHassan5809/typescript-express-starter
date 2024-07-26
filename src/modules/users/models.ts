import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    is_staff: boolean;

    @Column()
    is_superuser: boolean;

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        is_staff: boolean = false,
        is_superuser: boolean = false,
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.is_staff = is_staff;
        this.is_superuser = is_superuser;
    }
}
