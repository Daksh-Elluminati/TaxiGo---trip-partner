import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Driver } from 'src/schemas/driver.schema';
import { Model, ObjectId, Types } from 'mongoose';

@Injectable()
export class DriverService {

  constructor(@InjectModel(Driver.name) private DriverModel: Model<Driver> ) {}

  async create(createDriverDto: CreateDriverDto) :Promise<Object> {
    try {
      const driver = await new this.DriverModel(createDriverDto).save();
      return {driver, msg: "Driver added successfully", status: "success"};
    } catch (error) {
      if (error.errorResponse.keyValue && error.errorResponse.keyValue.driverEmail) {
        throw new HttpException({msg: 'Driver email is already registered.', error}, HttpStatus.BAD_REQUEST);
      } else if (error.errorResponse.keyValue && error.errorResponse.keyValue.driverPhone) {
        throw new HttpException({msg: 'Driver phone number is already registered.', error}, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException({error }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  /**
   * This function uses aggregation to find all drivers with their associated city
   * information and handles exceptions accordingly.
   * @returns The `findAll` function returns a Promise that resolves to an Object. The Object contains
   * the `driverList` which is an array of drivers with city information, a message indicating "Driver
   * list found", and a status of "success". If the `driverList` is empty, a NotFoundException is
   * thrown with a message "Driver list is empty" and a status of "failed". If any other error
   */
  async findAll() : Promise<Object> {
    try {
      const pipeline = [
        {
          $lookup: {
            from:'cities',
            localField: 'driverCity',
            foreignField: '_id',
            as: 'city'
          }
        },
        {
          $unwind: '$city'
        }
      ]
      const driverList = await this.DriverModel.aggregate(pipeline).exec();
      if (driverList.length == 0) {
        throw new NotFoundException({msg: "Driver list is empty", status: "failed"});
      }
      return {driverList, msg: "Driver list found", status: "success"};
    } catch (error) {
      if (error.response && error instanceof NotFoundException) {
        throw new HttpException({msg: error.getResponse()['msg'], status: "failed", error:error}, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException({msg: "Internal server error while getting driver details", status: "failed", error: error}, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findDriverList(cityId: string) : Promise <Object> {
    try {
      let pipeline = [
        {
          $match: {
            $and: [
              {driverStatus: true},
              {driverRideStatus: 0},
              {driverCity: new Types.ObjectId(cityId)}
            ]
          }
        }
      ]

      let driverList = await this.DriverModel.aggregate(pipeline).exec();

      if (!driverList) {
        throw new NotFoundException({msg: "No driver to display.", status: "failed"});
      }
      return {driverList, msg: "Driver found", status: "success"};
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException({msg: "Driver not found.", status: "failed", error});
      } else {
        throw new HttpException({msg: "Internal server error while updating driver", status: "failed", error}, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async update(id: string, updateDriverDto: UpdateDriverDto) {
    try {
      const updateDriver = await this.DriverModel.findByIdAndUpdate(id, {$set: updateDriverDto}, {new: true});
      if (!updateDriver) {
        throw new NotFoundException(`Driver with ID ${id} not found`);
      }
      return {updateDriver, msg: "Driver updated successfully.", status: "success"};
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException({msg: "Driver update failed.", status: "failed", error});
      } else {
        throw new HttpException({msg: "Internal server error while updating driver", status: "failed", error}, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async remove(id: string) : Promise<Object>{
    try {
      const driver = await this.DriverModel.findByIdAndDelete(id);
      if (!driver) {
        throw new NotFoundException({msg: "Driver not found.", status: "failed"})
      }
      return {driver, msg: "Driver Deleted successfully", status: "success"};
    } catch (error) {
      throw new HttpException({msg: "Internal server error while delteing driver", status: "failed", error}, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
