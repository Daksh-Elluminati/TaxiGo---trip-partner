import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { Role } from "src/role.enum";

export type driverDocument = HydratedDocument<Driver>;

@Schema({timestamps: true})
export class Driver {
    @Prop({
        type: String, 
        required: [true, 'Driver name is required'], 
        lowercase: true, 
        trim: true})
    driverName: String;

    @Prop({
        type: String, 
        required: [true, 'Driver email id is required'], 
        trim: true, 
        unique: true, 
        lowercase: true,
        validate: {
            validator: function(value) {
              return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
            },
            message: () => `Please enter a valid email!`
          }})
    driverEmail: String;

    @Prop({
        type: String, 
        required: [true, 'Phone number is required'], 
        unique: true, 
        validate: {
            validator: function(value) {
              return /^(\+?\d{1,3}[- ]?)?\d{10}$/.test(value);
            },
            message: () => `Please enter a valid phone number!`
        }})
    driverPhone: String;

    @Prop() 
    driverPassword: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Driver city is required'],
        trim: true
    })
    driverCity: ObjectId;

    @Prop({
        type: Boolean,
        default: false,
        required: true
    })
    driverStatus: Boolean;

    @Prop({
        type: Number, 
        default: 0})
    driverRideStatus: Number;

    @Prop({type: [String], enum: Role})
    userRoles: string[];
}

export const DriverSchema = SchemaFactory.createForClass(Driver);