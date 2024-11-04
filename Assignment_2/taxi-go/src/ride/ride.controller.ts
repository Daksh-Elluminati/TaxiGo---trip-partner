import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RideService } from './ride.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';

@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post('addRide')
  create(@Body() createRideDto: CreateRideDto) {
    return this.rideService.create(createRideDto);
  }

  @Get('getRideDetails')
  findAll() {
    return this.rideService.findAll();
  }

  @Patch('editRide/:id')
  update(@Param('id') id: string, @Body() updateRideDto: UpdateRideDto) {
    return this.rideService.update(id, updateRideDto);
  }
}
