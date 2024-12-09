import { IsEmail, IsNotEmpty } from "class-validator";


export class SignInDto {
    @IsNotEmpty()
    @IsEmail()
    readonly userEmail: string;

    @IsNotEmpty()
    readonly role: string;

    @IsNotEmpty()
    readonly userPassword: string;
}