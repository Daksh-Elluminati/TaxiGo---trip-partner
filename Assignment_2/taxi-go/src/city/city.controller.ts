import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { ObjectId } from 'mongoose';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post('AddNewCity')
  create(@Body() createCityDto: CreateCityDto) {    
    return this.cityService.create(createCityDto);
  }

  @Get('GetCityDetails')
  findAll() {
    return this.cityService.findAll();
  }

 @Patch('editCity/:id')
  update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {    
    return this.cityService.update(id, updateCityDto);
  }
}
