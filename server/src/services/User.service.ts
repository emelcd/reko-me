import { Model } from 'mongoose';
import { SHA256 } from 'crypto-js';
import User from '../models/User.models';
import IUser from '../interfaces/User.interface';

export class UserService {
  constructor(private readonly userModel: Model<IUser>) {
    this.userModel = userModel;
  }

  async register(user: IUser): Promise<IUser> {
    const UserModel = this.userModel;
    if (user.password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
    const newUser = new UserModel(
      {
        ...user,
        name: user.name ? user.name : `user${Math.floor(Math.random() * 100)}`,
        password: SHA256(user.password).toString(),
      },
    );
    return newUser.save();
  }

  async userLogin(email: string, password: string): Promise<IUser> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    if (user.password === SHA256(password).toString()) {
      return user;
    }
    throw new Error('Password is incorrect');
  }
}

export const userService = new UserService(User);
