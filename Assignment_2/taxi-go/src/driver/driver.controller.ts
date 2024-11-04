import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post('addDriver')
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driverService.create(createDriverDto);
  }

  @Get('getDriverDetails')
  findAll() {
    return this.driverService.findAll();
  }

  @Get('getDriverDetailsForRide/:id')
  findDriverList(@Param('id') id: string) {
    return this.driverService.findDriverList(id);
  }

  @Patch('editDriver/:id')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driverService.update(id, updateDriverDto);
  }

  @Delete('deleteDriver/:id')
  remove(@Param('id') id: string) {
    return this.driverService.remove(id);
  }
}