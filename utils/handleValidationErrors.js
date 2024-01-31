import { validationResult } from 'express-validator';
// eslint-disable-next-line import/prefer-default-export, consistent-return
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  next();
};
