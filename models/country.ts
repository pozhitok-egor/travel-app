import * as mongoose from 'mongoose';
import ICountry from './interfaces/country';

const localization = {
  en: { type: String, required: true },
  ru: { type: String, required: true },
  cz: { type: String, required: true }
};

const countrySchema: mongoose.Schema = new mongoose.Schema(
  {
    name: localization,
    capital: localization,
    description: localization,
    capitalLocation: {
      coordinates: { type: Array, required: true },
      type: { type: String, required: true }
    },
    imageUrl: { type: String, required: true },
    videoUrl: { type: String, required: true },
    currency: { type: String, required: true },
    ISOCode: { type: String, required: true },
    border: { type: Array, required: false },
    timezone: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ICountry>('Country', countrySchema)
