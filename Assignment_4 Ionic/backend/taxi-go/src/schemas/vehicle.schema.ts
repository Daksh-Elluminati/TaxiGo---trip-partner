import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type vehicleTypeDocument = HydratedDocument<VehicleType>;

@Schema({timestamps: true})
export class VehicleType {
    @Prop({ required: true, unique: true, lowercase: true, trim: true })
    vehicleName: string;
}

export const VehicleTypeSchema = SchemaFactory.createForClass(VehicleType);