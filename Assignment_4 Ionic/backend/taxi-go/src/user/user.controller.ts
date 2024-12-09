import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles.decorator';
import { Role } from 'src/role.enum';

@Controller('user')
export class UserController {  
  constructor(private readonly userService: UserService) {}

  @Post('addUser')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('getUserDetails')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get('getUser')
  findOne(@Body('userEmail') email: String) {
    return this.userService.findOne(email);
  }

  @Patch('editUser/:id')
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {    
    return this.userService.update(id, updateUserDto);
  }

  @Delete('deleteUser/:id')
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
