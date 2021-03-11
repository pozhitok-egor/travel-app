import { Document } from "mongoose";

export default interface IRatings extends Document {
  placeId: string;
  userId: string;
  rating: number;
}