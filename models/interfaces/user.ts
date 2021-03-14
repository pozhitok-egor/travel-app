import { Document } from "mongoose";

export default interface IUser extends Document {
  username: string;
  password: string;
  image: {
    data: Buffer,
    contentType: string
  };
  accountUrl: string;
  social: {
    github: string
  }
  // tokens: tokens;
}

export interface tokens {
  token: string;
};
