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

  const image = fs.readFileSync('./uploads/userAvatar.png');

  const {username, password, url} = req.body;

  let error = '';

  if (username.length < 4) {
    error = "Your username must be at least 4 characters";
  }
  if (username.search(/[a-z]/i) < 0) {
    error = "Your username must contain at least one letter.";
  }
  if ( username.length > 24 ) {
    error = "Max length of username is 24 characters";
  }

  if (password.length < 8) {
    error = "Your password must be at least 8 characters";
  }
  if (password.search(/[a-z]/i) < 0) {
    error = "Your password must contain at least one letter.";
  }
  if (password.search(/[0-9]/) < 0) {
    error = "Your password must contain at least one digit.";
  }
  if (error != '') {
    return res.status(500).json({
      message: error,
      error: error,
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
          image: {
            data: image,
            contentType: 'image/png'
          },
          accountUrl: url
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
  const { username, accountUrl, password } = req.body;

  const data = { username, accountUrl, password };

  if ( username ) {
    let error = '';

    if ( username.length < 4 ) {
      error = "Your username must be at least 4 characters";
    }
    if ( username.length > 24 ) {
      error = "Max length of username is 24 characters";
    }
    if ( username.search(/[a-z]/i) < 0 ) {
      error = "Your username must contain at least one letter.";
    }

    if ( error != '' ) {
      return res.status(500).json({
        message: error,
        error: error,
      });
    }
  } else {
    delete data.username;
  }

  if ( password ) {
    let error = '';

    if ( password.length < 8 ) {
      error = "Your password must be at least 8 characters";
    }
    if ( password.search(/[a-z]/i) < 0 ) {
      error = "Your password must contain at least one letter.";
    }
    if ( password.search(/[0-9]/) < 0 ) {
      error = "Your password must contain at least one digit.";
    }
    if ( error != '' ) {
      return res.status(500).json({
        message: error,
        error: error,
      });
    }

    data.password = await bcryptjs.hash(password,10);

  } else {
    delete data.password;
  }

  if ( !accountUrl ) {
    delete data.accountUrl;
  }

  User.findOneAndUpdate({ _id: res.locals.jwt.id }, data)
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
  if (!req.file) {
    return res.status(500).json({
      message: "Cannot find file"
    });
  }
  User.findOneAndUpdate({ _id: res.locals.jwt.id }, {
    image: {
      data: fs.readFileSync(`./uploads/${req.file.filename}`),
      contentType: 'image/png'
    }
  })
  .exec()
  .then(() => {
    fs.unlink(`./uploads/${req.file.filename}`, (err) => {
      if(err) logger.error('FILE UPLOAD','Cannot delete file', err);
      logger.info('FILE UPLOAD', 'File deleted successfully');
    })
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
