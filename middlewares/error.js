// eslint-disable-next-line import/extensions
import { MSG_ERR_SERVER } from '../utils/messages.js';
// eslint-disable-next-line import/prefer-default-export
export const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = status === 500 ? MSG_ERR_SERVER : err.message;
  res.status(status).send({ message });
  next();
};
