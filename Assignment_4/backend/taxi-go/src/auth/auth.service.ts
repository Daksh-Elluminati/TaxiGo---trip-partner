import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DriverService } from 'src/driver/driver.service';
import { Role } from 'src/role.enum';

@Injectable()
export class AuthService {

    constructor(
        private UserService: UserService,
        private DriverService: DriverService,
        private jwtService: JwtService
    ) {}

    async signIn(userEmail: string, userPassword: string, role: string) : Promise<Object> {
        if (role == Role.Driver) {
            const driver = await this.DriverService.findOne(userEmail);
            const isMatch: boolean = await bcrypt.compare(userPassword, driver.driverPassword);
            if (isMatch == true) {                
                const payload = { sub: driver.id, email: driver.driverEmail, roles: driver.userRoles};
                return { driver: driver, access_token: await this.jwtService.signAsync(payload)}
            }
            throw new UnauthorizedException();
        } else {
            const user = await this.UserService.findOne(userEmail);
            const isMatch: boolean = await bcrypt.compare(userPassword, user.userPassword);
            if (isMatch == true) {
                const payload = { sub: user.id, email: user.userEmail, roles: user.userRoles};
                return {
                    user: user,
                    access_token: await this.jwtService.signAsync(payload),
                }
            }
            throw new UnauthorizedException();
        }
    }
}
