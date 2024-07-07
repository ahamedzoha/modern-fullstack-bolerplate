import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Delete,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClerkAuthGuardGuard } from 'src/clerk-auth/clerk-auth.guard';
import { UsersService } from './users.service';
import { UserWebhookEvent } from '@clerk/clerk-sdk-node';
import { CreateUserWithRoleDto } from './dtos/create-user-w-role.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(ClerkAuthGuardGuard)
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('db-users')
  @UseGuards(ClerkAuthGuardGuard)
  getDbUsers() {
    return this.usersService.getDbUsers();
  }

  @Get(':id')
  @UseGuards(ClerkAuthGuardGuard)
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Delete(':id')
  @UseGuards(ClerkAuthGuardGuard)
  async deleteUser(@Param('id') id: string) {
    try {
      return await this.usersService.deleteUser(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else if (error instanceof InternalServerErrorException) {
        throw new InternalServerErrorException(error.message);
      } else {
        throw new InternalServerErrorException('An unexpected error occurred.');
      }
    }
  }

  @Post()
  @UseGuards(ClerkAuthGuardGuard)
  createUserWithRole(
    @Body()
    createUserWithRoleDto: CreateUserWithRoleDto,
  ) {
    return this.usersService.createUserWithRole(createUserWithRoleDto);
  }

  @Post('sync-user')
  syncUser(@Body() event: UserWebhookEvent) {
    return this.usersService.syncUser(event);
  }
}
