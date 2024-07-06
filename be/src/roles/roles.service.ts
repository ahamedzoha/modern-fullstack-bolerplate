import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './roles.entity';
import { CreateRoleDto } from './dtos/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this.rolesRepository.create(createRoleDto);
    return this.rolesRepository.save(role);
  }

  async getRoles() {
    return this.rolesRepository.find();
  }

  async getRoleById(id: string) {
    return this.rolesRepository.find({ where: { id } });
  }

  async deleteRole(id: string) {
    return this.rolesRepository.delete(id);
  }

  findOne(id: string): Promise<Role> {
    return this.rolesRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
  }
  findAll(): Promise<Role[]> {
    return this.rolesRepository.find({ relations: ['permissions'] });
  }
}
