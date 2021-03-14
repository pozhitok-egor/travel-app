import { ObjectId } from 'bson';
import * as mongoose from 'mongoose';
import IPlaces from './interfaces/places';

const localization = {
  en: { type: String, required: true },
  ru: { type: String, required: true },
  cz: { type: String, required: true }
};

const placesSchema: mongoose.Schema = new mongoose.Schema(
  {
    countryId: { type: ObjectId, required: true },
    name: localization,
    description: localization,
    imageUrl: { type: String, required: true },
    rating: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IPlaces>('Places', placesSchema)
