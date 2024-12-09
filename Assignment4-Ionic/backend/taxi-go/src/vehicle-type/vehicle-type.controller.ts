import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VehicleTypeService } from './vehicle-type.service';
import { CreateVehicleTypeDto } from './dto/create-vehicle-type.dto';
import { UpdateVehicleTypeDto } from './dto/update-vehicle-type.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles.decorator';
import { Role } from 'src/role.enum';

@Controller('vehicle-type')
export class VehicleTypeController {
  constructor(private readonly vehicleTypeService: VehicleTypeService) {}

  @Post('addVehicle')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createVehicleTypeDto: CreateVehicleTypeDto) {  
    return this.vehicleTypeService.create(createVehicleTypeDto);
  }

  @Get('getVehicleDetails')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  findAll() {
    return this.vehicleTypeService.findAll();
  }

  @Patch('editVehicle/:id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateVehicleTypeDto: UpdateVehicleTypeDto) {
    return this.vehicleTypeService.update(id, updateVehicleTypeDto);
  }
}
