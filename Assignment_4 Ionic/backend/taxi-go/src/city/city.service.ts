import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectModel } from '@nestjs/mongoose';
import { City } from 'src/schemas/city.schema';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class CityService {
  constructor(@InjectModel(City.name) private cityModel: Model<City>) {}

  async create(createCityDto: CreateCityDto) :Promise<Object> {
    try {
      const city = await new this.cityModel(createCityDto).save();
      return {city: city, msg: "City added successfully", status: "success"};
    } catch (error) {
      if (error.code && error.code == 11000) {
        throw new HttpException({msg: 'City is already registered', status: 'failed', error: error}, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException({msg: "Server error while adding city", status: "failed", error:error}, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findAll() : Promise<Object> {
    try {
      const cityList = await this.cityModel.find();
      if (cityList.length == 0) {
        throw new HttpException({msg: "No city to display", status: "failed"}, HttpStatus.NOT_FOUND);
      }
      return {cityList: cityList, msg: "City list found", status: "success"}
    } catch (error) {
      if (error.response && error instanceof HttpException) {
        throw new HttpException({msg: error.getResponse()['msg'], status: "failed", error:error}, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException({msg: "Internal server error", status: "failed", error: error}, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async update(id: string, updateCityDto: UpdateCityDto) : Promise <Object> {
    try {
      const updatedCity = await this.cityModel.findByIdAndUpdate(id, {$set: updateCityDto}, {new: true})
      if (!updatedCity) {
        throw new NotFoundException(`City with ID ${id} not found.`);
      }
      return {updatedCity: updatedCity, msg:"City update successful", status:"success"};
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException({msg: "City not found for update", status: "failed", error});
      } else {
        throw new HttpException({msg: "Internal server error", status: "failed", error}, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
