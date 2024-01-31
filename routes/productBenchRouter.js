/* eslint-disable import/extensions */
import express from 'express';
import { getAllBenches, getOne } from '../controllers/ProductController.js';

const productBenchRouter = express.Router();

productBenchRouter.get('/', getAllBenches);
productBenchRouter.get('/:id', getOne);

export default productBenchRouter;
