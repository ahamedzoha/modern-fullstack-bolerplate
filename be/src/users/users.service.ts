import { clerkClient, UserWebhookEvent } from '@clerk/clerk-sdk-node';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  async getUsers() {
    return clerkClient.users.getUserList();
  }

  async getUser(id: string) {
    return clerkClient.users.getUser(id);
  }

  //   TODO: Get the user from the webhook event and sync it with the database
  async syncUser(event: UserWebhookEvent) {
    const { id } = event.data;
    return clerkClient.users.getUser(id);
  }
}
