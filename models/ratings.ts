import * as mongoose from 'mongoose';
import IRatings from './interfaces/ratings';

const ratingsSchema: mongoose.Schema = new mongoose.Schema(
  {
    placeId: { type: String, required: true },
    userId: { type: String, required: true },
    rating: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IRatings>('Ratings', ratingsSchema)
