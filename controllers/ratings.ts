  import {NextFunction, Request, Response} from "express";
import logger from "../common/logger";
import * as mongoose from "mongoose";
import Rating from "../models/ratings";

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
  const { rating, placeId } = req.body
  Rating.findOneAndUpdate({userId: res.locals.jwt.id, placeId}, { rating })
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
  const { placeId, rating } = req.body;

  Rating.findOne({ placeId, userId: res.locals.jwt.id})
    .exec()
    .then((rating) => {
      if (rating) {
        next();
      } else {
        const ratingData = new Rating({
          _id: new mongoose.Types.ObjectId(),
          userId: res.locals.jwt.id,
          placeId,
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
