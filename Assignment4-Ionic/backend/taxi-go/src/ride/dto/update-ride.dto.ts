import { PartialType } from '@nestjs/mapped-types';
import { CreateRideDto } from './create-ride.dto';
import { Schema } from 'mongoose';

export class UpdateRideDto extends PartialType(CreateRideDto) {
    rideCustomerId?: Schema.Types.ObjectId;
    rideCityId?: Schema.Types.ObjectId;
    ridePickUpLocation?: String;
    rideDropLocation?: String;
    rideDateTime?: Date;
    rideStatus?: Number;
    rideDriverId?: Schema.Types.ObjectId;
    rideDistance?: Number;
    rideFare?: Number;
}
