import { ObjectId } from 'bson';
import * as mongoose from 'mongoose';
import IRatings from './interfaces/ratings';

const ratingsSchema: mongoose.Schema = new mongoose.Schema(
  {
    placeId: { type: ObjectId, required: true },
    userId: { type: ObjectId, required: true },
    rating: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IRatings>('Ratings', ratingsSchema)
