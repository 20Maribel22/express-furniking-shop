/* eslint-disable import/extensions */
import express from 'express';
import { getAllBest, getOne } from '../controllers/ProductController.js';

const productBestRouter = express.Router();

productBestRouter.get('/', getAllBest);
productBestRouter.get('/:id', getOne);

export default productBestRouter;
