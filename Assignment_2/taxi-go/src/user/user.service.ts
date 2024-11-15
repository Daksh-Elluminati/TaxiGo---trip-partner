import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) : Promise<Object> {
    try {
      const user = await new this.userModel(createUserDto).save();
      return {user, msg: "User added successfully", status: "success"};
    } catch (error) {
      if (error.errorResponse.keyValue && error.errorResponse.keyValue.userEmail) {
        throw new HttpException({msg: 'User email is already registered.', status: "failed", error}, HttpStatus.BAD_REQUEST);
      } else if (error.errorResponse.keyValue && error.errorResponse.keyValue.userPhone) {
        throw new HttpException({msg: 'User phone number is already registered.', status: "failed", error}, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException({error, msg: 'User phone number is already registered.', status: "failed" }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findAll() : Promise<Object> {
    try {
      const userList = await this.userModel.find();
      if (userList.length == 0) {
        throw new NotFoundException({msg: "User list is empty", status: "failed"});
      }
      return{userList, msg: "User list found", status: "success"};
    } catch (error) {
      if (error.response && error instanceof NotFoundException) {
        throw new HttpException({msg: error.getResponse()['msg'], status: "failed", error:error}, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException({msg: "Internal server error while getting driver details", status: "failed", error: error}, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) : Promise<Object> {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(id, {$set: updateUserDto}, {new: true});
      if (!updatedUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return {updatedUser, msg: "User updated successfully.", status: "success"}
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException({msg: "User update failed.", status: "failed", error});
      } else {
        throw new HttpException({msg: "Internal server error while updating user", status: "failed", error}, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async remove(id: string) : Promise <Object> {
    try {
      const user = await this.userModel.findByIdAndDelete(id);
      if (!user) {
        throw new NotFoundException({msg: "User not found.", status: "failed"})
      }
      return {user, msg: "Driver Deleted successfully", status: "success"};
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException({msg: error.getResponse()['msg'], status: "failed", error:error}, HttpStatus.NOT_FOUND);
      } else{
        throw new HttpException({msg: "Internal server error while delteing driver", status: "failed", error}, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
