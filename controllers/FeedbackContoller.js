/* eslint-disable import/extensions */
import Feedback from '../models/Feedback.js';
import { ServerError, NotFoundError, ConflictError } from '../utils/errors.js';

import {
  MSG_ERR_SERVER,
  MSG_ERR_NOT_FOUND_FEEDBACK,
  MSG_ERR_CONFLICT_FEEDBACK,
} from '../utils/messages.js';

export const saveFeedback = (req, res, next) => {
  const {
    photo, name, status, comment,
  } = req.body;
  // eslint-disable-next-line consistent-return
  Feedback.find({ name }, (err, result) => {
    if (err) return next(err);
    if (result.length > 0) {
      return next(new ConflictError(MSG_ERR_CONFLICT_FEEDBACK));
    }
    Feedback.create({
      photo,
      name,
      status,
      comment,
    })
      .then((data) => {
        res.send(data);
      })
      // eslint-disable-next-line no-shadow
      .catch((err) => {
        if (err.name === 'ValidationError') {
          // eslint-disable-next-line no-undef
          next(new BadRequestError(MSG_ERR_INCORRECT_DATA));
        } else if (err.code === 11000) {
          // eslint-disable-next-line no-undef
          next(new ConflictError(MSG_ERR_CONFLICT));
        } else {
          console.log(err);
          next(new ServerError(MSG_ERR_SERVER));
        }
      });
  });
};

export const getAllFeedback = (req, res, next) => {
  Feedback.find({})
    .then((feedback) => res.send(feedback))
    .catch(() => next(new ServerError(MSG_ERR_SERVER)));
};

export const getOneFeedback = (req, res, next) => {
  Feedback.findById(req.params.id)
    .then((feedback) => res.send(feedback))
    .catch(() => next(new NotFoundError(MSG_ERR_NOT_FOUND_FEEDBACK)));
};
