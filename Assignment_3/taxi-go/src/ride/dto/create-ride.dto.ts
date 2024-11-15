import { IsNotEmpty, IsNumber, isNumber, IsObject, IsOptional, IsString } from "class-validator";
import mongoose, { isObjectIdOrHexString } from "mongoose";

export class CreateRideDto {

    @IsNotEmpty({message: "Ride customer id is required."})
    rideCustomerId : mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({message: "Ride city id is required."})
    rideCityId : mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({message: "Pick up location is required to create a ride"})
    @IsString({message: "Pickup location can be string only."})
    ridePickUpLocation: String;

    @IsNotEmpty({message: "Drop location is required to create a ride."})
    @IsString({message: "Drop off location can be string only."})
    rideDropLocation: String;

    @IsNotEmpty({message: "Ride date and time is required."})
    rideDateTime: Date;

    @IsNumber()
    rideStatus: Number;

    @IsOptional()
    rideDriverId: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({message: "Ride distance is required."})
    @IsNumber()
    rideDistance : Number;

    @IsNotEmpty({message: "Ride fare is required."})
    @IsNumber()
    rideFare: Number;
}
