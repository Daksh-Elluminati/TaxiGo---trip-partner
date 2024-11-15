import { IsArray, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message: "User name can't be empty"})
    @IsString({message: "User name should be string only."})
    userName: String;

    @IsNotEmpty({message: "User email can't be empty."})
    @IsEmail()
    userEmail: string;

    @IsNotEmpty({message: "Driver phone number can't be empty."})
    @IsPhoneNumber()
    userPhone: string;

    @IsNotEmpty({message: "Driver phone number can't be empty."})
    @IsStrongPassword()
    userPassword: string;
}
