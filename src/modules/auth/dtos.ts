import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export class UserLoginDto {
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    public password: string;
}

export class UserRegisterDto {
    @IsNotEmpty()
    @IsString()
    public firstName: string;

    @IsNotEmpty()
    @IsString()
    public lastName: string;

    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    public password: string;
}
