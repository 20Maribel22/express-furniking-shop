/* eslint-disable import/extensions */
import express from 'express';
import { getAllSofas, getOne } from '../controllers/ProductController.js';

const productSofaRouter = express.Router();

productSofaRouter.get('/', getAllSofas);
productSofaRouter.get('/:id', getOne);

export default productSofaRouter;
