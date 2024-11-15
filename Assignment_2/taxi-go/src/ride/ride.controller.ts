import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RideService } from './ride.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post('addRide')
  @UseGuards(AuthGuard)
  create(@Body() createRideDto: CreateRideDto) {
    return this.rideService.create(createRideDto);
  }

  @Get('getRideDetails')
  @UseGuards(AuthGuard)
  findAll() {
    return this.rideService.findAll();
  }

  @Get('getCurrentRideDetails')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id:string) {
    return this.rideService.findOne(id);
  }

  @Patch('editRide/:id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateRideDto: UpdateRideDto) {
    return this.rideService.update(id, updateRideDto);
  }
}
