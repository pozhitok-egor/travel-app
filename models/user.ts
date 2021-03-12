import * as mongoose from 'mongoose';
import IUser from './interfaces/user';

const userSchema: mongoose.Schema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    image: { data: Buffer, contentType: String, required: true },
    accountUrl: { type: String, required: false }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IUser>('User', userSchema)
