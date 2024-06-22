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

    const session = request.cookies['__session'];
    // using this for postman testing
    const token = request.headers.authorization?.split('Bearer ')[1];

    try {
      await clerkClient.verifyToken(session || token);
    } catch (error) {
      this.logger.error('Failed to verify token', error);
      return false;
    }
    return true;
  }
}
