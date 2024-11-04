import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {  
  constructor(private readonly userService: UserService) {}

  @Post('addUser')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('getUserDetails')
  findAll() {
    return this.userService.findAll();
  }

  @Patch('editUser/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {    
    return this.userService.update(id, updateUserDto);
  }

  @Delete('deleteUser/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
