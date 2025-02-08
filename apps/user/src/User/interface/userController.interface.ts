/**
 * @file this file is for show what is the UserContorller type looks like.
 */
import {IUser} from "../entities/user.entity";
import {CreateUserDto} from "../dto/createUser.dto";

export interface IUserController {
  create(dto: CreateUserDto): Promise<IUser>;
}
