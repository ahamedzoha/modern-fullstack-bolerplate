import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

@Module({
  providers: [RolesService],
  controllers: [RolesController]
})
export class RolesModule {}
