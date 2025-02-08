/** --------------------------------------------------------------------------------------------------------------------
 * @file this file includes all user services and functions in single service class
 */

import UserRepository from './user.repository';
import {UserServiceDto} from "./dto/service.dto";
import {IUser, UserType} from "./entities/user.entity";
import {CreateUserDto} from "./dto/createUser.dto";

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

  public test(): any {
    return this.userRepository.test();
    // return this.userRepository.create({
    //   _id: "mongoose.Types.ObjectId",
    //   userTypes: ["ADMIN"],
    //   firstName: "string",
    //   middleName: "string",
    //   lastName: "string",
    //   phoneNumber: "string",
    //   email: "string",
    //   avatar: "string",
    //   address: "string",
    //   password: "string",
    //   createdAt: "Date",
    //   updatedAt: "Date",
    // })
  }

  public async create(dto: CreateUserDto): Promise<IUser> {
    return this.userRepository.create({
      ...dto,
      password: "",
      "firstName": "John",
      "middleName": "D",
      "lastName": "Doe",
      "phoneNumber": "+1234567890",
      "email": "john.doe@example.com",
      "avatar": "https://example.com/avatar.jpg",
      "address": "123 Main Street",
      "userTypes": [UserType.DRIVER],
      "createdAt": new Date(),
      "updatedAt": new Date()
    })
  }
}
