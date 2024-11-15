import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post('addDriver')
  @UseGuards(AuthGuard)
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driverService.create(createDriverDto);
  }

  @Get('getDriverDetails')
  @UseGuards(AuthGuard)
  findAll() {
    return this.driverService.findAll();
  }

  @Get('getDriverDetailsForRide/:id')
  @UseGuards(AuthGuard)
  findDriverList(@Param('id') id: string) {
    return this.driverService.findDriverList(id);
  }

  @Patch('editDriver/:id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driverService.update(id, updateDriverDto);
  }

  @Delete('deleteDriver/:id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.driverService.remove(id);
  }
}
