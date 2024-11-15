import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleTypeDto } from './dto/create-vehicle-type.dto';
import { UpdateVehicleTypeDto } from './dto/update-vehicle-type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { VehicleType } from 'src/schemas/vehicle.schema';
import { Model } from 'mongoose';

@Injectable()
export class VehicleTypeService {
  constructor(@InjectModel(VehicleType.name) private vehicleModel: Model<VehicleType>) {}

  // Create a new vehicle type
  async create(createVehicleTypeDto: CreateVehicleTypeDto) : Promise<Object> {
    try {
      // Create a new instance of vehicle type and save it
      const vehicleType = await new this.vehicleModel(createVehicleTypeDto).save();
      return {vehicleType: vehicleType, msg: "Vehicle added successfully", status: "success" };
    } catch (error) {
      // If error of duplication send error for duplication or else send general server error message
      if (error.code && error.code == 11000) {
        throw new HttpException({msg: 'Vehicle type is already registered', status: 'failed', error: error}, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException({msg: "Server error while adding vehicle", status: "failed", error:error}, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  // Find all the vehicle type records
  async findAll() :Promise<Object> {
    try {
      // Get the vehicle types  array 
      const vehicleTypes = await this.vehicleModel.find().exec();
      // If array length for vehicle type is 0 throw new error
      if (vehicleTypes.length == 0) {
        throw new HttpException({msg: "No vehicle types to display", status: "failed"}, HttpStatus.NOT_FOUND);
      }
      return {msg: "vehicle types found successfully", status: "success", vehicleTypes: vehicleTypes};
    } catch (error) {      
      if (error.response && error instanceof HttpException) {
        throw new HttpException({msg: error.getResponse()['msg'], status: "failed", error:error}, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException({msg: "Internal server error", status: "failed", error: error}, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async update(id: string, updateVehicleTypeDto: UpdateVehicleTypeDto) : Promise<Object> {
    try {
      const updatedVehicleType = await this.vehicleModel.findByIdAndUpdate(id, {$set: updateVehicleTypeDto}, {new:true});
      if (!updatedVehicleType) {
        throw new NotFoundException(`Vehicle type with ID ${id} not found.`);
      }
      return {updatedVehicleType, msg: "Vehicle Type update successful", status: "success"};
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException({msg: "Vehicle type not found for update", status: "failed", error});
      } else {
        throw new HttpException({msg: "Internal server error", status: "failed", error}, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
