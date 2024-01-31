import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5  символов').isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5  символов').isLength({
    min: 5,
  }),
  body('name', 'Укажите имя').isLength({ min: 3 }),
];

export const productCreateValidation = [
  body('category', 'Неверное название категории')
    .isLength({ min: 3 })
    .isString(),
  body('status', 'Неверное название статуса').isLength({ min: 3 }).isString(),
  body('name', 'Неверное имя продукта').isLength({ min: 3 }).isString(),
  body('title', 'Неверное название продукта').isLength({ min: 3 }).isString(),
  body('price', 'Неверная цена').isNumeric(),
  body('oldPrice', 'Неверная цена').isNumeric(),
  body('countInStock', 'Неверное количество продукта').isNumeric(),
  body('url', 'Неверная ссылка на изображение').isURL(),
  body('image', 'Неверная ссылка на изображение').isURL(),
  body('text', 'Неверное описание продукта').isLength({ min: 10 }).isString(),
];

export const productUpdateValidation = [
  body('status', 'Неверное название статуса').isLength({ min: 3 }).isString(),
  body('price', 'Неверная цена').isNumeric(),
  body('oldPrice', 'Неверная цена').isNumeric(),
  body('countInStock', 'Неверное количество продукта').isNumeric(),
  body('text', 'Неверное описание продукта').isLength({ min: 10 }).isString(),
];

export const feedbackCreateValidation = [
  body('photo', 'Неверная ссылка на изображение').isURL(),
  body('name', 'Укажите имя').isLength({ min: 3 }),
  body('status', 'Укажите статус').isLength({ min: 5 }),
  body('comment', 'Неверное описание продукта')
    .isLength({ min: 10 })
    .isString(),
];
