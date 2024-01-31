/* eslint-disable import/extensions */
import express from 'express';
import { getAllMirrors, getOne } from '../controllers/ProductController.js';

const productMirrorRouter = express.Router();

productMirrorRouter.get('/', getAllMirrors);
productMirrorRouter.get('/:id', getOne);

export default productMirrorRouter;
