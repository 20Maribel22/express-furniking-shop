/* eslint-disable import/extensions */
import express from 'express';
import Product from './models/Product.js';
import { products, users } from './data/data.js';
import { MSG_ERR_SERVER } from './utils/messages.js';
import { ServerError } from './utils/errors.js';
import User from './models/User.js';

const ImportData = express.Router();

ImportData.post('/all', (req, res, next) => {
  Product.remove({});
  // eslint-disable-next-line no-unused-vars
  const importProducts = Product.insertMany(products)
    // eslint-disable-next-line no-shadow
    .then((importProducts) => res.send({ importProducts }))
    .catch(() => next(new ServerError(MSG_ERR_SERVER)));
});

ImportData.post('/users', (req, res, next) => {
  User.remove({});
  // eslint-disable-next-line no-unused-vars
  const importUsers = User.insertMany(users)
    // eslint-disable-next-line no-shadow
    .then((importUsers) => res.send({ importUsers }))
    .catch(() => next(new ServerError(MSG_ERR_SERVER)));
});

export default ImportData;
