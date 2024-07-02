import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';

@Module({
  providers: [PermissionsService],
  controllers: [PermissionsController]
})
export class PermissionsModule {}
