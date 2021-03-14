import * as express from 'express';
import * as logger from 'morgan';
import * as cors from 'cors';
import * as mongoose from 'mongoose';

import userRouter from './routes/user';
import ratingRouter from './routes/rating';
import countryRouter from './routes/country';
import placesRouter from './routes/places';
import githubRouter from './routes/github';
import config from './common/config';
import logging from './common/logger';

const NAMESPACE = 'Server';

var app = express();

/** Connect to Mongo */
mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then(result => {
      logging.info(NAMESPACE, 'Connected to MongoDB!');
    })
    .catch(error => {
      logging.error(NAMESPACE, error.message, error);
    })

app.use(logger('dev'));
app.use(express.json({limit: '2mb'}));
app.use(express.urlencoded({limit: '3mb', extended: false}));
app.use(cors())

app.use('/user', userRouter);
app.use('/rating', ratingRouter);
app.use('/country', countryRouter);
app.use('/places', placesRouter);
app.use('/user/github', githubRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({
    statusCode: 404
  });
});

// error handler
app.use(function(err, req, res, next) {
  res.json({
    statusCode: 500,
    message: err.message,
    stack: err.stack
  });
});

export default app;
