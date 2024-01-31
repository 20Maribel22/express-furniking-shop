/* eslint-disable import/extensions */
import express from 'express';
import { getAllSale, getOne } from '../controllers/ProductController.js';

const productSaleRouter = express.Router();

productSaleRouter.get('/', getAllSale);
productSaleRouter.get('/:id', getOne);

export default productSaleRouter;
