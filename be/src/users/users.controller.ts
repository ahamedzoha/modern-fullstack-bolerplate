import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ClerkAuthGuardGuard } from 'src/clerk-auth/clerk-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @UseGuards(ClerkAuthGuardGuard)
  getUsers() {
    return this.usersService.getUsers();
  }
  // Get particular user
  @Get('user')
  getUser(@Query('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Post('sync-user')
  syncUser() {
    return 'sync user';
  }
}
