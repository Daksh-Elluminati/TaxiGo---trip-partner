import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RideService } from './ride.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles.decorator';
import { Role } from 'src/role.enum';

@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post('addRide')
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createRideDto: CreateRideDto) {
    return this.rideService.create(createRideDto);
  }

  @Get('getRideDetails')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  findAll() {
    return this.rideService.findAll();
  }

  @Get('getCurrentRideDetails')
  @Roles(Role.Admin, Role.User, Role.Driver)
  @UseGuards(AuthGuard, RolesGuard)
  findOne(@Param('id') id:string) {
    return this.rideService.findOne(id);
  }

  @Patch('editRide/:id')
  @Roles(Role.Admin, Role.User, Role.Driver)
  @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateRideDto: UpdateRideDto) {
    return this.rideService.update(id, updateRideDto);
  }
}
