/* eslint-disable import/extensions */
import express from 'express';
import { getAllChairs, getOne } from '../controllers/ProductController.js';

const productTrandRouter = express.Router();

productTrandRouter.get('/', getAllChairs);
productTrandRouter.get('/:id', getOne);

export default productTrandRouter;
