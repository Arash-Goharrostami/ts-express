import { IsEnum, IsString, IsEmail, IsOptional, MinLength } from 'class-validator';
import { UserType } from '../entities/user.entity';

export class CreateUserDto {
  @IsEnum(UserType, { each: true })
  userTypes: UserType[] = [UserType.DRIVER]; // Always set to DRIVER

  @IsString()
  firstName!: string;

  @IsString()
  @IsOptional()
  middleName?: string | undefined;

  @IsString()
  lastName!: string;

  @IsString()
  phoneNumber!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsOptional()
  avatar?: string | undefined;

  @IsString()
  address!: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string;
}
