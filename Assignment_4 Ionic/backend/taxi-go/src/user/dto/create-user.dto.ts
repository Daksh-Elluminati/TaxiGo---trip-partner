import { IsArray, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message: "User name can't be empty"})
    @IsString({message: "User name should be string only."})
    userName: String;

    @IsNotEmpty({message: "User email can't be empty."})
    @IsEmail()
    userEmail: string;

    @IsNotEmpty({message: "User phone number can't be empty."})
    @IsPhoneNumber()
    userPhone: string;

    @IsNotEmpty({message: "User password can't be empty."})
    @IsStrongPassword()
    userPassword: string;

    // @IsArray({ message: "User roles should be an array of strings." })
    // @IsString({ each: true, message: "Each user role should be a string." })
    // userRoles: String;
}
