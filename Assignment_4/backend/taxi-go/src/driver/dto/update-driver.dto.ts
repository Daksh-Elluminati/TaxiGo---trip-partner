import { PartialType } from '@nestjs/mapped-types';
import { CreateDriverDto } from './create-driver.dto';
import { ObjectId } from 'mongoose';

export class UpdateDriverDto extends PartialType(CreateDriverDto) {
    driverName?: String;
    driverEmail?: String;
    driverPhone?: String;
    driverPassword?: string;
    driverCity?: ObjectId;
    driverStatus?: Boolean;
    driverRideStatus?: Number;
}
