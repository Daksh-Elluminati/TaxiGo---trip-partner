import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type userDocument = HydratedDocument<User>;

@Schema({timestamps: true})
export class User{
    @Prop({
        type: String,
        required: [true, 'User name is required'],
        lowercase: true,
        trim: true
    })
    userName: String;

    @Prop({
        type: String,
        required: [true, 'User email id is required'],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function(value) {
              return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
            },
            message: () => `Please enter a valid email!`
        }
    })
    userEmail: String;

    @Prop({
        type: String,
        required: [true, 'Phone number is required'],
        unique: true,
        validate: {
            validator: function(value) {
              return /^(\+?\d{1,3}[- ]?)?\d{10}$/.test(value);
            },
            message: () => `Please enter a valid phone number!`
        }
    })
    userPhone: String;
}

export const UserSchema = SchemaFactory.createForClass(User);