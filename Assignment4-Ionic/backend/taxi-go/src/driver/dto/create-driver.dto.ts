import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";
import { isObjectIdOrHexString, isValidObjectId, ObjectId } from "mongoose";

export class CreateDriverDto {
    @IsNotEmpty({message: "Driver name can't be empty"})
    @IsString({message: "Driver name should be string only."})
    driverName: String;

    @IsNotEmpty({message: "Driver email can't be empty."})
    @IsEmail()
    driverEmail: String;

    @IsNotEmpty({message: "Driver phone number can't be empty."})
    @IsPhoneNumber()
    driverPhone: String;

    @IsNotEmpty({message: "Driver city can't be empty."})
    driverCity: ObjectId;

    @IsNotEmpty({message: "Driver Password can't be empty."})
    @IsStrongPassword()
    driverPassword: string;

    @IsNotEmpty({message: "Driver status can't be empty."})
    @IsBoolean()
    driverStatus: Boolean;

    @IsNumber()
    driverRideStatus: Number;
}
