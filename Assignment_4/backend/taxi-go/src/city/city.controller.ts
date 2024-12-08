import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { ObjectId } from 'mongoose';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles.decorator';
import { Role } from 'src/role.enum';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post('AddNewCity')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createCityDto: CreateCityDto) {    
    return this.cityService.create(createCityDto);
  }

  @Get('GetCityDetails')
  findAll() {
    return this.cityService.findAll();
  }

 @Patch('editCity/:id')
 @Roles(Role.Admin)
 @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {    
    return this.cityService.update(id, updateCityDto);
  }
}
