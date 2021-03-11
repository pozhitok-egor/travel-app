import { Document } from "mongoose";

export default interface ICountry extends Document {
  name: localize;
  capital: localize;
  description: localize;
  capitalLocation: capitalLocation;
  imageUrl: string;
  videoUrl: string;
  currency: string;
  ISOCode: string;
  border: [];
  timezone: string;
}


export interface capitalLocation {
  coordinates: [number, number];
  type: string;
};

export interface localize {
  en: string;
  ru: string;
  cz: string;
}
