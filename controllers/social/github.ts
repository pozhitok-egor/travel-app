import {NextFunction, Request, Response} from "express";
import logger from "../../common/logger";
import config from "../../common/config";
import axios from "axios";

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
    res.redirect(`${config.callback}?token=${accessToken}`);
  }).catch((error) => {
    logger.error(NAMESPACE, error.message, error);
    res.redirect(`${config.callback}?error='Cannot connect to github'`)
  })
}

export default {getData};
