/* eslint-disable import/extensions */
import express from 'express';
import { getAll, getOne } from '../controllers/ProductController.js';

const productRouter = express.Router();

productRouter.get('/', getAll);
productRouter.get('/:id', getOne);

export default productRouter;
