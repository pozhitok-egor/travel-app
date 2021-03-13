import {NextFunction, Request, Response} from "express";
import logger from "../common/logger";
import * as mongoose from "mongoose";
import Country from "../models/country";
import Places from "../models/places";
import config from "../common/config";

const NAMESPACE = "COUNTRY";

const getCountries = async (req: Request, res: Response, next: NextFunction) => {
  Country.find()
  .select("-description -capitalLocation -border -videoUrl -currency -ISOCode -timezone")
  .exec()
  .then((countries) => {
    return res.status(200).json({
      countries,
      count: Country.length
    });
  })
  .catch((error) => {
    logger.error(NAMESPACE, error.message, error);
    return res.status(500).json({
      message: error.message,
      error
    });
  });
};

const getCountry = async (req: Request, res: Response, next: NextFunction) => {
  Places.find({countryId: req.params.id})
  .exec()
  .then((places) => {
    Country.findOne({_id: req.params.id})
    .exec()
    .then((country) => {
      return res.status(200).json({
        country,
        places
      });
    })
  })
  .catch((error) => {
    logger.error(NAMESPACE, error.message, error);
    return res.status(500).json({
      message: error.message,
      error
    });
  })
};

const upgradeCountry = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.body;
  if ( token !== config.appToken ) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }
  Country.findOneAndUpdate({_id: req.params.id}, req.body)
  .exec()
  .then(() => {
    return res.status(202).json({
      message: "Country successfully updated"
    });
  })
  .catch((error) => {
    logger.error(NAMESPACE, error.message, error);
    return res.status(500).json({
      message: error.message,
      error
    });
  })
};

const addCountry = async (req: Request, res: Response, next: NextFunction) => {

  const { name, capital, description, imageUrl, videoUrl, currency, ISOCode, border, timezone } = req.body;

  const { token } = req.body;
  if ( token !== config.appToken ) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  const { coordinates, type } = req.body.capitalLocation;

  const countryData = new Country({
    _id: new mongoose.Types.ObjectId(),
    name,
    capital,
    description,
    imageUrl,
    capitalLocation: {
      coordinates,
      type
    },
    videoUrl,
    currency,
    ISOCode,
    border,
    timezone
  });

  countryData
  .save()
  .then((country) => {
    return res.status(201).json({
      message: "Country successfully added",
      country,
    });
  })
  .catch((error) => {
    logger.error(NAMESPACE, error.message, error);
    return res.status(500).json({
      message: error.message,
      error,
    });
  });

};

export default {
  getCountries,
  upgradeCountry,
  addCountry,
  getCountry
};
