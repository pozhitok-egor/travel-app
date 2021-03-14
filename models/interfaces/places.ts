import { ObjectId } from "bson";
import { Document } from "mongoose";

export default interface IPlaces extends Document {
  countryId: ObjectId;
  name: string;
  description: string;
  imageUrl: string;
  rating: number;
}