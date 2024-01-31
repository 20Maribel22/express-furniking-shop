import jwt from 'jsonwebtoken';

// eslint-disable-next-line import/extensions
import { MSG_ERR_UNAUTH } from '../utils/messages.js';
// eslint-disable-next-line import/extensions
import { UnauthorizedError } from '../utils/errors.js';
// eslint-disable-next-line import/extensions
import { SECRET_CODE } from '../utils/config.js';

const { NODE_ENV, JWT_SECRET } = process.env;
// eslint-disable-next-line import/prefer-default-export
export const checkAuth = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(MSG_ERR_UNAUTH);
  }
  const token = authorization.replace(/^Bearer\s/i, '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : SECRET_CODE,
    );
  } catch (err) {
    next(new UnauthorizedError(MSG_ERR_UNAUTH));
  }
  req.user = payload;
  next();
};
