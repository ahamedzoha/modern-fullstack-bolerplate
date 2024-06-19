import { clerkClient } from '@clerk/clerk-sdk-node';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class ClerkAuthGuardGuard implements CanActivate {
  private readonly logger = new Logger(ClerkAuthGuardGuard.name);
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['__session'];

    try {
      await clerkClient.verifyToken(token);
    } catch (error) {
      this.logger.error('Failed to verify token', error);
      return false;
    }
    return true;
  }
}
