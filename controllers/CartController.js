/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import Cart from '../models/Cart.js';
import {
  BadRequestError,
  ServerError,
  NotFoundError,
  ConflictError,
  UnauthorizedError,
} from '../utils/errors.js';
import {
  MSG_ERR_INCORRECT_DATA,
  MSG_ERR_SERVER,
  MSG_ERR_NOT_FOUND_ORDER,
  MSG_DELETE_ORDER,
  MSG_ERR_CONFLICT,
  MSG_ERR_AUTH,
} from '../utils/messages.js';

export const saveCart = (req, res, next) => {
  const orderData = {
    cartItems: req.body.cartItems,
    owner: req.body.owner,
    subTotal: req.body.subTotal,
    delivery: req.body.delivery,
    totalPrice: req.body.totalPrice,
    count: req.body.count,
  };

  const order = new Cart(orderData);
  order.save()
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new UnauthorizedError(MSG_ERR_AUTH));
      } else if (err.code === 11000) {
        next(new ConflictError(MSG_ERR_CONFLICT));
      } else {
        console.log(err);
        next(new ServerError(MSG_ERR_SERVER));
      }
    });
};

export const getAllOrders = (req, res, next) => {
  Cart.find({})
    .populate('cartItems')
    .populate('owner')
    .then((orders) => {
      console.log(orders);
      res.send(orders);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new UnauthorizedError(MSG_ERR_AUTH));
      } else if (err.code === 11000) {
        next(new ConflictError(MSG_ERR_CONFLICT));
      } else {
        console.log(err);
        next(new ServerError(MSG_ERR_SERVER));
      }
    });
};

export const getOrder = (req, res, next) => {
  Cart.findById(req.params.id)
    .populate('cartItems')
    .populate('owner')
    .then((order) => {
      res.send(order);
      console.log(order);
    })
    .catch(() => next(new NotFoundError(MSG_ERR_NOT_FOUND_ORDER)));
};

export const deleteOrder = (req, res, next) => {
  Cart.findByIdAndDelete(req.params.id)
    .populate('cartItems')
    .populate('owner')
    .then((order) => {
      if (!order) {
        throw new NotFoundError(MSG_ERR_NOT_FOUND_ORDER);
      }
      return order.remove().then(() => res.send({ message: MSG_DELETE_ORDER }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(MSG_ERR_INCORRECT_DATA));
      }
      next(err);
    });
};

//  count: req.body.cartItems[0].count,
//  // const order = new Cart(orderData);
// order.save()
// req.body.cartItems[0].count
