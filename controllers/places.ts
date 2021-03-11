import {NextFunction, Request, Response} from "express";
import logger from "../common/logger";
import * as mongoose from "mongoose";
import Places from "../models/places";
import config from "../common/config";

const NAMESPACE = "PLACES";

const getPlaces = async (req: Request, res: Response, next: NextFunction) => {
  Places.find({countryId: req.params.id})
  .exec()
  .then((places) => {
    return res.status(200).json({
      places,
      count: places.length
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

const upgradePlaces = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.body;
  if ( token !== config.appToken ) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }
  Places.findOneAndUpdate({_id: req.params.id}, req.body)
  .exec()
  .then(() => {
    return res.status(202).json({
      message: "Places successfully updated"
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

const addPlaces = async (req: Request, res: Response, next: NextFunction) => {
  const { countryId, name, description, imageUrl } = req.body;

  const { token } = req.body;
  if ( token !== config.appToken ) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  if (! (countryId && name && description && imageUrl )) {
    return res.status(400).json({
      message: "Please, use correct data"
    });
  }

  const placesData = new Places({
    _id: new mongoose.Types.ObjectId(),
    countryId,
    name,
    description,
    imageUrl,
    rating: 0
  });

  placesData
  .save()
  .then((place) => {
    return res.status(201).json({
      message: "Place successfully added",
      place,
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
  getPlaces,
  upgradePlaces,
  addPlaces
};
