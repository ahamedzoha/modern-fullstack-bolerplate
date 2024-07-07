import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsNotEmpty()
  @IsString()
  readonly resource: string;

  @IsNotEmpty()
  @IsString()
  readonly action: string;
}
