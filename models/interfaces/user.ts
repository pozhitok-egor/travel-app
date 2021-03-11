import { Document } from "mongoose";

export default interface IUser extends Document {
  username: string;
  password: string;
  image: Buffer;
  accountUrl: string;
  // tokens: tokens;
}

export interface tokens {
  token: string;
};
