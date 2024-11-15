import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post('AddNewCity')
  @UseGuards(AuthGuard)
  create(@Body() createCityDto: CreateCityDto) {    
    return this.cityService.create(createCityDto);
  }

  @Get('GetCityDetails')
  @UseGuards(AuthGuard)
  findAll() {
    return this.cityService.findAll();
  }

 @Patch('editCity/:id')
 @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {    
    return this.cityService.update(id, updateCityDto);
  }
}
