import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from 'src/schemas/city.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: City.name, schema: CitySchema}])
  ],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
