import { Document } from "mongoose";

export default interface IUser extends Document {
  username: string;
  password: string;
  image: {data: Buffer, contentType: String};
  accountUrl: string;
  // tokens: tokens;
}

export interface tokens {
  token: string;
};
