import express from 'express';
// eslint-disable-next-line import/extensions
import { getAllWardrobes, getOne } from '../controllers/ProductController.js';

const productWardrobeRouter = express.Router();

productWardrobeRouter.get('/', getAllWardrobes);
productWardrobeRouter.get('/:id', getOne);

export default productWardrobeRouter;
