import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.module';
import { VehicleTypeModule } from './vehicle-type/vehicle-type.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { DriverModule } from './driver/driver.module';
import { RideModule } from './ride/ride.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    CityModule, 
    VehicleTypeModule, UserModule, DriverModule, RideModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
