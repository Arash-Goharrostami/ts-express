/** --------------------------------------------------------------------------------------------------------------------
 * @file this file includes all user services and functions in single service class
 */

import UserRepository from './user.repository';
import { UserServiceDto } from "./dto/service.dto";

/** --------------------------------------------------------------------------------------------------------------------
 * @description class for handel all User routes in application
 * @class
 */
export default class UserService implements UserServiceDto {

  /** ------------------------------------------------------------------------------------------------------------------
   * @description local private values validations
   */
  private userRepository: UserRepository;

  /** ------------------------------------------------------------------------------------------------------------------
   * @description validate local values
   * @constructor
   */
  constructor() {
    this.userRepository = new UserRepository(); // Manually create an instance
  }

  public test(): string {
    return this.userRepository.test();
  }
}
