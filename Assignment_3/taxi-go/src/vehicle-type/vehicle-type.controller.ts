import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VehicleTypeService } from './vehicle-type.service';
import { CreateVehicleTypeDto } from './dto/create-vehicle-type.dto';
import { UpdateVehicleTypeDto } from './dto/update-vehicle-type.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('vehicle-type')
export class VehicleTypeController {
  constructor(private readonly vehicleTypeService: VehicleTypeService) {}

  @Post('addVehicle')
  @UseGuards(AuthGuard)
  create(@Body() createVehicleTypeDto: CreateVehicleTypeDto) {  
    return this.vehicleTypeService.create(createVehicleTypeDto);
  }

  @Get('getVehicleDetails')
  @UseGuards(AuthGuard)
  findAll() {
    return this.vehicleTypeService.findAll();
  }

  @Patch('editVehicle/:id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateVehicleTypeDto: UpdateVehicleTypeDto) {
    return this.vehicleTypeService.update(id, updateVehicleTypeDto);
  }
}
