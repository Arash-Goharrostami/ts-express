/** --------------------------------------------------------------------------------------------------------------------
 * @file this file includes all user routes in single controller class
 */

import "reflect-metadata";
import { JsonController, Get, Param } from "routing-controllers";
import {UserContorllerDto} from "./dto/controller.dto";
import UserService from './user.service';

/** --------------------------------------------------------------------------------------------------------------------
 * @description class for handel all User routes in application
 * @class
 */
@JsonController('/users')
export default class UserController implements UserContorllerDto {

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

  @Get('/')
  getAllUsers() {
    const msg = this.userService.test();
    return { msg };
  }

  @Get('/:_id')
  getUser(@Param('_id') _id: string) {
    return { message: `Get user with ID ${_id}` };
  }
}
