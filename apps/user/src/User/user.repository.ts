import mongoose, { Connection } from "mongoose";
import { User, IUser } from "./entities/user.entity"; // Import User model and interface
import { AbstractRepository } from "../../../../libs/abstract";

export default class UserRepository extends AbstractRepository<IUser> {
  constructor() {
    const connection: Connection = mongoose.connection; // Get default connection
    super(User, connection);
  }

  public test(): string {
    return "testing from repository repository";
  }
}
