/* eslint-disable import/extensions */
import express from 'express';
import {
  saveCart,
  getAllOrders,
  getOrder,
  deleteOrder,
} from '../controllers/CartController.js';

const cartRouter = express.Router();

cartRouter.post('/', saveCart);
cartRouter.get('/', getAllOrders);
cartRouter.get('/:id', getOrder);
cartRouter.delete('/:id', deleteOrder);

export default cartRouter;
