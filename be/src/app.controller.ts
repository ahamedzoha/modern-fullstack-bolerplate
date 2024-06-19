import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ClerkAuthGuardGuard } from './clerk-auth/clerk-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/users')
  @UseGuards(ClerkAuthGuardGuard)
  getUsers() {
    return this.appService.getUsers();
  }
}
