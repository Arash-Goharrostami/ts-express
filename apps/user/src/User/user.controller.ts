/** --------------------------------------------------------------------------------------------------------------------
 * @file user.controller.ts
 * @module Controller/UserController
 * @fileOverview this file includes all user routes in single controller class
 * @author Arash Goharrosmami
 * @created 2025-3-13
 */

import 'reflect-metadata';

import UserService from './user.service';

import {IUser} from './entities/user.entity';
import {CreateUserDto} from './dto/createUser.dto';
import {IUserController} from './interface/userController.interface';
import {JsonController, Post, Body} from 'routing-controllers';

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
