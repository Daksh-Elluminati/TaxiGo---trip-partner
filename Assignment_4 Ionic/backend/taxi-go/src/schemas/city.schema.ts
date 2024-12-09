import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type cityDocument = HydratedDocument<City>;

@Schema({timestamps: true})
export class City {
    @Prop({ type: String, required: true, unique: true, trim: true})
    cityName: String;

    @Prop({type: String, required: true, trim: true})
    countryName: String;
}

export const CitySchema = SchemaFactory.createForClass(City);