import mongoose, {Connection} from "mongoose";
import {IUser, User} from "./entities/user.entity"; // Import User model and interface
import {AbstractRepository} from "../../../../libs/abstract";

export default class UserRepository extends AbstractRepository<IUser> {
  constructor() {
    super(User, mongoose.connection);
  }

  public test(): string {
    return "testing from repository repository";
  }

}
