import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ClerkAuthGuardGuard } from 'src/clerk-auth/clerk-auth.guard';
import { UsersService } from './users.service';
import { UserWebhookEvent } from '@clerk/clerk-sdk-node';

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
  syncUser(@Body() event: UserWebhookEvent) {
    return this.usersService.syncUser(event);
  }

  @Get('db-users')
  getDbUsers() {
    return this.usersService.getDbUsers();
  }
}
