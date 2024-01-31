/* eslint-disable import/extensions */
import express from 'express';
import {
  updateProduct,
  deleteProduct,
  createProduct,
} from '../controllers/ProductController.js';
import {
  productCreateValidation, productUpdateValidation,

} from '../validation.js';
import { handleValidationErrors } from '../utils/handleValidationErrors.js';

const adminRouter = express.Router();

adminRouter.patch('/:id', productUpdateValidation, handleValidationErrors, updateProduct);
adminRouter.delete('/:id', deleteProduct);
adminRouter.post('/', productCreateValidation, handleValidationErrors, createProduct);

export default adminRouter;
