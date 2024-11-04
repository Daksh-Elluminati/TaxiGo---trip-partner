import { Module } from '@nestjs/common';
import { VehicleTypeService } from './vehicle-type.service';
import { VehicleTypeController } from './vehicle-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleType, VehicleTypeSchema } from 'src/schemas/vehicle.schema';

@Module({
  imports: [MongooseModule.forFeature([{
    name: VehicleType.name,
    schema: VehicleTypeSchema
  }])],
  controllers: [VehicleTypeController],
  providers: [VehicleTypeService],
})
export class VehicleTypeModule {}