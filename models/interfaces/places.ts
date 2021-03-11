import { Document } from "mongoose";

export default interface IPlaces extends Document {
  countryId: string;
  name: string;
  description: string;
  imageUrl: string;
  rating: number;
}