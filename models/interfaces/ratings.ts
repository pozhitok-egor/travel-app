import { ObjectId } from "bson";
import { Document } from "mongoose";

export default interface IRatings extends Document {
  placeId: ObjectId;
  userId: ObjectId;
  rating: number;
}