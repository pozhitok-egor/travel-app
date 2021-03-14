import {NextFunction, Request, Response} from "express";
import logger from "../../common/logger";
import config from "../../common/config";
import axios from "axios";
import * as fs from 'fs';
import * as bcryptjs from 'bcryptjs';
import * as mongoose from 'mongoose';
import User from "../../models/user";
import signJWT from "../../JWT/signJWT";

const NAMESPACE = "GITHUB";

const getData = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.query.code;
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${config.github.id}&client_secret=${config.github.secret}&code=${token}`,
    headers: {
      accept: 'application/json'
    }
  }).then((response) => {
    const accessToken = response.data.access_token;
    axios.get("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${accessToken}`,
        accept: 'application/json'
      }
    })
    .then(({ data }) => {
      res.locals.github = {
        username: data.login,
        id: data.id,
        accountUrl: data.html_url,
        node_id: data.node_id
      }
      next();
    })
    .catch((error) => {
      logger.error(NAMESPACE, error.message, error);
      return res.status(500).redirect(`${config.callback}?error=${error.message}`)
    })

  })
  .catch((error) => {
    logger.error(NAMESPACE, error.message, error);
    return res.status(500).redirect(`${config.callback}?error=${error.message}`)
  })
}

const register = async (req: Request, res: Response, next: NextFunction) => {
  const image = fs.readFileSync('./uploads/userAvatar.png');

  const { github } = res.locals;

  const _user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: `${github.username}-${github.id}`,
    password: ' ',
    image: {
      data: image,
      contentType: 'image/png'
    },
    accountUrl: github.accountUrl,
    social: {
      github: github.username
    }
  });

  _user
  .save()
  .then((user) => {
    signJWT(user, (_error, token) => {
      if (_error) {
        logger.error(NAMESPACE, "Unable to sign token: ", _error);
        return res.status(500).redirect(`${config.callback}?error=Unable to sign token`)
      } else if (token) {
        return res.status(200).redirect(`${config.callback}?token=${token}`)
      }
    })
  })
  .catch((error) => {
    logger.error(NAMESPACE, error.message, error);
    return res.status(500).redirect(`${config.callback}?error=${error.message}`)
  });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { github } = res.locals;

  User.find({ social: { github: github.username } })
  .exec()
  .then(users => {
    if ( users.length < 1 )
    {
      return next();
    }
    signJWT(users[0], (_error, token) => {
      if (_error) {
        logger.error(NAMESPACE, "Unable to sign token: ", _error);
        return res.status(500).redirect(`${config.callback}?error=Failed to sign token!`)
      } else if (token) {
        return res.status(200).redirect(`${config.callback}?token=${token}`)
      }
    })
  })
  .catch((error) => {
    logger.error(NAMESPACE, error.message, error);
    return res.status(500).redirect(`${config.callback}?error=${error.message}`)
  })
};

export default {getData, login, register};
