import {
  BadRequestException,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';

export function handleClerkError(error: any) {
  if (error.clerkError && error.errors && error.errors.length > 0) {
    const clerkErrorMessage =
      error.errors[0].longMessage || error.errors[0].message;
    const clerkErrorStatusCode = error.status;

    switch (clerkErrorStatusCode) {
      case 400:
        throw new BadRequestException(
          `Failed to create user: ${clerkErrorMessage}`,
        );
      case 422:
        throw new UnprocessableEntityException(
          `Failed to create user: ${clerkErrorMessage}`,
        );
      case 500:
      default:
        throw new InternalServerErrorException(
          `Clerk error: ${clerkErrorMessage}`,
        );
    }
  } else {
    throw new InternalServerErrorException(
      error.message || 'An unknown error occurred.',
    );
  }
}
