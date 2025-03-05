/** --------------------------------------------------------------------------------------------------------------------
 * @file this file includes all user routes in single controller class
 */

import 'reflect-metadata';
import {JsonController, Get, Param, Post, Body} from 'routing-controllers';
import UserService from './user.service';
import {IUserController} from './interface/userController.interface';
import {CreateUserDto} from './dto/createUser.dto';
import {IUser} from './entities/user.entity';

/** --------------------------------------------------------------------------------------------------------------------
 * @description class for handel all User routes in application
 * @class
 */
@JsonController('/users')
export default class UserController implements IUserController {

  /** ------------------------------------------------------------------------------------------------------------------
   * @description local private values validations
   */
  private userService: UserService;

  /** ------------------------------------------------------------------------------------------------------------------
   * @description validate local values
   * @constructor
   */
  constructor() {
    this.userService = new UserService(); // Manually create an instance
  }

  /** ------------------------------------------------------------------------------------------------------------------
   * @author Arash Goharrostami :: Thursday 6 February 2025 - 08:20 am
   * @param createUserDto
   */
  @Post('/')
  async create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return await this.userService.create(createUserDto)
  }
}
