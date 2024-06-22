import { clerkClient, UserWebhookEvent } from '@clerk/clerk-sdk-node';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  async getUsers() {
    return clerkClient.users.getUserList();
  }

  async getUser(id: string) {
    return clerkClient.users.getUser(id);
  }

  //   TODO: Get the user from the webhook event and sync it with the database
  async syncUser(event: UserWebhookEvent) {
    console.log({ event });
    const { data, object, type } = event;

    switch (type) {
      case 'user.created':
      case 'user.updated':
        try {
          const clerkUser = await clerkClient.users.getUser(data.id);
          if (!clerkUser) {
            throw new NotFoundException(
              `User with ID ${data.id} not found in Clerk`,
            );
          }
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
          };

          const createdUser = this.usersRepository.create(user);

          return this.usersRepository.save(createdUser);
        } catch (error) {
          console.error(error);
          return null;
        }

      case 'user.deleted':
        return this.usersRepository.delete(data.id);
      default:
        return null;
    }
  }

  async getDbUsers() {
    return this.usersRepository.find();
  }
}
