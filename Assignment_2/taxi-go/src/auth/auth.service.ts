import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private UserService: UserService,
        private jwtService: JwtService
    ) {}

    async signIn(userEmail: string, userPassword: string) : Promise<{ access_token: string}> {
        const user = await this.UserService.findOne(userEmail);
        const isMatch: boolean = await bcrypt.compare(userPassword, user.userPassword);
        
        if (isMatch == true) {
            const payload = { sub: user.id, email: user.userEmail};
            return {
                access_token: await this.jwtService.signAsync(payload),
            }
        }
        throw new UnauthorizedException();
    }
}
