// eslint-disable-next-line import/extensions
import rateLimit from 'express-rate-limit';
// eslint-disable-next-line import/extensions
import { MSG_LIMITER } from '../utils/messages.js';
// eslint-disable-next-line import/prefer-default-export
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 1000, // можно совершить максимум 1000 запросов с одного IP
  message: MSG_LIMITER,
});
