/* eslint-disable import/extensions */
import express from 'express';
import { getAllNew, getOne } from '../controllers/ProductController.js';

const productNewRouter = express.Router();

productNewRouter.get('/', getAllNew);
productNewRouter.get('/:id', getOne);

export default productNewRouter;
