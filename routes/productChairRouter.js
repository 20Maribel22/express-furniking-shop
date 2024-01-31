/* eslint-disable import/extensions */
import express from 'express';
import { getAllChairs, getOne } from '../controllers/ProductController.js';

const productChairRouter = express.Router();

productChairRouter.get('/', getAllChairs);
productChairRouter.get('/:id', getOne);

export default productChairRouter;
