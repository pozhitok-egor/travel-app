import {NextFunction, Request, Response} from "express";
import logger from "../common/logger";
import config from "../common/config";
import * as bcryptjs from "bcryptjs";
import * as mongoose from "mongoose";
import User from "../models/user";
import signJWT from "../JWT/signJWT";
import * as fs from 'fs';

const NAMESPACE = "USER";

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  logger.info(NAMESPACE, "Token Validated, user authorized");

  const jwt = res.locals.jwt;
  User.findOne({ _id: jwt.id })
  .exec()
  .then((user) => {
    return res.status(200).json({
      message: "Authorized",
      token: res.locals.token,
      user
    });
  })
  .catch((error) => {
    return res.status(500).json({
      message: error.message,
      error,
    });
  });
};

const register = async (req: Request, res: Response, next: NextFunction) => {

  const image = fs.readFileSync('uploads/userAvatar.png');

  const {username, password} = req.body;

  const errors = [];

  if (username.length < 4) {
      errors.push("Your username must be at least 4 characters");
  }
  if (username.search(/[a-z]/i) < 0) {
      errors.push("Your username must contain at least one letter.");
  }

  if (password.length < 8) {
      errors.push("Your password must be at least 8 characters");
  }
  if (password.search(/[a-z]/i) < 0) {
      errors.push("Your password must contain at least one letter.");
  }
  if (password.search(/[0-9]/) < 0) {
      errors.push("Your password must contain at least one digit.");
  }
  if (errors.length > 0) {
      return res.status(500).json({
        message: errors.join("\n"),
        error: errors.join("\n"),
      });
  }

  bcryptjs.hash(password, 10, (hashError, hash) => {
    if (hashError) {
      return res.status(500).json({
        message: hashError.message,
        error: hashError,
      });
    }

    User.findOne({ username })
    .exec()
    .then((user) => {
      if (user) {
        next();
      } else {
        const _user = new User({
          _id: new mongoose.Types.ObjectId(),
          username,
          password: hash,
          image
        });

        _user
        .save()
        .then((user) => {
          signJWT(user, (_error, token) => {
            if (_error) {
              logger.error(NAMESPACE, "Unable to sign token: ", _error);

              return res.status(401).json({
                message: 'Unauthorized',
                error: _error
              });
            } else if (token) {
              return res.status(200).json({
                message: 'Auth Successful',
                token,
                user
              });
            }
          })
        })
        .catch((error) => {
          return res.status(500).json({
            message: error.message,
            error,
          });
        });
      }
    });
  });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  let { username, password } = req.body;

  User.find({ username })
  .exec()
  .then(users => {
    if ( users.length < 1 )
    {
      return res.status(401).json({
        message: 'Invalid username or password!'
      });
    }

    bcryptjs.compare(password, users[0].password, (error, result) => {
      if (error) {
        logger.error(NAMESPACE, error.message, error);

        return res.status(401).json({
          message: 'Invalid username or password!'
        });
      } else if (result) {
        signJWT(users[0], (_error, token) => {
          if (_error) {
            logger.error(NAMESPACE, "Unable to sign token: ", _error);

            return res.status(401).json({
              message: 'Failed to sign token',
              error: _error
            });
          } else if (token) {
            return res.status(200).json({
              message: 'Auth Successful',
              token,
              user: users[0]
            });
          }
        })
      } else {
        return res.status(401).json({
          message: 'Invalid username or password!'
        });
      };
    })
  })
  .catch((error) => {
    return res.status(500).json({
      message: error.message,
      error
    });
  })
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {

  const { token } = req.body;
  if ( token !== config.appToken ) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  User.find()
  .select('-password')
  .exec()
  .then((users) => {
    return res.status(200).json({
      users: users,
      count: users.length
    });
  })
  .catch((error) => {
    return res.status(500).json({
      message: error.message,
      error
    });
  })
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const {image, accountUrl} = req.body;

  User.findOneAndUpdate({ _id: res.locals.jwt.id }, {image, accountUrl})
  .exec()
  .then((user) => {
    return res.status(200).json({
      message: "Updated",
      user
    });
  })
  .catch((error) => {
    return res.status(500).json({
      message: error.message,
      error
    });
  })
}

const addPhoto = async (req: Request, res: Response, next: NextFunction) => {
  const image = req.file.buffer;
  User.findOneAndUpdate({ _id: res.locals.jwt.id }, {image})
  .exec()
  .then(() => {
    return res.status(202).json({
      message: "User updated"
    });
  })
  .catch((error) => {
    return res.status(500).json({
      message: error.message,
      error
    });
  })
}

export default {
  getUser,
  register,
  login,
  getAllUsers,
  update,
  addPhoto
};
