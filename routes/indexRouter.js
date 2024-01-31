/* eslint-disable import/extensions */
import express from 'express';
import productRouter from './productRouter.js';
import productMirrorRouter from './productMirrorRouter.js';
import productSofaRouter from './productSofaRouter.js';
import productTableRouter from './productTableRouter.js';
import productWardrobeRouter from './productWardrobeRouter.js';
import productTrandRouter from './productTrandRouter.js';
import adminRouter from './adminRouter.js';
import feedbackRouter from './feedbackRouter.js';
import productBenchRouter from './productBenchRouter.js';
import productChairRouter from './productChairRouter.js';
import productNewRouter from './productNewRouter.js';
import productSaleRouter from './productSaleRouter.js';
import productStoolRouter from './productStoolRouter.js';
import productBestRouter from './productBestRouter.js';
import cartRouter from './cartRouter.js';
import {
  getAllUsers,
  getMe,
  login,
  register,
} from '../controllers/UserController.js';
import { NotFoundError } from '../utils/errors.js';
import { MSG_ERR_NOT_FOUND_PAGE } from '../utils/messages.js';
import { registerValidation, loginValidation } from '../validation.js';
import { checkAuth } from '../middlewares/checkAuth.js';
import { handleValidationErrors } from '../utils/handleValidationErrors.js';

const indexRouter = express.Router();

indexRouter.use('/all', productRouter);
indexRouter.use('/benches', productBenchRouter);
indexRouter.use('/stools', productStoolRouter);
indexRouter.use('/mirrors', productMirrorRouter);
indexRouter.use('/sofas', productSofaRouter);
indexRouter.use('/tables', productTableRouter);
indexRouter.use('/wardrobes', productWardrobeRouter);
indexRouter.use('/chairs', productChairRouter);
indexRouter.use('/products', productTrandRouter);
indexRouter.use('/new-arrivals', productNewRouter);
indexRouter.use('/hot-sale', productSaleRouter);
indexRouter.use('/best-sellers', productBestRouter);
indexRouter.use('/feedback', feedbackRouter);

indexRouter.post(
  '/auth/signin',
  loginValidation,
  handleValidationErrors,
  login,
);
indexRouter.post(
  '/auth/signup',
  registerValidation,
  handleValidationErrors,
  register,
);

indexRouter.use(checkAuth);

indexRouter.get('/auth/me', getMe);

indexRouter.get('/users', getAllUsers);

indexRouter.use('/order', cartRouter);

indexRouter.use('/all', adminRouter);

indexRouter.use((req, res, next) => {
  next(new NotFoundError(MSG_ERR_NOT_FOUND_PAGE));
});

export default indexRouter;
