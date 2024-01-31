/* eslint-disable import/extensions */
import express from 'express';
import {
  getOneFeedback,
  getAllFeedback,
  saveFeedback,
} from '../controllers/FeedbackContoller.js';
import { feedbackCreateValidation } from '../validation.js';
import { handleValidationErrors } from '../utils/handleValidationErrors.js';

const feedbackRouter = express.Router();

feedbackRouter.post(
  '/',
  feedbackCreateValidation,
  handleValidationErrors,
  saveFeedback,
);
feedbackRouter.get('/', getAllFeedback);
feedbackRouter.get('/:id', getOneFeedback);

export default feedbackRouter;
