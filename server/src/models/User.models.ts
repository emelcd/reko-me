import { Schema, model } from 'mongoose';
import IUser from '../interfaces/User.interface';

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  avatar: {
    type: String,
    default: 'https://localhost:3000/generate-avatar',
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
}, {
  timestamps: true,
  versionKey: false,
});

const User = model<IUser>('User', UserSchema);

export default User;
