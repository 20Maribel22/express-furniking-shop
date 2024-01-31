/* eslint-disable import/extensions */
import express from 'express';
import { getAllTables, getOne } from '../controllers/ProductController.js';

const productTableRouter = express.Router();

productTableRouter.get('/', getAllTables);
productTableRouter.get('/:id', getOne);

export default productTableRouter;
