/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import {
  ConflictError,
  NotFoundError,
  BadRequestError,
  ServerError,
  UnauthorizedError,
} from '../utils/errors.js';
import { SECRET_CODE } from '../utils/config.js';
import {
  MSG_ERR_INCORRECT_DATA,
  MSG_ERR_CONFLICT,
  MSG_ERR_AUTH,
  MSG_ERR_SERVER,
  MSG_ERR_NOT_FOUND_USER,
} from '../utils/messages.js';

const { NODE_ENV, JWT_SECRET } = process.env;

export const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        next(new NotFoundError(MSG_ERR_NOT_FOUND_USER));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(MSG_ERR_INCORRECT_DATA));
      } else {
        console.log(err);
        next(new ServerError(MSG_ERR_SERVER));
      }
    });
};

export const register = (req, res, next) => {
  const {
    name, phone, email, password, isAdmin,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        phone,
        email,
        password: hash,
        isAdmin,
      })
        .then((document) => {
          const user = document.toObject();
          delete user.password;
          res.send({ data: user });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError(MSG_ERR_INCORRECT_DATA));
          } else if (err.code === 11000) {
            next(new ConflictError(MSG_ERR_CONFLICT));
          } else {
            console.log(err);
            next(new ServerError(MSG_ERR_SERVER));
          }
        });
    })
    .catch(next);
};

export const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password, next)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : SECRET_CODE,
        { expiresIn: '30d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      console.log(err);
      next(new UnauthorizedError(MSG_ERR_AUTH));
    });
};

export const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => next(new ServerError(MSG_ERR_SERVER)));
};
