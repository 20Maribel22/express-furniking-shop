/* eslint-disable import/extensions */
import express from 'express';
import { getAllStools, getOne } from '../controllers/ProductController.js';

const productStoolRouter = express.Router();

productStoolRouter.get('/', getAllStools);
productStoolRouter.get('/:id', getOne);

export default productStoolRouter;
