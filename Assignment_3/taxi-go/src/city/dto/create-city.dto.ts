import { isNotEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateCityDto {
    @IsNotEmpty({message: "City name is required field"})
    @IsString({message: "City name should be string only."})
    cityName: String;

    @IsNotEmpty({message: "Country name is required field."})
    @IsString({message: "Country name should be string only."})
    countryName: String
}
