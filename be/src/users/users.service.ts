import { clerkClient, UserWebhookEvent } from '@clerk/clerk-sdk-node';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { In, Repository } from 'typeorm';
import { Role } from 'src/roles/roles.entity';
import { handleClerkError } from 'src/global/utils/handle-clerk-error.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  async createUserWithRole(params: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleIds: string[];
  }) {
    const { firstName, lastName, email, password, roleIds } = params;
    let roles: Role[];

    try {
      roles = await this.rolesRepository.findBy({
        id: In(roleIds),
      });

      if (roles.length === 0) {
        throw new BadRequestException(
          'No valid roles found for the provided IDs.',
        );
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error occurred while fetching roles.');
    }

    try {
      // Create user in Clerk
      const clerkUser = await clerkClient.users.createUser({
        firstName,
        lastName,
        emailAddress: [email],
        password,
        publicMetadata: {
          roleIds,
        },
      });

      // Create user in local DB
      const user = this.usersRepository.create({
        id: clerkUser.id,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        email1: email,
        hasImage: clerkUser.hasImage,
        imageUrl: clerkUser.imageUrl,
        passwordEnabled: clerkUser.passwordEnabled,
        createdAt: clerkUser.createdAt,
        updatedAt: clerkUser.updatedAt,
        username: clerkUser.username,
        roles,
      });

      return this.usersRepository.save(user);
    } catch (error) {
      console.error('Error creating user with role:', error);
      handleClerkError(error);
    }
  }

  async getUsers() {
    return clerkClient.users.getUserList();
  }

  async getUser(id: string) {
    return clerkClient.users.getUser(id);
  }

  async syncUser(event: UserWebhookEvent) {
    const { data, type } = event;

    switch (type) {
      case 'user.created':
      case 'user.updated':
        const clerkUser = await clerkClient.users.getUser(data.id);
        if (!clerkUser) {
          throw new NotFoundException(
            `User with ID ${data.id} not found in Clerk`,
          );
        }

        const roleIds = (clerkUser.publicMetadata?.roleIds as string[]) || [];

        const roles = await this.rolesRepository.findBy(
          roleIds.map((id) => ({ id })),
        );

        const user: User = {
          id: clerkUser.id,
          username: clerkUser.username,
          email1: clerkUser.emailAddresses[0].emailAddress,
          email2: clerkUser.emailAddresses[1]?.emailAddress || null,
          email3: clerkUser.emailAddresses[2]?.emailAddress || null,
          hasImage: clerkUser.hasImage,
          imageUrl: clerkUser.imageUrl,
          firstName: clerkUser.firstName || null,
          lastName: clerkUser.lastName,
          passwordEnabled: clerkUser.passwordEnabled,
          roles,
          createdAt: clerkUser.createdAt,
          updatedAt: clerkUser.updatedAt,
          isDeleted: false,
        };

        return this.usersRepository.save(user);

      case 'user.deleted':
        return this.usersRepository.delete(data.id);

      default:
        return null;
    }
  }

  async getDbUsers() {
    return this.usersRepository.find();
  }

  async deleteUser(id: string) {
    try {
      // Attempt to delete user from Clerk
      await clerkClient.users.deleteUser(id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // If the user does not exist in Clerk, log a warning but continue to delete from DB
        console.log(`User with id ${id} not found in Clerk.`);
      } else {
        // For other errors from Clerk, use the error handling utility
        console.error(`Error deleting user with id ${id} from Clerk:`, error);
        handleClerkError(error);
      }
    }

    try {
      // Attempt to delete user from the local database
      const deleteResult = await this.usersRepository.delete(id);

      if (!deleteResult.affected) {
        // If no rows were affected, the user was not found in the database
        throw new NotFoundException(
          `User with id ${id} not found in the database.`,
        );
      }

      return { message: `User with id ${id} deleted successfully.` };
    } catch (error) {
      // Log and rethrow the error
      console.error(
        `Failed to delete user with id ${id} from the database:`,
        error,
      );
      throw new InternalServerErrorException(
        `Failed to delete user with id ${id} from the database.`,
      );
    }
  }
}
