import { IsNotEmpty, IsString, isString } from "class-validator";

export class CreateVehicleTypeDto {

    @IsString() @IsNotEmpty()
    vehicleName: string;
}
