import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles.decorator';
import { Role } from 'src/role.enum';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post('addDriver')
  create(@Body() createDriverDto: CreateDriverDto) {    
    return this.driverService.create(createDriverDto);
  }

  @Get('getDriverDetails')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  findAll() {
    return this.driverService.findAll();
  }

  @Get('getDriver')
  @Roles(Role.Admin, Role.Driver)
  findOne(@Body('driverEmail') email: String) {
    return this.driverService.findOne(email);
  }

  @Get('getDriverDetailsForRide/:id')
  @Roles(Role.Admin, Role.Driver, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  findDriverList(@Param('id') id: string) {
    return this.driverService.findDriverList(id);
  }

  @Patch('editDriver/:id')
  @Roles(Role.Admin, Role.Driver)
  @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driverService.update(id, updateDriverDto);
  }

  @Delete('deleteDriver/:id')
  @Roles(Role.Admin, Role.Driver)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.driverService.remove(id);
  }
}
