import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './permissions.entity';
import { CreatePermissionDto } from './dtos/create-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const permission = this.permissionsRepository.create(createPermissionDto);
    return this.permissionsRepository.save(permission);
  }

  findAll(): Promise<Permission[]> {
    return this.permissionsRepository.find();
  }

  findOne(id: string): Promise<Permission> {
    return this.permissionsRepository.findOne({ where: { id } });
  }

  async deletePermission(id: string) {
    return this.permissionsRepository.delete(id);
  }
}
