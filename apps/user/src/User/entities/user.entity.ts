import mongoose, { Schema, model, Document } from 'mongoose';

// Enum for User Types
enum UserType {
  ADMIN = 'ADMIN',
  DRIVER = 'DRIVER',
  COMPANY = 'COMPANY',
}

// Interface for User Document
interface IUser {
  _id: mongoose.Types.ObjectId;
  userTypes: UserType[];
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  avatar: string;
  address: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema
const UserSchema = new Schema<IUser>(
  {
    userTypes: {
      type: [String],
      enum: Object.values(UserType),
      required: true,
    },
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    avatar: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Mongoose Model
const User = model<IUser>('User', UserSchema);

export { User, UserType, IUser };
