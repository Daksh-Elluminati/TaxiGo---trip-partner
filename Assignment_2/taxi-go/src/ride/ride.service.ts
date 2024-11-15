import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Ride } from './entities/ride.entity';
import { Model } from 'mongoose';

@Injectable()
export class RideService {

  constructor(@InjectModel(Ride.name) private rideModel: Model<Ride>) {}

  async create(createRideDto: CreateRideDto) : Promise<Object> {
    try {
      const ride = await new this.rideModel(createRideDto).save();
      return {ride, msg: "User added successfully", status: "success"};
    } catch (error) {
      throw new HttpException({error, msg: "Internal server error while creating new ride.", status: "failed" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() : Promise<Object> {
    try {
      const rideList = await this.rideModel.find();
      if (rideList.length == 0) {
        throw new NotFoundException({msg: "Ride list is empty", status: "failed"});
      }
      return{rideList, msg: "Ride list found", status: "success"};
    } catch (error) {
      if (error.response && error instanceof NotFoundException) {
        throw new HttpException({msg: error.getResponse()['msg'], status: "failed", error:error}, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException({msg: "Internal server error while getting ride details", status: "failed", error: error}, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async update(id: string, updateRideDto: UpdateRideDto) {
    try {
      const updatedRide = await this.rideModel.findByIdAndUpdate(id, {$set: updateRideDto}, {new: true});
      if (!updatedRide) {
        throw new NotFoundException(`Ride with ID ${id} not found`);
      }
      return {updatedRide, msg: "Ride updated successfully.", status: "success"}
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException({msg: "Ride update failed.", status: "failed", error});
      } else {
        throw new HttpException({msg: "Internal server error while updating ride", status: "failed", error}, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
