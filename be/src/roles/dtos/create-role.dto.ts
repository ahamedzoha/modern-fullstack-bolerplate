import {
  IsNotEmpty,
  IsArray,
  IsString,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  readonly permissionIds: string[];
}
