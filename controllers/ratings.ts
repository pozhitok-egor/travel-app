  import {NextFunction, Request, Response} from "express";
import logger from "../common/logger";
import * as mongoose from "mongoose";
import Rating from "../models/ratings";
import places from "../models/places";

const NAMESPACE = "RATING";

const getRating = async (req: Request, res: Response, next: NextFunction) => {
  Rating.find({placeId: req.params.id})
  .exec()
  .then((ratings) => {
    return res.status(200).json({
      ratings,
      count: Rating.length
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

const getUserRating = async (req: Request, res: Response, next: NextFunction) => {
  Rating.findOne({userId: res.locals.jwt.id, placeId: req.params.id})
  .exec()
  .then((rating) => {
    return res.status(200).json({
      rating
    });
  })
  .catch((error) => {
    logger.error(NAMESPACE, error.message, error);
    return res.status(500).json({
      message: error.message,
      error
    });
  })
}

const upgradeRating = async (req: Request, res: Response, next: NextFunction) => {
  const { rating } = req.body
  Rating.findOneAndUpdate({userId: res.locals.jwt.id, placeId: req.params.id}, { rating })
  .exec()
  .then(() => {
    return res.status(202).json({
      message: "Rating successfully updated"
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

const addRating = async (req: Request, res: Response, next: NextFunction) => {
  const { rating } = req.body;

  await places.findOne({_id: req.params.id})
  .exec()
  .then((place) => {
    if (!place) {
      return res.status(404).json({
        message: "Place not found",
        error: "Place not found"
      });
    }
  })
  .catch((error) => {
    logger.error(NAMESPACE, error.message, error);
    return res.status(500).json({
      message: error.message,
      error,
    });
  })

  Rating.findOne({ placeId: req.params.id, userId: res.locals.jwt.id})
    .exec()
    .then((ratings) => {
      if (ratings) {
        next();
      } else {
        const ratingData = new Rating({
          _id: new mongoose.Types.ObjectId(),
          userId: res.locals.jwt.id,
          placeId: req.params.id,
          rating
        });

        ratingData
        .save()
        .then((rating) => {
          return res.status(201).json({
            message: "Rating successfully added",
            rating,
          });
        })
        .catch((error) => {
          logger.error(NAMESPACE, error.message, error);
          return res.status(500).json({
            message: error.message,
            error,
          });
        });
      }
    })
};

const recalculate = async (req: Request, res: Response, next: NextFunction) => {
  Rating.aggregate([
    { $match: {
      placeId: res.locals.placeId
    }},
    { $group: {
        _id: "$placeId",
        rating: { $avg: "$rating"  }
    }}
  ])
  .then((rating) => {
    console.log(rating)
  })
  .catch((error) => {
    return res.status(500).json({
      message: error.message,
      error
    });
  })
};

export default {
  getRating,
  getUserRating,
  upgradeRating,
  addRating
};
