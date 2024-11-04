import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type rideDocument = HydratedDocument<Ride>;

@Schema({timestamps: true})
export class Ride{
    @Prop({
        type: mongoose.Schema.Types.ObjectId, 
        required: [true, 'Ride customer id is required.']
    })
    rideCustomerId : mongoose.Schema.Types.ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId, 
        required: [true, 'Ride city id is required.']
    })
    rideCityId : mongoose.Schema.Types.ObjectId;

    @Prop({
        type: String,
        required: [true, 'Pick up location is required to create a ride'],
    })
    ridePickUpLocation: String;

    @Prop({
        type: String,
        required: [true, 'Drop location is required to create a ride'],
    })
    rideDropLocation: String;

    @Prop({
        type: Date,
        required: [true, 'Ride date and time is required'],
    })
    rideDateTime: Date;

    @Prop({
        type: Number,
        default: 1
    })
    rideStatus: Number;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        default: null
    })
    rideDriverId: mongoose.Schema.Types.ObjectId;

    @Prop({
        type: Number,
        required: [true, 'Ride distance is required'],
    })
    rideDistance : Number;

    @Prop({
        type: Number,
        required: [true, 'Ride fare is required']
    })
    rideFare: Number;
}

export const RideSchema = SchemaFactory.createForClass(Ride);