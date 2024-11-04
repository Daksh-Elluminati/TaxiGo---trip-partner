import { Injectable } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';

@Injectable()
export class RideService {
  create(createRideDto: CreateRideDto) {
    return 'This action adds a new ride';
  }

  findAll() {
    return `This action returns all ride`;
  }

  findOne(id: string) {
    return `This action returns a #${id} ride`;
  }

  update(id: string, updateRideDto: UpdateRideDto) {
    return `This action updates a #${id} ride`;
  }

  remove(id: string) {
    return `This action removes a #${id} ride`;
  }
}
