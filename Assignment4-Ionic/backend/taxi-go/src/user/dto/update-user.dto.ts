import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    userName?: String;
    userEmail?: string;
    userPhone?: string;
    userPassword?: string;
    userRoles?: String;
}
