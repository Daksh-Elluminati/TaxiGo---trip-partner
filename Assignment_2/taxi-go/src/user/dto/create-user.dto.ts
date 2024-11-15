import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message: "User name can't be empty"})
    @IsString({message: "User name should be string only."})
    userName: String;

    @IsNotEmpty({message: "User email can't be empty."})
    @IsEmail()
    userEmail: String;

    @IsNotEmpty({message: "Driver phone number can't be empty."})
    @IsPhoneNumber()
    userPhone: String;
}
