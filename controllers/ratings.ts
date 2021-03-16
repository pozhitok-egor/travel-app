  import {NextFunction, Request, Response} from "express";
import logger from "../common/logger";
import * as mongoose from "mongoose";
import Rating from "../models/ratings";
import places from "../models/places";

const NAMESPACE = "RATING";

const getRating = async (req: Request, res: Response, next: NextFunction) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(500).json({
      message: 'id must be a single String of 12 bytes or a string of 24 hex characters'
    });
  }
  const placeId = mongoose.Types.ObjectId(req.params.id);
  Rating.aggregate(
    [
    {
      "$match": {
        "placeId": placeId
      }
    },
    {
      "$project" : {
        "_id" : null,
        "ratings" : "$$ROOT"
      }
    },
    {
      "$lookup" : {
        "localField" : "ratings.userId",
        "from" : "users",
        "foreignField" : "_id",
        "as" : "users"
      }
    },
    {
      "$unwind" : {
        "path" : "$users",
        "preserveNullAndEmptyArrays" : true
      }
    },
    {
      "$project" : {
        "_id" : "$ratings._id",
        "rating" : "$ratings.rating",
        "placeId" : "$ratings.placeId",
        "username" : "$users.username",
        "url": "$ratings.accountUrl",
        "image" : "$users.image",
        "accountUrl" : "$users.accountUrl",
      }
    }
  ]
  ).exec()
  .then((ratings) => {
    return res.status(200).json({
      ratings
    })
  })
  .catch((error) => {
    return res.status(500).json({
      message: error.message,
      error
    });
  })
};

const getUserRating = async (req: Request, res: Response, next: NextFunction) => {
  console.log(res.locals.jwt.id, req.params.id)
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
  const { rating } = req.body;
  try {
    await Rating.findOneAndUpdate({userId: res.locals.jwt.id, placeId: req.params.id}, { rating })
    .exec()
    .catch((error) => {
      logger.error(NAMESPACE, error.message, error);
      throw error;
    });
  } catch(error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
  Rating.aggregate([
    {
      "$match": {
        "placeId": mongoose.Types.ObjectId(req.params.id)
      }
    },
    {
      "$group":
        {
          "_id": null,
          "rating": { "$avg": "$rating" }
        }
    }
  ])
  .then((_rating: any = {}) => {
    places.findOneAndUpdate({_id: req.params.id}, {rating: _rating[0].rating}, {new: true})
  .then((place) => {
    return res.status(201).json({
      message: "Rating successfully updated",
      placeRating: place.rating,
      userRating: rating,
    });
  }).catch((error) => {
    logger.error(NAMESPACE, error.message, error);
    return res.status(500).json({
      message: error.message,
      error,
    });
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

const addRating = async (req: Request, res: Response, next: NextFunction) => {
  const { rating } = req.body;

  try {
    await places.findOne({_id: req.params.id})
    .exec()
    .then((place) => {
      if (!place) {
        throw {message: "Place not found", data:""};
      }
    })
    .catch((error) => {
      logger.error(NAMESPACE, error.message, error);
      throw error;
    })
  } catch(error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }

  Rating.findOne({ placeId: req.params.id, userId: res.locals.jwt.id})
  .exec()
  .then((ratings) => {
    if (ratings) {
      next();
    } else {
      const ratingData = new Rating({
        _id: new mongoose.Types.ObjectId(),
        userId: mongoose.Types.ObjectId(res.locals.jwt.id),
        placeId: mongoose.Types.ObjectId(req.params.id),
        rating
      });

      ratingData
      .save()
      .then((rating) => {
        Rating.aggregate([
          {
            "$match": {
              "placeId": mongoose.Types.ObjectId(req.params.id)
            }
          },
          {
            "$group":
              {
                "_id": null,
                "rating": { "$avg": "$rating" }
              }
          }
        ])
        .then((_rating: any = {}) => {
          places.findOneAndUpdate({_id: req.params.id}, {rating: _rating[0].rating}, {new: true})
          .then((place) => {
            return res.status(201).json({
              message: "Rating successfully added",
              placeRating: place.rating,
              userRating: rating.rating,
            });
          }).catch((error) => {
            logger.error(NAMESPACE, error.message, error);
            return res.status(500).json({
              message: error.message,
              error,
            });
          })
        })
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

export default {
  getRating,
  getUserRating,
  upgradeRating,
  addRating
};
