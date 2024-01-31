/* eslint-disable import/extensions */
import Product from '../models/Product.js';
import {
  MSG_ERR_SERVER,
  MSG_ERR_NOT_FOUND_PRODUCT,
  MSG_ERR_INCORRECT_DATA,
  MSG_DELETE_PRODUCT,
} from '../utils/messages.js';
import {
  ServerError,
  NotFoundError,
  BadRequestError,
} from '../utils/errors.js';

export const getAll = (req, res, next) => {
  Product.find({})
    .then((products) => res.send(products))
    .catch(() => next(new ServerError(MSG_ERR_SERVER)));
};

export const getOne = (req, res, next) => {
  Product.findById(req.params.id)
    .then((product) => res.send(product))
    .catch(() => next(new NotFoundError(MSG_ERR_NOT_FOUND_PRODUCT)));
};

export const updateProduct = (req, res, next) => {
  const {
    status, price, oldPrice, countInStock, text,
  } = req.body;
  const productId = req.params.id;

  Product.findByIdAndUpdate(
    productId,
    {
      status,
      price,
      oldPrice,
      countInStock,
      text,
    },
    { new: true },
  )
    .then((product) => {
      if (product) {
        res.send(product);
      } else {
        next(new NotFoundError(MSG_ERR_NOT_FOUND_PRODUCT));
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(MSG_ERR_INCORRECT_DATA));
      } else {
        next(new ServerError(MSG_ERR_SERVER));
      }
    });
};

export const createProduct = (req, res, next) => {
  const {
    category,
    status,
    name,
    title,
    price,
    oldPrice,
    countInStock,
    url,
    image,
    text,
  } = req.body;

  Product.create({
    category,
    status,
    name,
    title,
    price,
    oldPrice,
    countInStock,
    url,
    image,
    text,
  })
    .then((product) => res.send(product))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(MSG_ERR_INCORRECT_DATA));
      } else {
        next(new ServerError(MSG_ERR_SERVER));
      }
    });
};

export const deleteProduct = (req, res, next) => {
  const productId = req.params.id;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        throw new NotFoundError(MSG_ERR_NOT_FOUND_PRODUCT);
      }
      return product
        .remove()
        .then(() => res.send({ message: MSG_DELETE_PRODUCT }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(MSG_ERR_INCORRECT_DATA));
      }
      next(err);
    });
};

export const getAllBenches = (req, res, next) => {
  Product.find({ category: 'bench' })
    .then((products) => res.send(products))
    .catch(() => next(new ServerError(MSG_ERR_SERVER)));
};

export const getAllStools = (req, res, next) => {
  Product.find({ category: 'stool' })
    .then((products) => res.send(products))
    .catch(() => next(new ServerError(MSG_ERR_SERVER)));
};

export const getAllMirrors = (req, res, next) => {
  Product.find({ category: 'mirror' })
    .then((products) => res.send(products))
    .catch(() => next(new ServerError(MSG_ERR_SERVER)));
};

export const getAllSofas = (req, res, next) => {
  Product.find({ category: 'sofa' })
    .then((products) => res.send(products))
    .catch(() => next(new ServerError(MSG_ERR_SERVER)));
};

export const getAllTables = (req, res, next) => {
  Product.find({ category: 'table' })
    .then((products) => res.send(products))
    .catch(() => next(new ServerError(MSG_ERR_SERVER)));
};

export const getAllWardrobes = (req, res, next) => {
  Product.find({ category: 'wardrobe' })
    .then((products) => res.send(products))
    .catch(() => next(new ServerError(MSG_ERR_SERVER)));
};

export const getAllChairs = (req, res, next) => {
  Product.find({ category: 'chair' })
    .then((products) => res.send(products))
    .catch(() => next(new ServerError(MSG_ERR_SERVER)));
};

export const getAllNew = (req, res, next) => {
  Product.find({ status: 'new' })
    .then((products) => res.send(products))
    .catch(() => next(new ServerError(MSG_ERR_SERVER)));
};

export const getAllBest = (req, res, next) => {
  Product.find({ status: 'discount' })
    .then((products) => res.send(products))
    .catch(() => next(new ServerError(MSG_ERR_SERVER)));
};

export const getAllSale = (req, res, next) => {
  Product.find({ status: 'sale' })
    .then((products) => res.send(products))
    .catch(() => next(new ServerError(MSG_ERR_SERVER)));
};
