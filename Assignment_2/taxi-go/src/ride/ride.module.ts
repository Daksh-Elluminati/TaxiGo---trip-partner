import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ride } from './entities/ride.entity';
import { RideSchema } from 'src/schemas/ride.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Ride.name, schema: RideSchema}])
  ],
  controllers: [RideController],
  providers: [RideService],
})
export class RideModule {}
